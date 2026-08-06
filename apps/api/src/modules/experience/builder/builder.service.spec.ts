import { BuilderService } from './builder.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('BuilderService', () => {
  let service: BuilderService;
  let repo: any;

  const ctx = { tenantId: 't1', domain: 'acme.com', plan: 'pro' };
  const emptyDoc = { version: 1, nodes: [] };

  function makeRow(overrides: Partial<any> = {}) {
    return {
      page_key: 'homepage',
      draft_json: {
        version: 1,
        nodes: [
          { id: 'd1', component: 'hero.v1', props: {}, children: [], visible: true, rules: [] },
        ],
      },
      published_json: {
        version: 1,
        nodes: [
          { id: 'p1', component: 'hero.v1', props: {}, children: [], visible: true, rules: [] },
        ],
      },
      published_at: new Date(),
      updated_at: new Date(),
      ...overrides,
    };
  }

  beforeEach(() => {
    repo = {
      findByPageKey: jest.fn(),
      saveDraft: jest.fn(),
      publish: jest.fn(),
      unpublish: jest.fn(),
      list: jest.fn(),
    };
    service = new BuilderService(repo);
  });

  describe('getPageLayout', () => {
    it('returns the published nodes for a public read of a published page', async () => {
      repo.findByPageKey.mockResolvedValue(makeRow());

      const result = await service.getPageLayout(ctx as any, 'homepage');

      expect(result.status).toBe('published');
      expect(result.nodes[0].id).toBe('p1');
    });

    it('throws NotFound for a public read of an unpublished page', async () => {
      repo.findByPageKey.mockResolvedValue(makeRow({ published_at: null }));

      await expect(
        service.getPageLayout(ctx as any, 'homepage'),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws NotFound for a public read of a missing page', async () => {
      repo.findByPageKey.mockResolvedValue(null);

      await expect(
        service.getPageLayout(ctx as any, 'homepage'),
      ).rejects.toThrow(NotFoundException);
    });

    it('returns an empty draft baseline for an authorized draft read of a missing page', async () => {
      repo.findByPageKey.mockResolvedValue(null);

      const result = await service.getPageLayout(ctx as any, 'homepage', true, true);

      expect(result.nodes).toEqual([]);
      expect(result.status).toBe('draft');
    });

    it('serves draft nodes for an authorized draft read', async () => {
      repo.findByPageKey.mockResolvedValue(makeRow());

      const result = await service.getPageLayout(ctx as any, 'homepage', true, true);

      expect(result.nodes[0].id).toBe('d1');
    });

    it('falls back to published nodes when the draft is empty', async () => {
      repo.findByPageKey.mockResolvedValue(
        makeRow({ draft_json: emptyDoc }),
      );

      const result = await service.getPageLayout(ctx as any, 'homepage', true, true);

      expect(result.nodes[0].id).toBe('p1');
    });
  });

  describe('updatePageLayout', () => {
    it('normalizes, plan-gates, saves the draft, and returns the DTO', async () => {
      const draftRow = makeRow({ published_at: null });
      repo.findByPageKey.mockResolvedValue(draftRow);

      const nodes = [
        { component: 'hero.v1', props: { heading: 'Hi' } }, // no id — normalized
      ];
      const result = await service.updatePageLayout(ctx as any, 'homepage', nodes);

      expect(repo.saveDraft).toHaveBeenCalledTimes(1);
      const savedDoc = repo.saveDraft.mock.calls[0][2];
      expect(savedDoc.nodes[0].id).toBeTruthy();
      expect(savedDoc.nodes[0].visible).toBe(true);
      expect(result.status).toBe('draft');
    });

    it('rejects premium components for tenants below the required plan', async () => {
      const trialCtx = { tenantId: 't1', domain: 'acme.com', plan: 'trial' };
      const nodes = [
        { id: 'g1', component: 'gallery.v1', props: {}, children: [], visible: true, rules: [] },
      ];

      await expect(
        service.updatePageLayout(trialCtx as any, 'homepage', nodes),
      ).rejects.toThrow(ForbiddenException);
      expect(repo.saveDraft).not.toHaveBeenCalled();
    });
  });

  describe('publishPageLayout', () => {
    it('copies the draft to the published copy and returns the published DTO', async () => {
      repo.findByPageKey.mockResolvedValue(makeRow());

      const result = await service.publishPageLayout(ctx as any, 'homepage');

      expect(repo.publish).toHaveBeenCalledWith(ctx, 'homepage');
      expect(result.status).toBe('published');
    });

    it('throws NotFound when the page does not exist', async () => {
      repo.findByPageKey.mockResolvedValue(null);

      await expect(
        service.publishPageLayout(ctx as any, 'homepage'),
      ).rejects.toThrow(NotFoundException);
      expect(repo.publish).not.toHaveBeenCalled();
    });
  });

  describe('unpublishPageLayout', () => {
    it('clears the published copy', async () => {
      repo.findByPageKey.mockResolvedValue(makeRow());

      await service.unpublishPageLayout(ctx as any, 'homepage');

      expect(repo.unpublish).toHaveBeenCalledWith(ctx, 'homepage');
    });

    it('throws NotFound when the page does not exist', async () => {
      repo.findByPageKey.mockResolvedValue(null);

      await expect(
        service.unpublishPageLayout(ctx as any, 'homepage'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('listPageLayouts', () => {
    it('returns DTOs for every tenant layout', async () => {
      repo.list.mockResolvedValue([makeRow(), makeRow({ page_key: 'about' })]);

      const result = await service.listPageLayouts(ctx as any);

      expect(result).toHaveLength(2);
      expect(result[0].page_key).toBe('homepage');
    });
  });
});
