// JavaScript Document
$(document).ready(function(){
	$("#content .con_down .con_down_left div:eq(0)").mousemove(function(){
		$(this).css("background-image","none");
		$("#content .con_down .con_down_left div:eq(1)").css({
				"background":"url(img/blue.gif)",
				"color":"#FFF"
		});
		$("#content .con_down .con_down_left div:eq(0) span a").css("color","#03c");
		$("#content .con_down .con_down_left div:eq(1) span a").css("color","#FFF");		
	});	
	$("#content .con_down .con_down_left div:eq(1)").mousemove(function(){
		$(this).css("background-image","none");
		$("#content .con_down .con_down_left div:eq(0)").css({
				"background":"url(img/blue.gif)",
				"color":"#FFF"
		});
		$("#content .con_down .con_down_left div:eq(1) span a").css("color","#03c");
		$("#content .con_down .con_down_left div:eq(0) span a").css("color","#FFF");		
	});	
	
	
/*0*/	$("#content .con_down .con_down_right .right1 ul li:eq(0)").mousemove(function(){
		$("#content .con_down .con_down_right .right1 ul li:eq(0) a").css("color","#FFF");
		$(this).css({"background-color":"#E54F05",});
		$("#content .con_down .con_down_right .right1 ul li:eq(1)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(2)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(3)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(4)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(1) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(2) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(3) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(4) a").css("color","#666");
	});	

/*1*/	$("#content .con_down .con_down_right .right1 ul li:eq(1)").mousemove(function(){
		$("#content .con_down .con_down_right .right1 ul li:eq(1) a").css("color","#FFF");
		$(this).css({"background-color":"#E54F05",});
		$("#content .con_down .con_down_right .right1 ul li:eq(0)").css({"background":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(2)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(3)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(4)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(0) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(2) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(3) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(4) a").css("color","#666");
	});	
/*2*/	$("#content .con_down .con_down_right .right1 ul li:eq(2)").mousemove(function(){
		$("#content .con_down .con_down_right .right1 ul li:eq(2) a").css("color","#FFF");
		$(this).css({"background-color":"#E54F05",});
		$("#content .con_down .con_down_right .right1 ul li:eq(1)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(0)").css({"background":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(3)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(4)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(1) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(0) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(3) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(4) a").css("color","#666");
	});	
/*3*/	$("#content .con_down .con_down_right .right1 ul li:eq(3)").mousemove(function(){
		$("#content .con_down .con_down_right .right1 ul li:eq(3) a").css("color","#FFF");
		$(this).css({"background-color":"#E54F05",});
		$("#content .con_down .con_down_right .right1 ul li:eq(1)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(2)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(0)").css({"background":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(4)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(1) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(2) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(0) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(4) a").css("color","#666");
	});	
/*4*/	$("#content .con_down .con_down_right .right1 ul li:eq(4)").mousemove(function(){
		$("#content .con_down .con_down_right .right1 ul li:eq(4) a").css("color","#FFF");
		$(this).css({"background-color":"#E54F05",});
		$("#content .con_down .con_down_right .right1 ul li:eq(1)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(2)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(3)").css({"background-color":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(0)").css({"background":"none",});
		$("#content .con_down .con_down_right .right1 ul li:eq(1) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(2) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(3) a").css("color","#666");
		$("#content .con_down .con_down_right .right1 ul li:eq(0) a").css("color","#666");
	});	

});