```

#!/usr/bin/env bash

\# . "$(dirname "$0")/_/husky.sh"



export PATH=/usr/local/bin:$PATH

node "./.husky/script/pre-push.js"
```

```
const cp = require('child_process');
const fs = require("fs");
const path = require('path');
const projectName = 'dap';
console.log('in pre-push');

let changeFiles = cp.execSync('git diff --name-only HEAD~ HEAD', {
    cwd: 'E:\\codeWork\\dap'
}).toString().trim(); // 获取改动列表
let hasMenu = changeFiles.match('menu/menu.xml') !== null;  // menu是否有改动
if(!hasMenu) {
    return;
}

let sourceBranchName = cp.execSync('git rev-parse --abbrev-ref HEAD', {
    cwd: 'E:\\codeWork\\dap'
}).toString().trim(); //获取分支名
let sourceVersionNumber = sourceBranchName.replace('feature/v', ''); //版本号
if(sourceVersionNumber === sourceBranchName){
    console.log('非版本号版本，直接返回');
    return;
}
// let dimPointLen = sourceVersionNumber.match(/\./g).length;
// sourceVersionNumber += '.0'.repeat(3- dimPointLen); // 补齐版本号 比如 2.2.3.0 
let sourceMenuPath = path.join(__dirname, '../../menu/menu.xml');
const menuProjectPath = path.join(__dirname, '../../../menu');
let toFilePath = path.join(menuProjectPath, `${projectName}_${sourceVersionNumber}.xml`);

// 复制
fs.readFile(sourceMenuPath, 'utf-8', function (err, data) {
    if (err) throw err;
    console.log('sourceMenuPath:', sourceMenuPath);
    
    cp.exec(`git pull`, {cwd: menuProjectPath}, function (error) {
        if (err) {
            console.log(error);
            return;
        }
        console.log('pull menu success done');

        fs.writeFile(toFilePath, data, 'utf8', (err) => {
            if (err) throw err;
            console.log('copy success done');
    
            cp.exec(`git add . && git commit -m 'test' && git push`, {cwd: menuProjectPath}, function (error) {
                if (err) {
                    console.log(error);
                    return;
                }
        
                console.log('push menu success done');
            });
        });
    });
});

```

