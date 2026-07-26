-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "billing_address" JSONB DEFAULT '{}',
ADD COLUMN     "customer_email" VARCHAR(255),
ADD COLUMN     "shipping_address" JSONB DEFAULT '{}';
