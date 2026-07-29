const fs = require('fs');
const files = [
  'src/modules/commerce/cart/repositories/cart.repository.spec.ts',
  'src/modules/commerce/customer/customer.repository.spec.ts',
  'src/modules/commerce/order/order.repository.spec.ts',
  'src/modules/experience/theme/repositories/theme-override.repository.spec.ts',
  'src/modules/platform/users/users.repository.spec.ts'
];
for(const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  // Just calculate relative path to src
  const depth = file.split('/').length - 1;
  const toSrc = '../'.repeat(depth - 1);
  
  content = content.replace(/from '.*\/prisma\/prisma\.service'/g, `from '${toSrc}prisma/prisma.service'`);
  content = content.replace(/from '.*\/platform\/tenant\/tenant-context'/g, `from '${toSrc}modules/platform/tenant/tenant-context'`);
  fs.writeFileSync(file, content);
}
console.log('Fixed imports');
