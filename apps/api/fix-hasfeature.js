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
  content = content.replace(/storagePrefix:\s*`(.*?)`,/g, "storagePrefix: `$1`,\n      hasFeature: () => false,");
  fs.writeFileSync(file, content);
}
console.log('Fixed hasFeature missing');
