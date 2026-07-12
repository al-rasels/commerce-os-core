import { z } from "zod";

// Tenant schemas
export const TenantSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  plan_id: z.string().default("trial"),
  status: z.enum(["active", "suspended", "offboarding"]).default("active"),
  created_at: z.date()
});
export type Tenant = z.infer<typeof TenantSchema>;

export const TenantDomainSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  domain: z.string().min(1),
  is_primary: z.boolean().default(true)
});
export type TenantDomain = z.infer<typeof TenantDomainSchema>;

// User & Role schemas
export const RoleSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid().nullable(),
  name: z.enum(["super_admin", "store_owner", "store_staff", "customer"])
});
export type Role = z.infer<typeof RoleSchema>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid().nullable(),
  email: z.string().email(),
  password_hash: z.string(),
  role_id: z.string().uuid(),
  created_at: z.date()
});
export type User = z.infer<typeof UserSchema>;

// Product & Variant schemas
export const ProductSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  status: z.enum(["draft", "active", "archived"]).default("draft"),
  category_id: z.string().uuid().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable()
});
export type Product = z.infer<typeof ProductSchema>;

export const ProductVariantSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  product_id: z.string().uuid(),
  sku: z.string().min(1),
  price_cents: z.number().int().nonnegative(),
  currency: z.string().length(3), // ISO 4217
  stock_available: z.number().int().default(0),
  stock_reserved: z.number().int().default(0),
  attributes_json: z.record(z.any()).nullable()
});
export type ProductVariant = z.infer<typeof ProductVariantSchema>;

// Category schema
export const CategorySchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  parent_id: z.string().uuid().nullable()
});
export type Category = z.infer<typeof CategorySchema>;
