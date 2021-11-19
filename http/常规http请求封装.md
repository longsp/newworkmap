```javascript
let request = new XMLHttpRequest();
let token = "2962d350-d8fa-4d6a-a1cf-9017c29deab1-91967044";

request.open('POST', "http://172.16.1.181:40106/dss/ms-hhl/approve/page");
request.setRequestHeader("adq-token", token);
request.setRequestHeader('Content-type', 'application/json');

let data = {
    "pageRequest": {
        "pageNo": 1,
        "pageSize": 20,
        "order": [
            {
                "prop": "id",
                "asc": false
            }
        ]
    },
    "approveType": 1
};
request.send(JSON.stringify(data));

request.onload = function(e) {
    console.log(e);

    console.log(request.status);
    console.log(request.readyState);
    console.log(request.responseText);
    console.log(request.response);
}

request.onerror = function(e) {
    console.log('请求失败');
}
```



