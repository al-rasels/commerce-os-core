-- AlterTable
ALTER TABLE "users" ADD COLUMN     "mfa_enabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mfa_secret" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- CreateTable
CREATE TABLE "shipping_rules" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "shipping_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_rules" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "region" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "tax_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "min_order" DOUBLE PRECISION,
    "max_uses" INTEGER,
    "uses" INTEGER NOT NULL DEFAULT 0,
    "expires_at" TIMESTAMPTZ,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "shipping_rules_tenant_id_idx" ON "shipping_rules"("tenant_id");

-- CreateIndex
CREATE INDEX "tax_rules_tenant_id_idx" ON "tax_rules"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "promotions_code_key" ON "promotions"("code");

-- CreateIndex
CREATE INDEX "promotions_tenant_id_code_idx" ON "promotions"("tenant_id", "code");

-- AddForeignKey
ALTER TABLE "shipping_rules" ADD CONSTRAINT "shipping_rules_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_rules" ADD CONSTRAINT "tax_rules_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
