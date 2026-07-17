-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "description" TEXT;
