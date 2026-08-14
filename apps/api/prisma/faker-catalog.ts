import { faker } from '@faker-js/faker';
import type { TemplateLayoutData } from '../src/modules/experience/template/template-apply';

type FakerProduct = NonNullable<TemplateLayoutData['sample_products']>;

export interface FakerCatalogOptions {
  seed: number;
  skuPrefix: string;
  categories: string[];
  count?: number;
  priceMin?: number;
  priceMax?: number;
  badge?: string;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateFakerCatalog(options: FakerCatalogOptions): FakerProduct {
  faker.seed(options.seed);

  const categories = options.categories.length > 0 ? options.categories : ['general'];
  const count = options.count ?? 8;
  const priceMin = options.priceMin ?? 20;
  const priceMax = options.priceMax ?? 500;

  const usedSlugs = new Set<string>();
  let skuCounter = 0;

  const products: FakerProduct = [];

  for (let i = 0; i < count; i++) {
    const category = faker.helpers.arrayElement(categories);
    const name = faker.commerce.productName();
    const baseSlug = slugify(name);
    let slug = baseSlug;
    let dedupe = 1;
    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${++dedupe}`;
    }
    usedSlugs.add(slug);

    const variantCount = faker.number.int({ min: 1, max: 3 });
    const variants = Array.from({ length: variantCount }, () => {
      skuCounter += 1;
      return {
        sku: `${options.skuPrefix}${String(skuCounter).padStart(4, '0')}`,
        price_cents: Math.round(
          Number(faker.commerce.price({ min: priceMin, max: priceMax, dec: 0 })) * 100,
        ),
        currency: 'USD',
        stock_available: faker.number.int({ min: 5, max: 250 }),
        attributes_json: {
          color: faker.color.human(),
          material: faker.commerce.productMaterial(),
          size: faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL']),
        },
      };
    });

    products.push({
      name,
      slug,
      description: faker.commerce.productDescription(),
      status: 'active',
      category_slug: category,
      ...(options.badge ? { badge: options.badge } : {}),
      images: [
        `/products/faker-${slug}-1.jpg`,
        `/products/faker-${slug}-2.jpg`,
      ],
      tags: [category, 'faker-catalog'],
      variants,
    });
  }

  return products;
}
