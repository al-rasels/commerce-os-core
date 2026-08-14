-- Add created_at/updated_at to tenant-scoped models that services order by created_at.
-- Add ThemeBase.key unique slug so admin can reference base themes by registry key.

-- AlterTable
ALTER TABLE "company_profiles"
ADD COLUMN "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "inventory_levels"
ADD COLUMN "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "inventory_locations"
ADD COLUMN "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "price_lists"
ADD COLUMN "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "subscriptions"
ADD COLUMN "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "theme_base" ADD COLUMN "key" TEXT;

-- Backfill the existing base theme row (must precede SET NOT NULL).
UPDATE "theme_base" SET "key" = 'default' WHERE "key" IS NULL;

-- AlterTable
ALTER TABLE "theme_base" ALTER COLUMN "key" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "theme_base_key_key" ON "theme_base"("key");
