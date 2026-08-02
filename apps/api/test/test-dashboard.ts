import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  const tenants = await prisma.tenant.findMany();
  if (tenants.length === 0) {
    console.log('No tenants found.');
    return;
  }
  const tenantId = tenants[0].id;
  console.log(`Testing with tenant: ${tenantId}`);

  try {
    const orderAgg = await prisma.order.aggregate({
      where: {
        status: { in: ['paid', 'fulfilled'] },
        tenant_id: tenantId,
      },
      _sum: { total_cents: true },
      _count: true,
    });
    console.log('orderAgg ok');

    const recentOrders = await prisma.order.findMany({
      where: { tenant_id: tenantId },
      orderBy: { created_at: 'desc' },
      take: 10,
      include: {
        items: true,
        customer: {
          select: { id: true, email: true, first_name: true, last_name: true },
        },
      },
    });
    console.log('recentOrders ok');

    const statusBreakdown = await prisma.order.groupBy({
      by: ['status'],
      where: { tenant_id: tenantId },
      _count: true,
    });
    console.log('statusBreakdown ok');

    const customerCount = await prisma.customer.count({
      where: { tenant_id: tenantId },
    });
    console.log('customerCount ok');

    const lowStock = await prisma.productVariant.findMany({
      where: { stock_available: { lt: 5 }, tenant_id: tenantId },
      include: { product: { select: { name: true } } },
      take: 5,
    });
    console.log('lowStock ok');

    console.log('ALL DB QUERIES PASSED');
  } catch (err) {
    console.error('DB ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
