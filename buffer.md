# 图片上传

## 1. 参数

``` javascript
{
    maxNUm: ‘’, //最大上传数量
	minSize: 1024, // 图片大小最小限制,单位为KB,非必需,无默认值 
    maxSize: 2048, // 图片大小最大限制,单位为KB,非必需,无默认值
    minWidth: 100, // 图片宽度最小限制,单位为px,非必需,无默认值 
    minHeight: 100, // 图片高度最小限制,单位为px,非必需,无默认值
    maxWidth: 2000, // 图片宽度最大限制,单位为px,非必需,无默认值 
    maxHeight: 2000, // 图片高度最大限制,单位为px,非必需,无默认值
    defaultImg: [''], //默认显示的图片路径, 无默认值
    errViewImg: '../images/errViewImg.jpg', // 上传错误时上传图片
    
    // 图片
    isClipper: false, //是否图片裁剪，默认false,只有上传为图片时才生效
    
        
    uploadSuccess: function(file){},
    uploadError: function(file, error){},
    uploadComplete: function(file){},
    uploadProgress: function(file, percentage){},
        
    beforeSend: function() {}, // 
}
```



