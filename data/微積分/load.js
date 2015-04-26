var data=new Array();
data[0]=[102,0,1,1]; //[年分,上(0)下(1)學期,第幾次,有幾頁]
data[1]=[102,1,2,1];
data[2]=[103,0,1,1];
data[3]=[103,1,1,1];
data[4]=[104,0,1,3];
var mF = 0,nF = 0;
var index = data.length-1;			
var subject = "微積分";

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
		function chmF(){if(mF == 0){mF = 1; addThingM();}
		}
	}
	else
		addThingW();
	
	show();	
}

function addThingM(){
	$(nav).ready(function() {
		var StyleHead = '<a class="link depth-1" href="javascript:ChangeYear(';
		var StyleMiddle = ')" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><span class="indent-1"></span>';
		var nav = $('[data-action="navList"]>nav>[href="##"]');
		for (var i =data.length -1; i >=0 ; i--)
		{
			nav.after(StyleHead + i + StyleMiddle + data[i][0] + Se(data[i][1]) + Ti(data[i][2]) +  '</a>');
		}
	});
}

function addThingW(){

	var StyleHead = '<li style="white-space: nowrap;"><a href="javascript:ChangeYear(';
	var StyleMiddle = ')" style="display: block;">';
	var StyleFoot = '</a></li>';
	$(".y").empty(); //清空menu內容
	
	for(var i =0; i < data.length; i++)
	{
		var str = StyleHead + i + StyleMiddle + data[i][0] + Se(data[i][1]) + Ti(data[i][2]) + StyleFoot;
		$(".y").append(str);
	}
}
function ChangeYear(i){
	index = i;
	show()
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
	for(var i =0;i<data[index][3];i++){
		var url = subject + '/'+ subject + '-' + data[index][0] + '-' + data[index][1] + '-' + data[index][2] + '-' + i +'.jpg';
		$(".content>section").append('<a class="image featured"><img src="data/' + url + ' "alt="" /></a>');
	}
	$("#year_show").empty();
	$("#year_show").append(data[index][0] + '年' + Se(data[i][1]) + Ti(data[i][2]) + '段考');
	$('#main').scrollIntoView();
}

