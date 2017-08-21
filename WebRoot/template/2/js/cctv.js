// JavaScript Document

$(document).ready(function(){
/*1*/	$(".idContainer4 ul li:eq(0)").mousemove(function(){
		$(this).css("background-color","#060");
		$(".idContainer4 ul li:eq(1)").css({"background-color":"#fff","color":"#633"});
		$(".menu2 a").css("color","#633");
		$(".menu1 a").css("color","#FFF");
			
		});	
		$(".idContainer4 ul li:eq(1)").mousemove(function(){
		$(this).css("background-color","#060");
		$(".idContainer4 ul li:eq(0)").css({"background-color":"#fff","color":"#633"});
		$(".menu1 a").css("color","#633");
		$(".menu2 a").css("color","#FFF");
			
		});	
	});	