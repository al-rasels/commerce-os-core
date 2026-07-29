const fs = require('fs');
const path = require('path');

const srcDir = path.join('apps', 'admin', 'src', 'components', 'ui');
const destDir = path.join('packages', 'components');
const indexFile = path.join(destDir, 'index.ts');

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.tsx'));
let exportedContent = fs.readFileSync(indexFile, 'utf-8');

let addedCount = 0;
for (const file of files) {
  const componentName = file.replace('.tsx', '');
  if (exportedContent.includes(`export * from "./${componentName}";`)) continue; // skip existing

  let content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  content = content.replace(/@\/lib\/utils/g, './utils');
  
  fs.writeFileSync(path.join(destDir, file), content);
  fs.appendFileSync(indexFile, `\nexport * from "./${componentName}";`);
  addedCount++;
}
console.log('Added ' + addedCount + ' components');
