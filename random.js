
/*
 @param 
  配置项 options = {
			els: "",  //挂载的元素  必选
			sourceData:[],  //数据源  必选
			minWidth:40,  //方块的最小宽度  可选
			maxWidth:60,  //方块的最大宽度   可选
			safeDdistance: 15  //方块之间的安全距离 可选
		};
方法：refresh()  刷新		
 */

(function(){
	//随机绘制颜色不同的标签的构造函数
	function CreatRandom(opt){	
		var els = document.getElementById(opt.els);
		opt.els = els;
		var options = {
			els: "",  //挂载的元素
			sourceData:[],  //数据源
			minWidth:40,  //方块的最小宽度
			maxWidth:60,  //方块的最大宽度 
			safeDdistance: 15  //方块之间的安全距离
		};
		Object.assign(options,opt);  		
		this.options = options;
		this.init();
	}
	
	//初始化
	CreatRandom.prototype.init = function(){
		var els = this.options.els;
		this.width = els.offsetWidth;
		this.height = els.offsetHeight;
		this.itemstyle();
		this.creatAllArr();
		this.renderDom();
	}
	//创建每数组的每个item
	CreatRandom.prototype.crearArrItem = function(){
		var obj = {};
		//生成随机的宽度和高度  范围40--60
		var minWidth = this.options.minWidth,  //方块的最小宽度
			maxWidth = this.options.maxWidth;  //方块的最大宽度 
		obj.randomWidth = parseInt(Math.random()*(maxWidth-minWidth)+minWidth);
	    obj.left = parseInt(Math.random()*(this.width-obj.randomWidth));
	    obj.top = parseInt(Math.random()*(this.height-obj.randomWidth));
	    obj.x0 = obj.left + obj.randomWidth/2;
	    obj.y0 = obj.top + obj.randomWidth/2;
	    return obj;
	}
	//创建数组
	CreatRandom.prototype.creatAllArr = function(){
		var arr = [];
		var num = this.options.sourceData.length;
		
		while(arr.length < num){
			var item = this.crearArrItem();  //当前生成的元素
			var lock = true;
			for(var i=0; i<arr.length; i++){
				var arrItem = arr[i];  //数组内部的
				var itemRadius = item.randomWidth/2;  //当前生成的元素的半径
				var arrItemRadius = arrItem.randomWidth/2;  //数组内部的元素的半径
				var safeDdistance = this.options.safeDdistance;  //元素之间的安全距离
				//找出x轴的范围两个方块重叠的部分
				var xlock = Math.abs(item.x0 - arrItem.x0) - (itemRadius + arrItemRadius + safeDdistance); 
				//找出y轴的范围两个方块重叠的部分
				var ylock = Math.abs(item.y0 - arrItem.y0) - (itemRadius + arrItemRadius + safeDdistance);
							
				if(xlock < 0 && ylock<0){
					lock = false;
					break;
				}
			}
			
			if(lock){
				arr.push(item);
			}
			
		}
		
		this.allArr = arr;
	}
	
	//每个色块的样式
	CreatRandom.prototype.itemstyle = function(){
		var styleObj = {
			color: "#FFF",
			fontSize: '0.3rem',
			textAlign: 'center',
			position:'absolute',
		    overflow:'hidden',
		    borderRadius:"50%"
		};
		this.styleObj = styleObj;
	}
	//创建每个色块元素
	CreatRandom.prototype.creatItem = function(){
		var div = document.createElement("div");
		div.className = "item";
		var styleObj = this.styleObj;
		styleObj.backgroundColor = "rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
		div.style = styleObj;
		for(keys in styleObj){
			div.style[keys] = styleObj[keys]
		}
		return div;
	}
	
	CreatRandom.prototype.renderDom = function(){
		var allArr = this.allArr;
		var sourceData = this.options.sourceData;  //数据源
		var div;
		var frament = document.createDocumentFragment();
		for(var i = 0; i<allArr.length; i++){
			var div = this.creatItem();
			div.style.width = allArr[i].randomWidth+"px";
			div.style.height = allArr[i].randomWidth+"px";
			div.style.top = allArr[i].top+"px";
			div.style.left = allArr[i].left+"px";
			div.style.lineHeight = allArr[i].randomWidth+"px";
			div.innerHTML = sourceData[i].hobby;
			frament.appendChild(div);
		}
		this.options.els.appendChild(frament);
	};
	
	//刷新方法
	CreatRandom.prototype.refresh = function(){
		this.allArr = [];
		this.options.els.innerHTML = "";
		this.creatAllArr();
		this.renderDom();
	};
	
	window.CreatRandom = CreatRandom;
})()

