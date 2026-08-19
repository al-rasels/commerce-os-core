import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

export interface NavigationLink {
  id: string;
  label: string;
  url: string;
  type: 'category' | 'page' | 'custom' | 'collection';
  children?: NavigationLink[];
}

export interface NavigationTree {
  headerMenu: NavigationLink[];
  footerMenu: {
    columns: Array<{
      title: string;
      links: NavigationLink[];
    }>;
  };
  topBarNotice?: {
    text: string;
    linkUrl?: string;
    enabled: boolean;
  };
}

@Injectable()
export class NavigationService {
  constructor(private readonly prisma: PrismaService) {}

  async getNavigationTree(tenantId: string): Promise<NavigationTree> {
    const categories = await this.prisma.category.findMany({
      where: { tenant_id: tenantId },
      orderBy: { sort_order: 'asc' },
    });

    const categoryLinks: NavigationLink[] = categories.map((cat) => ({
      id: cat.id,
      label: cat.name,
      url: `/categories/${cat.slug}`,
      type: 'category',
    }));

    return {
      headerMenu: [
        { id: 'nav-home', label: 'Home', url: '/', type: 'custom' },
        { id: 'nav-products', label: 'All Products', url: '/products', type: 'custom' },
        {
          id: 'nav-categories',
          label: 'Categories',
          url: '/categories',
          type: 'custom',
          children: categoryLinks,
        },
        { id: 'nav-b2b', label: 'Wholesale B2B', url: '/b2b', type: 'custom' },
        { id: 'nav-contact', label: 'Contact Us', url: '/contact', type: 'custom' },
      ],
      footerMenu: {
        columns: [
          {
            title: 'Shop',
            links: categoryLinks.slice(0, 5),
          },
          {
            title: 'Customer Service',
            links: [
              { id: 'f-contact', label: 'Contact Us', url: '/contact', type: 'custom' },
              { id: 'f-shipping', label: 'Shipping & Delivery', url: '/shipping', type: 'custom' },
              { id: 'f-faq', label: 'FAQ', url: '/faq', type: 'custom' },
              { id: 'f-returns', label: 'Returns & Exchanges', url: '/account/returns', type: 'custom' },
            ],
          },
          {
            title: 'About CommerceOS',
            links: [
              { id: 'f-terms', label: 'Terms of Service', url: '/terms', type: 'custom' },
              { id: 'f-privacy', label: 'Privacy Policy', url: '/privacy', type: 'custom' },
            ],
          },
        ],
      },
      topBarNotice: {
        text: '✨ Free worldwide shipping on orders over $150! Use code WELCOME10 for 10% off.',
        linkUrl: '/featured',
        enabled: true,
      },
    };
  }

  async updateNavigationTree(
    tenantId: string,
    navigation: NavigationTree,
  ): Promise<NavigationTree> {
    // In enterprise deployment, navigation state is saved into Tenant Settings or Experience Layout
    return navigation;
  }
}
