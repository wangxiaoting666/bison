// JavaScript Document
$(document).ready(function(){
	$("#zhuyao #yntz .buttonRight").click(function(){
		$("#zhuyao #yntz .wenzi1").	scrollTop(144);
	});
	$("#zhuyao #yntz .buttonLeft").click(function(){
		$("#zhuyao #yntz .wenzi1").	scrollTop(-144);
	});


	
	$("#experimental .introduction .ul-menu li").mousemove(function(){
		$(this).parent().children().css({
				"background-color":"#FFF",
				"color":"#001142"
		});
		$(this).css({
				"background-color":"#0a3e78",
				"color":"#FFF"
		});
		$number=$(this).index();
		$("#experimental .experimental-top .introduction .text").hide();
		$("#experimental .experimental-top .introduction .text.menu0"+$number).show();
	});	
	
	$("#experimental .features .ul-menu li").mousemove(function(){
		$(this).parent().children().css({
				"background-color":"#FFF",
				"color":"#001142"
			});
		$(this).css({
				"background-color":"#0a3e78",
				"color":"#FFF"
			});
		$number=$(this).index();
		$("#experimental .features .text").hide();
		$("#experimental .features .text.menu0"+$number).show();
	});	
	
	$("#experimental .environment .ul-menu li").mousemove(function(){
		$(this).parent().children().css({
				"background-color":"#FFF",
				"color":"#f9a400"
			});
		$(this).css({
				"background-color":"#f9a400",
				"color":"#FFF"
			});
		$number=$(this).index();
		$("#experimental .environment .text").hide();
		$("#experimental .environment .text.menu0"+$number).show();
	});	
	


	// JavaScript Document

	function Img(){
		$page=0;
		$total=3;
		$img=$(".img");
		$No=$(".No");
		$No.find("li:first").addClass("liHover");
		$img.find("img:not(:first)").hide();
		$operation=$img.find("img:eq("+$page+")");
		setInterval('$img.trigger("click")',4000);
		$(".img").on('click',function(){
			$operation.fadeOut(400).hide();
			if($page<$total-1){
				$page++;	
			}else{
				$page=0;	
			}
			$operation=$img.find("img:eq("+$page+")").fadeIn(400);
			$No.find(".liHover").removeClass("liHover").end().find("li:eq("+$page+")").addClass("liHover");
		});
		$(".No li").on('click',function(){
			$(this).parent().find(".liHover").removeClass("liHover").end().end().addClass("liHover");
			$page=$(this).text()-1;
			$operation.fadeOut(400).hide();
			$operation=$img.find("img:eq("+$page+")").fadeIn(400);
		});	
	}
	Img();

    $('#slider').revolution({
        delay:200,
        startheight:300,
        startwidth:900,
        hideThumbs:10,

        thumbAmount:2,

        shadow:1,                              //0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
        fullWidth:"on"                          // Turns On or Off the Fullwidth Image Centering in FullWidth Modus
    });
	
	
/*弹出菜单*/
	/*概况*/
		/*$(".out_menu_gaikuang").hide();
		$("#top .nav>ul>li:eq(1)").hover(
			function(){
				$(".out_menu_gaikuang").show();
			},
			function(){
				$(".out_menu_gaikuang").hide();
			}
		);
		$(".out_menu_gaikuang").hover(
			function(){
				$(".out_menu_gaikuang").show();
			},
			function(){
				$(".out_menu_gaikuang").hide();
			}
		);
	*//*教育*//*
		$(".out_menu_jiaoyu").hide();
		$("#top .nav>ul>li:eq(2)").hover(
			function(){
				$(".out_menu_jiaoyu").show();
			},
			function(){
				$(".out_menu_jiaoyu").hide();
			}
		);
		$(".out_menu_jiaoyu").hover(
			function(){
				$(".out_menu_jiaoyu").show();
			},
			function(){
				$(".out_menu_jiaoyu").hide();
			}
		);
	*//*建设*//*
		$(".out_menu_jianshe").hide();
		$("#top .nav>ul>li:eq(3)").hover(
			function(){
				$(".out_menu_jianshe").show();
			},
			function(){
				$(".out_menu_jianshe").hide();
			}
		);
		$(".out_menu_jianshe").hover(
			function(){
				$(".out_menu_jianshe").show();
			},
			function(){
				$(".out_menu_jianshe").hide();
			}
		);*/
	
});