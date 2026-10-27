import {rm,mkdir,copyFile,cp} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const dist=path.join(root,'dist');
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
for(const file of ['index.html','styles.css','content.js','app.js','.nojekyll'])await copyFile(path.join(root,file),path.join(dist,file));
await cp(path.join(root,'assets'),path.join(dist,'assets'),{recursive:true});
console.log('Built static portfolio in dist/');
