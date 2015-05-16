var mF = 0,nF = 0; //行動裝置menu改寫旗標
var index = data.length-1; //當前年份索引值

$(window).load(function(){
	if (skel.isActive('narrower'))
	{
		$('.toggle').bind('touchend',chnF);
		$('.toggle').bind('click',chnF);
	}
	else if(skel.isActive('mobile'))
	{
		$('.toggle').bind('touchend',chmF);
		$('.toggle').bind('click',chmF);
	}
	else{addThingW();}
	
	show();	
});	

skel.on('change', function() {
	Load();
});

function chnF(){
	if(nF == 0)
	{
		nF = 1;
		addThingM();
	}
}
function chmF(){
	if(mF == 0)
	{
		mF = 1; 
		addThingM();
	}
}
function addThingM(){
	$(nav).ready(function() {
		var StyleHead = '<a class="link depth-1" href="javascript:ChangeYear(';
		var StyleMiddle = ')" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><span class="indent-1"></span>';
		var nav = $('[data-action="navList"]>nav>a:eq(1)');
		var str = "";
		for (var i = 0; i < data.length  ; i++)
		{
			str = str + StyleHead + i + StyleMiddle + title_str(i) + '</a>';
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
		str = str + StyleHead + i + StyleMiddle1 + i + StyleMiddle2 + title_str(i) + StyleFoot;
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

function title_str(i)
{
	var str = ""
	if(data[i][4] != "")
	{
		str = data[i][4];
	}
	else
	{
		str = data[i][0] + '年' + Se(data[i][1]) + Ti(data[i][2]);
	}
	return str;
}

function show() {
	$(".content>section").empty();
	//資料庫網址
	var data_url = "http://ccumesa.github.io/exam_data/";
	
	//data_url = "/data/";  //本機端資料庫測試用
	var dw = data_url  + grade + '/' + subject + '/'+ data[index][0] + '-' + data[index][1] + '-' + data[index][2] + '.pdf';
	
	var str = '<p><a href="' + dw + '">PDF下載</a></p>';
	
	for(var i =1;i<=data[index][3];i++){
		var url = grade + '/' + subject + '/'+ data[index][0] + '-' + data[index][1] + '-' + data[index][2] + '-' + i +'.jpg';
		str = str + '\n' + '<a class="image featured"><img src="' + data_url + url + ' "alt="" /></a>';
	}
	$(".content>section").append(str);
	$("#year_show").empty();
	str = title_str(index);
	
	$("#year_show").append(str);
	document.title = subject + ':' + str + '-中正機械考古網';
	
}

