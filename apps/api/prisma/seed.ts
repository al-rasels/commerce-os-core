import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const tenantA = await prisma.tenant.create({
    data: { name: 'Tenant A', plan_id: 'enterprise' },
  });
  const tenantB = await prisma.tenant.create({
    data: { name: 'Tenant B', plan_id: 'starter' },
  });

  await prisma.tenantDomain.create({ data: { tenant_id: tenantA.id, domain: 'tenanta.localhost' } });
  await prisma.tenantDomain.create({ data: { tenant_id: tenantB.id, domain: 'tenantb.localhost' } });

  const rolePermissions: Record<string, string[]> = {
    'Super Admin': [
      'super_admin', 'auth.invite',
      'catalog.read', 'catalog.write', 'cart.read', 'cart.write',
      'checkout.write', 'customers.read', 'customers.write',
      'order.read', 'order.write', 'payment.write',
      'promotions.read', 'promotions.write',
      'shipping.read', 'shipping.write', 'tax.read', 'tax.write',
      'theme.write', 'builder.write', 'audit.read',
    ],
    'Store Owner': [
      'auth.invite',
      'catalog.read', 'catalog.write', 'cart.read', 'cart.write',
      'checkout.write', 'customers.read', 'customers.write',
      'order.read', 'order.write', 'payment.write',
      'promotions.read', 'promotions.write',
      'shipping.read', 'shipping.write', 'tax.read', 'tax.write',
      'theme.write', 'builder.write', 'audit.read',
    ],
    'Store Staff': [
      'catalog.read', 'catalog.write', 'cart.read', 'cart.write',
      'customers.read', 'order.read', 'order.write',
    ],
    'Customer': [
      'catalog.read', 'cart.read', 'checkout.write', 'order.read',
    ],
  };

  const roleNames = ['Store Owner', 'Store Staff', 'Customer'];
  const rolesA: Record<string, string> = {};
  const rolesB: Record<string, string> = {};

  for (const name of roleNames) {
    const ra = await prisma.role.create({
      data: { tenant_id: tenantA.id, name, permissions: rolePermissions[name] },
    });
    rolesA[name] = ra.id;
    const rb = await prisma.role.create({
      data: { tenant_id: tenantB.id, name, permissions: rolePermissions[name] },
    });
    rolesB[name] = rb.id;
  }

  const superAdminRole = await prisma.role.create({
    data: { tenant_id: null, name: 'Super Admin', permissions: rolePermissions['Super Admin'] },
  });

  const passSA = await argon2.hash('superadmin123');
  await prisma.user.create({
    data: { tenant_id: null, email: 'admin@commerceos.io', password_hash: passSA, role_id: superAdminRole.id },
  });

  const passA = await argon2.hash('password123');
  await prisma.user.create({
    data: { tenant_id: tenantA.id, email: 'admin@tenanta.com', password_hash: passA, role_id: rolesA['Store Owner'] },
  });

  const passB = await argon2.hash('password123');
  await prisma.user.create({
    data: { tenant_id: tenantB.id, email: 'admin@tenantb.com', password_hash: passB, role_id: rolesB['Store Owner'] },
  });

  const baseTheme = await prisma.themeBase.create({
    data: {
      version: 'v1',
      tokens_json: {
        colors: {
          primary: '#2563eb',
          secondary: '#475569',
          background: '#ffffff',
          text: '#0f172a',
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
          fontSizeBase: '16px',
        },
        spacing: {
          unit: '8px',
        },
      },
    },
  });

  console.log('Seeding complete!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
