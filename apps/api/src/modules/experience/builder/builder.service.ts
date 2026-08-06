import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PageLayout } from '@prisma/client';
import { PageLayoutRepository } from './repositories/page-layout.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';
import {
  BuilderNode,
  ComponentMetadata,
  LAYOUT_VERSION,
  normalizePageLayout,
  PageLayoutDocument,
  PageLayoutDocumentSchema,
  PageLayoutDTO,
  areNodesEqual,
} from '@commerceos/shared-types';

const EMPTY_DOC: PageLayoutDocument = { version: LAYOUT_VERSION, nodes: [] };

@Injectable()
export class BuilderService {
  constructor(private readonly layoutRepo: PageLayoutRepository) {}

  private toDTO(row: PageLayout): PageLayoutDTO {
    const draft =
      (row.draft_json as unknown as PageLayoutDocument) ?? EMPTY_DOC;
    const published =
      (row.published_json as unknown as PageLayoutDocument) ?? EMPTY_DOC;
    const publishedNodes = Array.isArray(published.nodes)
      ? published.nodes
      : [];
    const draftNodes = Array.isArray(draft.nodes) ? draft.nodes : [];
    return {
      page_key: row.page_key,
      nodes: publishedNodes,
      version: LAYOUT_VERSION,
      status: row.published_at ? 'published' : 'draft',
      published_at: row.published_at
        ? row.published_at.toISOString()
        : null,
      updated_at: row.updated_at ? row.updated_at.toISOString() : null,
      has_unpublished_changes: !areNodesEqual(draftNodes, publishedNodes),
    };
  }

  async getPageLayout(
    ctx: TenantContext,
    pageKey: string,
    draft = false,
    canReadDraft = false,
  ): Promise<PageLayoutDTO> {
    const row = await this.layoutRepo.findByPageKey(ctx, pageKey);

    // Editor opening a fresh page: return an empty draft baseline.
    if (!row && draft && canReadDraft) {
      return {
        page_key: pageKey,
        nodes: [],
        version: LAYOUT_VERSION,
        status: 'draft',
        published_at: null,
        updated_at: null,
        has_unpublished_changes: false,
      };
    }

    // Public reads 404 unless a version has been published.
    if (!row || !row.published_at) {
      throw new NotFoundException(
        `Page layout '${pageKey}' not found or not published`,
      );
    }

    const dto = this.toDTO(row);

    // Authorized draft reads serve the draft, falling back to the published
    // copy when the draft is empty so the editor always opens with a baseline.
    if (draft && canReadDraft) {
      const draftDoc =
        (row.draft_json as unknown as PageLayoutDocument) ?? EMPTY_DOC;
      const draftNodes = Array.isArray(draftDoc.nodes) ? draftDoc.nodes : [];
      return {
        ...dto,
        nodes: draftNodes.length > 0 ? draftNodes : dto.nodes,
        has_unpublished_changes: !areNodesEqual(draftNodes, dto.nodes),
      };
    }

    return dto;
  }

  private validatePlanRequirements(node: BuilderNode, tenantPlan: string) {
    if (!node) return;

    if (node.component) {
      const meta = ComponentMetadata[node.component];
      if (meta?.minPlan) {
        const planWeight: Record<string, number> = {
          trial: 0,
          starter: 1,
          pro: 2,
          enterprise: 3,
        };
        const tenantWeight = planWeight[tenantPlan] ?? 0;
        const requiredWeight = planWeight[meta.minPlan] ?? 0;

        if (tenantWeight < requiredWeight) {
          throw new ForbiddenException(
            `Component '${node.component}' requires ${meta.minPlan} plan or higher.`,
          );
        }
      }
    }

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        this.validatePlanRequirements(child, tenantPlan);
      }
    }
  }

  async updatePageLayout(
    ctx: TenantContext,
    pageKey: string,
    nodes: unknown,
  ): Promise<PageLayoutDTO> {
    // Normalize legacy shapes, backfill ids/visible/rules, then validate.
    const doc = normalizePageLayout(nodes);
    const parseResult = PageLayoutDocumentSchema.safeParse(doc);
    if (!parseResult.success) {
      throw new BadRequestException(
        'Invalid page layout: ' + parseResult.error.message,
      );
    }

    for (const node of doc.nodes) {
      this.validatePlanRequirements(node, ctx.plan);
    }

    await this.layoutRepo.saveDraft(ctx, pageKey, doc);

    const row = await this.layoutRepo.findByPageKey(ctx, pageKey);
    if (!row) {
      throw new NotFoundException(`Page layout '${pageKey}' not found`);
    }
    return this.toDTO(row);
  }

  async publishPageLayout(
    ctx: TenantContext,
    pageKey: string,
  ): Promise<PageLayoutDTO> {
    const row = await this.layoutRepo.findByPageKey(ctx, pageKey);
    if (!row) {
      throw new NotFoundException(`Page layout '${pageKey}' not found`);
    }
    await this.layoutRepo.publish(ctx, pageKey);
    const updated = await this.layoutRepo.findByPageKey(ctx, pageKey);
    return this.toDTO(updated as PageLayout);
  }

  async unpublishPageLayout(
    ctx: TenantContext,
    pageKey: string,
  ): Promise<PageLayoutDTO> {
    const row = await this.layoutRepo.findByPageKey(ctx, pageKey);
    if (!row) {
      throw new NotFoundException(`Page layout '${pageKey}' not found`);
    }
    await this.layoutRepo.unpublish(ctx, pageKey);
    const updated = await this.layoutRepo.findByPageKey(ctx, pageKey);
    return this.toDTO(updated as PageLayout);
  }

  async listPageLayouts(ctx: TenantContext): Promise<PageLayoutDTO[]> {
    const rows = await this.layoutRepo.list(ctx);
    return rows.map((r) => this.toDTO(r));
  }
}
