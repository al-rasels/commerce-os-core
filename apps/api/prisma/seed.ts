import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Tenants
  const tenantA = await prisma.tenant.create({
    data: { name: 'Tenant A', plan_id: 'enterprise' },
  });
  const tenantB = await prisma.tenant.create({
    data: { name: 'Tenant B', plan_id: 'starter' },
  });

  // Domains
  await prisma.tenantDomain.create({ data: { tenant_id: tenantA.id, domain: 'tenanta.localhost' }});
  await prisma.tenantDomain.create({ data: { tenant_id: tenantB.id, domain: 'tenantb.localhost' }});

  // Roles
  const adminRoleA = await prisma.role.create({ data: { tenant_id: tenantA.id, name: 'Store Owner' }});
  const adminRoleB = await prisma.role.create({ data: { tenant_id: tenantB.id, name: 'Store Owner' }});

  // Users
  const passA = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: { tenant_id: tenantA.id, email: 'admin@tenanta.com', password_hash: passA, role_id: adminRoleA.id },
  });

  const passB = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: { tenant_id: tenantB.id, email: 'admin@tenantb.com', password_hash: passB, role_id: adminRoleB.id },
  });

  console.log('Seeding complete!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
