
var index = -1;//index，默认从-1开始生成，所以这里先给一个固定的生成结构。后面可以调用这个函数
var aId = [];
var aData = JSON.parse(JSON.stringify(Data));
var cn =  0;
//面包屑导航
var crumbshtml = '';
var fids = [];

/////////////////////////////////////////////////////////////////////////////////////

setFile(index);//生成机构

setAsideHeight();//自适应高度

setTreePosition()//移动弹窗的固定定位

fileTree($('#tree-list'),index)//生成树状结构父级就是当前移动的总父级


$(window).resize(function(){//这里是当窗口发生执行的函数
	setAsideHeight();//获取header的高度侧边栏高度。完成自适应结构
	setTreePosition()//移动弹窗的位置
})

$('#movement').click(function(){
	if($('.tree').css('display')=='none'){
		$('.tree').css('display','block');
	}else{
		$('.tree').css('display','none');
	}
})

$('.tree-close').click(function(){
	$('.tree').css('display','none');
})

$('.tree-no').click(function(){
	$('.tree').css('display','none');
})

$('#tree-list p').click(function(){
	$('#tree-list p').each(function(i,ele){
		$(ele).css('background-color','none');
		$(ele).attr('class','');
	})
	$(this).css('background-color','#999');
	$(this).attr('class','tree-active')
})

$('#tree-list').delegate('p','click',function(){
	$('#tree-list p').each(function(i,ele){
		console.log(1);
		$(ele).css('background-color','');
		$(ele).attr('class','');
	})
	$(this).css('background-color','#999');
	$(this).attr('class','tree-active')
})


$('.tree-yes').click(function(){
	var id = null;//首先上来id是没有的
	var fid = [];//建立一个空数组
	fids = [];//存下来

	$('#tree-list p').each(function(i,ele){//循环所有p
		if($(ele).attr('class') == 'tree-active'){
			id = $(ele).parent().attr('"id');
		}
	})

	//找到所有同级的id
	$('.folder div').each(function(i,ele){
		if($(ele).attr('class') == 'folder-file-now' ){
			fid.push($(ele).attr('id'))
		}
	})


	//找到所有同级下所有id
	for(var i=0; i<fid.length; i++){
		getChild(fid[i]);
		fids.push(fid[i]);
	}


	for(var i=0; i<fids.length; i++){
		if(id == fids[i]){
			$('.tree').css('display','none');
			return;
		}
	}
	if(id==null){
		alert("请选择文件夹")
		return;
	}else{
		fo1 : for(var i=0; i<aData.length; i++){
			fo2	: for(var j=0; j<fid.length; j++){
					if(aData[i]['id'] == fid[j]){
						aData[i]['pid'] = id;
						setFile(index);
						$('#tree-list').html('');
						fileTree($('#tree-list'),-1);
						$('.tree').css('display','none');
						break fo2;
				}
			}
		}
	}
})

function getChild(id){

	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == id){
			var iPid = aData[i]['id'];
			fids.push(aData[i]['id']);
			getChild(iPid);
		}
	}
}

$('#newFile').click(function(){

	var name = getName(index);
	var id = new Date().getTime();
	var obj = {
		"name" : name,
		"id" : id,
		"pid" : index
	}
	var html = '<div class="folder-file"'+ 'id='+ id +' ><i class="ico"></i><div class="text"><p>'+ name +'</p><input type="text" value="'+ name +'"></div></div>'
	$('.folder').append(html);
	aData.push(obj);
	$('#tree-list').html('');
	fileTree($('#tree-list'),-1);

})


$('.folder').delegate('div','click',function(){
	if($(this).attr('class') == 'folder-file'){
		$('.folder div').each(function(i,ele){
			if($(ele).attr('class') != 'text' ){
				$(ele).attr('class','folder-file');
			}
		})
		$(this).attr('class','folder-file-now');
		$('.sub-nav-operation-list').css('display','block');
		getActive(index);
		return false;
	}
	if($(this).attr('class') == 'folder-file-now'){
		$(this).attr('class','folder-file');
		$('.sub-nav-operation-list').css('display','none');
		getActive(index);
		return false;
	}
	return false;
})




$('#more').click(function(){
	if($('#sub-nav-operation-list-more').css('display') == 'none'){
		$('#sub-nav-operation-list-more').css('display','block');
	}else{
		$('#sub-nav-operation-list-more').css('display','none');
	}
})


$('.folder').delegate('div','dblclick',function(){
	$('.folder').html('');
	$('.file-titer-zero').css('display','none');
	$('.file-titer-nozerp').css('display','block')
	var id = $(this).attr('id')
	index = getId(id);
	crumbs(id);
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == id){
			$('.folder').append(
				'<div class="folder-file"'+ 'id='+ aData[i]['id'] +'><i class="ico"></i><div class="text"><p>'+ aData[i]['name'] +'</p><input type="text" value="'+ aData[i]['name'] +'"></div></div>'
			);
		}
	}
	return false;
})

$('.file-titer-nozerp').delegate('a','click',function(){//首先当头部导航信息点击的时候
	if($(this).attr('id') != 'back' && $(this).attr('id') != 'all'){
		//判断当前的id是否是等于返回上一级或者是查看全部。如果都是
		var thisId = $(this).attr('id');//那么当前的这个就是当前被点击的那个元素的id
		index = getId(thisId);//当前的这个id就是通过数据得到的这个id
		setFile(thisId);//根据当前的这个id重新生成结构
		rmoveCrumbs(thisId);//从新生成头部导航栏信息
	}
	if($(this).attr('id') == 'back'){//如果当前点击的是返回返回上一级的话
		if(index == -1){//并且当前的索引是从0开始，就代表这个第一级
			return;//就直接返回
		}
		getFlistFather(index);//直接找到他的父级拿到当前的这个索引。也就是当前的id
	}
	if($(this).attr('id') == 'all'){
		getAll();
	}
})


$('#rName').click(function(){
	getActive(index);
	if(aId.length > 1){
		alert("只能更改一个名字");
	}else{
		var nowId = aId[0];
		var nowVal = $('#'+nowId + ' .text input').val();
		$('#'+nowId + ' .text p').css('display','none')
		$('#'+nowId + ' .text input').css('display','block');
		$('#'+nowId + ' .text input').select().focus();
		$('#'+nowId + ' .text input').blur(function(){
			var val = $('#'+nowId + ' .text input').val();
			var off = verificationName(index,val);
			if(val == ''){
				$('#'+nowId + ' .text p').css('display','block').html(nowVal);
				$('#'+nowId + ' .text input').css('display','none').val(nowVal);
				return;
			}
			if(val == nowVal){
				$('#'+nowId + ' .text p').css('display','block').html(nowVal);
				$('#'+nowId + ' .text input').css('display','none').val(nowVal);
				return;
			}
			if(off){
				$('#'+nowId + ' .text p').css('display','block').html(val);
				$('#'+nowId + ' .text input').css('display','none').val(val);
				for(var i=0; i<aData.length; i++){
					if(aData[i]['id'] == nowId){
						aData[i]['name'] = val;
					}
				}
			}else{
				$('#'+nowId + ' .text input').focus().select();
			}
		})


	}
})

/*
事件委托，判断是不是能解决
*/
/*
$('.file-area').mousedown(function(ev){
	var oDiv = $('<div>');
	$('.file-area').append(oDiv);
	var disX = ev.pageX;
	var disY = ev.pageY;
	$(document).mousemove(function(ev){
		var iW = Math.abs(ev.pageX - disX);
		var iH = Math.abs(ev.pageY - disY);
		var iT = Math.min(disY,ev.pageY);
		var iL = Math.min(disX,ev.pageX);
		oDiv.css('position','absolute').css('left',iL).css('top',iT).css('width',iW).css('height',iH).css('border','1px solid #000').css('background','deepskyblue')
		.css('opacity',0.4);
		crash(oDiv);
		return false;
	})
	$(document).mouseup(function(){
		oDiv.remove();
		$(document).off();
		return false;
	})
	return false;
})
*/
//folder-file

/*
$('.file-area').delegate('section','mousedown',function(){
	alert(2);
})
*/
var fileArea = document.getElementById('file-area');//拿到拖拽的范围

fileArea.onmousedown = function(ev){//当鼠标移入的时候发生的事件
	var ev = ev || event;//兼容低版本浏览器
	var disX = ev.pageX;//拿变量储存鼠标按下的位置
	var disY = ev.pageY;
	var target = ev.target || ev.srcElement;//兼容低版本的浏览器
	/*
	这里要用到事件源：event 对象，事件源，不管在哪个事件中，只要你操作的那个元素就是事件源。
	ie：window.event.srcElement
	标准下:event.target
	nodeName:找到元素的标签名*/
//	toLowerCase()//转成小写的
	if(target.nodeName.toLowerCase() == "section"){//如果当前的标签的名字是这个的话

		$('.folder input').each(function(i,ele){//遍历每一项的input
			$(ele).blur();//失去焦点
		})


		var oDiv = document.createElement('div');//创建一个div标签。英语框选
		oDiv.className = 'selectBox';//加上样式
		fileArea.appendChild(oDiv);//添加到html里面

		fileArea.onmousemove = function(ev){//当鼠标移动的时候
			/*
				$('.folder-file').each(function(i,ele){
		$(ele).attr('class','folder-file');
	})
	*/

			var w = Math.abs(ev.pageX - disX);//当前鼠标移动到位置-鼠标按下时候的位置就是元素的宽度
			var h = Math.abs(ev.pageY - disY);//同上拿到高度
			var t = Math.min(ev.pageY,disY);//top值就是起始位置和结束位置
			var l = Math.min(ev.pageX,disX);	//同样left值同上
			oDiv.style.width = w + 'px';//给div加上你样式
			oDiv.style.height = h + 'px';
			oDiv.style.left = l + 'px';
			oDiv.style.top = t + 'px';
			selectBoxDetection(w,h,t,l);//拿到
			return false;//返回
		}
		fileArea.onmouseup = function(){//鼠标抬起的时候
			fileArea.onmousemove = fileArea.onmouseup = null;//把鼠标按下和移动到事件清空
			fileArea.removeChild(oDiv);//删除动态创建的元素
		}
		return false;//执行完返回
	}
}





/////////////////////////////////////////////////////////////////////////////////////

function selectBoxDetection(w,h,t,l){//把移动的div的宽高left和top值传进来进行比较
	var t = t;
	var l = l;
	var b = t + h;//这里的top值记得加上自身的 一个高度
	var r = l + w;//同上加上自身的宽度


	$('.folder-file').each(function(i,ele){//循环数组的所有的文件夹
		var t2 = $(ele).offset().top;//拿到当前每个的宽高left和top值
		var l2 = $(ele).offset().left;
		var b2 = t2 + $(ele).height();
		var r2 = l2 + $(ele).width();
		if(t>b2 || l>r2 || b<t2 || r<l2){//和当前的行进比较

		}else{
			$(ele).attr('class','folder-file-now');//如果碰撞上了。把碰上的内容机上样式
			$('.sub-nav-operation-list').css('display','block');//隐藏的导航栏出现
			getActive(index);//把这些有样式的从新放进数组
		}
	})
}

/*
function crash(obj){
	var t1 = obj.offset().top;
	var l1 = obj.offset().left;
	var b1 = t1 + obj.height();
	var r1 = l1 + obj.width();
	$('.folder-file').each(function(i,ele){
		var t2 = $(ele).offset().top;
		var l2 = $(ele).offset().left;
		var b2 = t2 + $(ele).height();
		var r2 = l2 + $(ele).width();
		if(t1>b2 || l1>r2 || b1<t2 || r1<l2){

		}else{
			$(ele).attr('class','folder-file-now');
			$('.sub-nav-operation-list').css('display','block');
			getActive(index);
		}
	})
}
*/
function setAsideHeight(){
	var h = $(window).height() - 57;//文件区域的高度就是当前可视区的高度减去header高度
	$('.sidebar').css('height',h);//重新设置侧边栏的高度
	$('.file-area').css('height',h);//重新设置隐藏的头部边缘的高度
}

function setTreePosition(){//生成移动文件夹的时候中间出现的弹框。是在文档中的居中的
	var l = ($(window).width() - $('.tree').outerWidth())/2;
	var t = ($(window).height() - $('.tree').outerHeight())/2;
	$('.tree').css('top',t).css('left',l)//设置高度和宽度
}

function setFile(index){//生成结构
	var arr = [];//先声明个数组
	$('.folder').html('');//然后清空。重新添加
	for(var i=0; i<aData.length; i++){//循环数组。
		if(aData[i]['pid'] == index){//如果当前数组中的pid等于当前点击的调用的这个
			$('.folder').append(//就往内容呢里添加结构
				'<div class="folder-file"'+ 'id='+ aData[i]['id'] +'><i class="ico"></i><div class="text"><p>'+ aData[i]['name'] +'</p><input type="text" value="'+ aData[i]['name'] +'"></div></div>'
			);
		}
	}
}

//生成树状表

function fileTree(father,index){//生成树形菜单、、参数。是父级和当前的是那个
	var tIndex = index;//这里记得就给索引
	var c = null;//先给变量
	for(var i=0; i<aData.length; i++){//循环数组
		if(aData[i]['pid'] == tIndex){//如果当前的这个数组等于当前先中的这个
			cn = 0;//先给设置 变量
			cn = getNumberOfPlies(tIndex);//当前的在第几层
			var aLi = $('<li "id="'+ aData[i]['id'] +'"></li>')//生成结构
			var left = cn * 15;//生成树形结构。父级与子集之间有个margin值
			var oP = $('<p>').css('margin-left',left)//给每个p标签父级都加上left的距离
			aLi.append(oP.append('<i></i><em></em><span>'+ aData[i]['name'] +'</span>'))//把生成的p标签和下面的结构都添加到li里面
			father.append(aLi)//最后把li添加到他的父级里面
			var id = aData[i]['id']//此时的id就是当前的数据中的每一项
			var off = isChild(id);//调用查看当前有没有子集有过就是当前这个的开关
			if(off){//如果有
				var ul = $('<ul>');//就生成ul
				var thisIndex = id;//这时的id也就是当前的id
				fileTree(ul,thisIndex);//如果有继续地柜
				aLi.append(ul);//最后添加到父级
			}
		}
	}
}


//获得在第几层
function getNumberOfPlies(c){//判断在第几层
	for(var i=0; i<aData.length; i++){//循环所有的数据
		if(aData[i]['id'] == c){//如果当前的数据中的id等于当前的这个id
			cn++;//变量就加加，就让他的id不断向上加
			c = aData[i]['pid'];//当前的pid就加加
			if(c == -1){//如果当前的pid等于-1
				return cn;//就返回这个cn，当前是第几个
			}
			getNumberOfPlies(c);//递归。一直到没有就是返回
			break;
		}
	}
	return cn;//拿到当前是第几个
}

function isChild(id){//判断下他还有没有子集
	var off = false;//上来先默认没有子集
	for(var i=0; i<aData.length; i++){//循环数组，
		if(aData[i]['pid'] == id){//如果当前的pid等于当前的id就证明他是一级的
			off = true;	//返回这个值
		}
	}
	return off;
}

function crumbs(id){//添加头部区域导航拿到当前是不是这个文件夹下的名字。有就添加内容
	 $('.file-titer-nozerp').append('<a href="javascript:;" id="'+ id +'">'+ getNowName(id) +'</a><i>></i>')
}

function getName(index){//新建文件夹。
	var arrName = [];//给个空数组，存名字
	var arrNumber = [];//然后在存个数字的数组
	var num = [];//给个空的数组
	var re1 = new RegExp('^新建文件夹$','gi');//运用正则匹配全局，开头有结尾必须是新建文件夹并且不区分大小写
	var re2 = new RegExp('^新建文件夹\\(1\\)$','gi');//开头是新建文件夹结尾是以1结束
	var re3 = new RegExp('^新建文件夹\\(|\\)$','gi')//新建文件夹 ;
	var onoff1 = true;//开关。
	var onoff2 = true;//开关
	var onoff3 = true;
	var name = '';
	for(var i=0; i<aData.length; i++){//循环数组。
		if(aData[i]['pid'] == index){//判断当前的数组中的pid是不是等于当前的这个名字
			if(re1.test(aData[i]['name'])){//如果是当前拿到就是新建文件夹
				onoff1 = false;//就停止下面的任务执行
			}
		}
	}
	if(onoff1){//如果这个
		return "新建文件夹"
	}
	for(var i=0; i<aData.length; i++){//循环数组
		if(aData[i]['pid'] == index){//判断当前的pid是不是就是当前的元素的这个
			if(re2.test(aData[i]['name'])){//如果当前成功 情况下就走
				onoff2 = false;
			}
		}
	}
	if(onoff2){//如果当前
		return "新建文件夹(1)"//返回这值
	}
	for(var i=0; i<aData.length; i++){//如果当前
		if(aData[i]['pid'] == index){
			if(re3.test(aData[i]['name'])){
				var str = aData[i]['name'].replace(re3,'');
				str = parseInt(str);
				if(!isNaN(str)){
					arrNumber.push(str)
				}
			}
		}
	}
	arrNumber.sort(function(a,b){
		return a - b;
	})
	var f = arrNumber[0];
	var l = arrNumber[arrNumber.length - 1];
	if(((l - f)+1) == arrNumber.length ){
		l++
		var m = l;
		name = '新建文件夹('+ m +')'
		return name;
	}else{
		var s = f;
		var y = 0;
		fo1 : for(var i=y; i<arrNumber.length; i++){
			fo2 : for(var j=s; j<=l; j++){
				if(j == arrNumber[i]){
					s++;
					y++;
					break fo2;
				}else{
					name = '新建文件夹('+ j +')';
					return name;
				}
			}
		}
	}
}

function rmoveCrumbs(index){
	crumbshtml = '';//清空数据，重新渲染
	$('.file-titer-nozerp').html('');//隐藏的数据重新渲染
	$('.file-titer-nozerp').html('<a href="javascript:;" id="back">返回上一级</a><i>|</i><a href="javascript:;" id="all">所有文件</a><i></i>')//重新拿到数据。进行渲染
	getFather(index)//从新拿到他的父级
}

function repeatCrumbs(){//所有文件显示，下一项隐藏
	$('.file-titer-zero').css('display','block');
	$('.file-titer-nozerp').css('display','none')
	$('.file-titer-nozerp').html('');//清空内容，给当前的从新加上、、恢复最初始化的内容
	$('.file-titer-nozerp').html('<a href="javascript:;" id="back">返回上一级</a><i>|</i><a href="javascript:;" id="all">所有文件</a><i>></i>')
}

function getFather(thisId){
	var off = true;//开关
	var thisPid = null;//默认当前的pid是没有的
	var html = '';//清空内容。重新渲染
	var index = null;//索引页清空
	for(var i=0; i<aData.length; i++){//循环数据。判断
		if(aData[i]['id'] == thisId){//当前的id是否等于当前点击的这个
			thisPid = aData[i]['pid'];//如果等于，那么这个就是当前的pid
			index = i;//当前的索引就是每一项I
		}
	}
	html = crumbshtml//html的内容就是
	crumbshtml = '';
	crumbshtml += '<a href="javascript:;" id="'+ aData[index]['id'] +'">'+ aData[index]['name'] +'</a><i>></i>'
	crumbshtml += html;
	for(var i=0; i<aData.length; i++){
		if(aData[i]['id'] == thisPid){
			off = false;
			getFather(aData[i]['id']);
		}
	}
	if(off){
		$('.file-titer-nozerp').append(crumbshtml);
		return;
	}
}

function getFlistFather(id){
	var pid = getNowPid(id)	//拿到当前是那个pid、、拿到当前的的
	setFile(pid);//重巡根据当前的pid渲染数据
	index = pid;//索引也是当前的这个
	if(pid == -1){//当前的如果pid是从-1开始的话
		repeatCrumbs()//每一集都显示
		return;
	}
	rmoveCrumbs(pid);//恢复原来
}

function getAll(){
	repeatCrumbs();
	setFile(-1);
	index = -1;
}

function getId(id){
	for(var i=0; i<aData.length; i++){//循环数据
		if(aData[i]['id'] == id){//如果当前数据中的id等于当前点击的这个id也就是被选中的时候
			return aData[i]['id'];//返回这个数据中的id
		}
	}
}

function getNowName(id){//获取当前的id名字
	for(var i=0; i<aData.length; i++){//循环数组
		if(aData[i]['id'] == id){//如果当前的数组中的某一项的id等于当前的id
			return aData[i]['name'];//就拿到这个id的名字
		}
	}
}

function getNowPid(id){//首先循环所有。判断当前的id和传进来id是不是一样的
	for(var i=0; i<aData.length; i++){
		if(aData[i]['id'] == id){
			return aData[i]['pid'];//判断这个pid
		}
	}
}

function verificationName(index,val){
	var off = true;
	for(var i=0; i<aData.length; i++){
		if(aData[i]['pid'] == index && aData[i]['name'] == val){
			off = false;
		}
	}
	return off;
}

function getActive(index){
	aId = [];
	for(var i=0; i<aData.length; i++){//循环所有
		if(aData[i]['pid'] == index && $('#'+ aData[i]['id']).attr('class') == 'folder-file-now'){
			aId.push(aData[i]['id']);
			//判断当前有哪些是显示的状态。也就是有样式的
		}
	}

}
