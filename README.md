## powerTips

* 版本：1.0
* 教程：[http://gallery.kissyui.com/powerTips/1.0/guide/index.html](http://gallery.kissyui.com/powerTips/1.0/guide/index.html)
* demo：[http://gallery.kissyui.com/powerTips/1.0/demo/index.html](http://gallery.kissyui.com/powerTips/1.0/demo/index.html)

## 参数说明

* triggers: (kissy selector) 需要触发标签提示的节点选择器
* location: (array) 标签出现在触发器的相对位置，取值如图（默认为["right", "middle"]）：![](http://www.seejs.com/wp-content/uploads/2013/06/powertips.png) 
* textAttr: (string) 标签显示内容来源的属性名称，默认为"title"
* theme: (string) 标签主题，可选值""、"red"、"blue"、"orange"、"purple"，默认为空
* spacing: (int) 标签与触发器之间的间隔距离，单位px，默认为3

## 用法

* 第一步，页面引入kissy-1.3.0包；
* 第二步，若本地调试需添加配置

		```
		var S = KISSY;
	    S.Config.debug = true;
	    if(S.Config.debug){
	        var srcPath = "../../../";
	        S.config({
	            packages:[
	                {
	                    name:"gallery",
	                    path:srcPath,
	                    charset:"utf-8",
	                    ignorePackageNameInUri:true
	                }
	            ]
	        });
	    }
		```

* 第三步，调用并初始化组件
	
		```
		S.use('gallery/powerTips/1.0/index,gallery/powerTips/1.0/index.css', function (S, PowerTips) {
	         var powerTips = new PowerTips({
	            triggers: ".J_PowerTips", //添加标签提示的钩子，支持kissy选择器
	            location: ["bottom", "right"], //标签出现在触发器上的位置，http://img04.taobaocdn.com/tps/i4/T1ARxoFmJgXXX71nES-550-400.png
	            textAttr: "tips", //标签显示数据的来源属性名称，默认为title
	            theme: "blue", //标签主题，包括""(default)、"red"、"blue"、"orange"、"purple"五种皮肤
	            spacing: 5 //标签显示位置与触发器之间的间隔，单位px
	         });
	    })
		```

## changelog

### V1.0


