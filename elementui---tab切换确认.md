```javascript
// tab切换
async handleTabClick(activeName) {
    switch (activeName) {
        case 'second':
            this.toSqlTab();
            this.tabActiveName = activeName;
            break;
        case 'first':
            if (this.historySqlVal !== this.sqlVal) {
                return await this.missConfirm();
            }
    }
},

// 丢失确认
missConfirm() {
    return new Promise((resolve, reject) => {
        this.$AudaqueToast.warn({
            template: '有sql代码未确认, 跳转将丢失，是否跳转',
            methods: {
                okEvent: () => {
                    resolve();
                },
                cancelEvent: () => {
                    reject();
                }
            }
        });
    });
},
```

