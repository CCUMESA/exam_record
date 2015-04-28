var mF = 0,nF = 0; //行動裝置menu改寫旗標
var index = data.length-1; //當前年份索引值

$(window).load(function(){
	Load();
});	

skel.on('change', function() {
	Load();
});

function Load(){
	
	if (skel.isActive('narrower'))
	{
		$('.toggle').bind('touchend',chnF);
		$('.toggle').bind('click',chnF);
		function chnF(){if(nF == 0){nF = 1;addThingM();}}
		
	}
	else if(skel.isActive('mobile'))
	{
		$('.toggle').bind('touchend',chmF);
		$('.toggle').bind('click',chmF);
		function chmF(){if(mF == 0){mF = 1; addThingM();}}
	}
	else
	{
		addThingW();	
	}
	show();	
}

function addThingM(){
	$(nav).ready(function() {
		var StyleHead = '<a class="link depth-1" href="javascript:ChangeYear(';
		var StyleMiddle = ')" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><span class="indent-1"></span>';
		var nav = $('[data-action="navList"]>nav>a:eq(1)');
		var str = "";
		for (var i = 0; i < data.length  ; i++)
		{
			str = str + StyleHead + i + StyleMiddle + data[i][0] + Se(data[i][1]) + Ti(data[i][2]) +  '</a>';
		}
		nav.after(str);
	});
}

function addThingW(){

	var StyleHead = '<li style="white-space: nowrap;"><a  style="display: block;" onclick="ChangeYear(' // href="javascript:ChangeYear(';
	var StyleMiddle1 = ')" touchstart="ChangeYear(';
	var StyleMiddle2 = ')"> ';
	var StyleFoot = '</a></li>';
	$(".y").empty(); //清空menu內容
	var str = "";
	for(var i =0; i < data.length; i++)
	{
		str = str + StyleHead + i + StyleMiddle1 + i + StyleMiddle2 + data[i][0] + Se(data[i][1]) + Ti(data[i][2]) + StyleFoot;
	}
	$(".y").append(str);
}
function ChangeYear(i){
	index = i;
	show();
	$("html,body").animate({scrollTop: $("#main").offset().top-160}, 1000);
}
			
function Se(s){	return s ==0?'上':'下';	}
function Ti(t){

	switch(t){
		case 1:
			a = "第一次";
			break;
		case 2:
			a =  '第二次';
			break;
		case 3:
			a =  '第三次';
			break;
		case 4:
			a =  '第四次';
			break;
	}
	return a;
}

function show() {
	$(".content>section").empty();
	var str = "";
	for(var i =0;i<data[index][3];i++){
		var url = subject + '/'+ subject + '-' + data[index][0] + '-' + data[index][1] + '-' + data[index][2] + '-' + i +'.jpg';
		str = str + '\n' + '<a class="image featured"><img src="data/' + url + ' "alt="" /></a>';
	}
	$(".content>section").append(str);
	$("#year_show").empty();
	$("#year_show").append(data[index][0] + '年' + Se(data[index][1]) + Ti(data[index][2]) + '段考');
	
}

