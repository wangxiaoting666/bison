<%@page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>秘境DIS</title>
<link type="text/css" rel="stylesheet" href="css/style.css" />
<link type="text/css" rel="stylesheet" href="css/slidorion.css" />
<script language="javascript" type="text/javascript" src="js/jquery.js"></script>
<script language="javascript" type="text/javascript" src="js/jquery.min.js"></script>
<script language="javascript" type="text/javascript" src="js/jquery.easing.js"></script>
<script language="javascript" type="text/javascript" src="js/jquery.slidorion.min.js"></script>
<script language="javascript" type="text/javascript" src="js/zzsc.js"></script>
<script>
	$(function() {
		$('#slidorion').slidorion({
			first: 1,
			autoPlay: false,
			easing: 'easeInOutCubic',
			effect: 'random'
		});
	});
</script>
<style type="text/css">
.flash { width:100%; height:500px; position:relative;border-bottom:1px solid #edeeef;}
.flash .con li { width:100%; height:500px; position:absolute; top:0; left:0;}
.flash .but { width:100px; position:absolute; top:470px; left:48.5%; z-index:222;}
.flash .but li { width:13px; height:13px; display:inline-block; background:url(images/dot.png) -13px 0 no-repeat; float:left; margin-right:5px; }
.flash .but li.current { background:url(images/dot.png) 0 0 no-repeat; margin-right:5px;}
</style>
</head>
<body>
	<div class="top">
    	<div class="t_txt"><a href="#" target="_parent">设为首页</a> | <a href="#" target="_parent">加入收藏</a></div>
    </div>
    <div class="tip">
    	<div class="logo">
        	<img src="images/logo.jpg" width="229" height="62" alt="秘境DIS"/>
        </div>
        <div class="search">
			<dl>
				<dt><input type="text" class="txt_search" placeholder="输入关键词进行查询"/></dt>
				<dd><input name="搜索" type="button" class="btn_search" value="搜索" /> </dd>
			</dl>
		</div>
    </div>
    <div class="menu">
		<div class="m_menu">
			<ul>
            	<li><a href="index.html" target="_parent">首页</a></li>
				<li><a href="kown.html" target="_parent">发现已知</a></li>
                <li><a href="unkown.html" target="_parent">踏足未知</a></li>
				<li><a href="fenxiang.html" target="_parent">秘境分享</a></li>
				<li><a href="shanshi.html" target="_parent">善事利器</a></li>
				<li><a href="zuji.html" target="_parent">足迹探秘</a></li>
				<li><a href="daren.html" target="_parent">达人团队</a></li>
			</ul>
		</div>
    </div>
    <div class="flash">
    	<ul class="con">
        	<li style="background:url(images/banner1.jpg) center no-repeat; z-index:11;"></li>
            <li style="background:url(images/banner2.jpg) center no-repeat;"></li>
            <li style="background:url(images/banner3.jpg) center no-repeat;"></li>
        </ul>
        <!--按钮开始-->
        <ul class="but">
        	<li></li>
            <li></li>
            <li></li>
        </ul>
        <!--按钮结束-->
    </div>
<script type="text/javascript">
	var index=0;
	var playCount=null;
	
	/*当鼠标移动到按钮上时*/
	$(".but li").hover(function(){
		clearInterval(playCount);//当执行滑动的时候要停止之前的动画
		//给按钮添加样式，改变背景图片,并且除了本身之外，同级的元素li去掉样式current
		$(this).addClass("current").siblings().removeClass("current");
		index = $(this).index();
		//显示对应的序列号的内容，并隐藏其他的
		$(".con li").eq(index).fadeIn().siblings().fadeOut();
		//alert(index);
		
	}).mouseout(function(){
		auto_play();//调用方法
	});

	/*利用函数方法实现自动播放*/
	function auto_play(){
		//定时播放,每隔3秒播放一次
		playCount=setInterval(function(){
			index++;
			if(index > 3){index=0;}
			//alert("自动播放的序列号"+index);
			$(".but li").eq(index).addClass("current").siblings().removeClass("current");	
			$(".con li").eq(index).fadeIn().siblings().fadeOut();
		},3000);
		
	};
	
	auto_play();//调用方法
	
</script>
	<div class="main">
    	<div class="mi">
        	<div class="mi_title">秘境分享<span class="eng">SECTET AREA SHARE</span><span class="more">more>></span></div> 
            <div class="xin">
            	<div class="xin_tilte">最新</div>
                <div class="x_con">
                	<dl class="pad_13">
						<dt>
							<a href="fenxiang1.html" target="_blank"><img src="images/mi1.jpg" width="290" height="230" alt=""/></a>
                        </dt>
                        <dd>秘境分享：极北之地</dd>
                    </dl>
                    <dl class="pad_13">
						<dt>
							<a href="fenxiang1.html" target="_blank"><img src="images/mi2.jpg" width="290" height="230" alt=""/></a>
                        </dt>
                        <dd>秘境分享：乌兰布统草原</dd>
                    </dl>
                    <dl class="pad_13">
						<dt>
							<a href="fenxiang1.html" target="_blank"><img src="images/mi3.jpg" width="290" height="230" alt=""/></a>
                        </dt>
                        <dd>秘境分享：印度游记</dd>
                    </dl>
                    <dl>
						<dt>
							<a href="fenxiang1.html" target="_blank"><img src="images/mi4.jpg" width="290" height="230" alt=""/></a>
                        </dt>
                        <dd>秘境分享：日本</dd>
                    </dl>
                </div>
                <div class="xin_tilte2">最热</div>
                <div class="x_con">
                	<dl class="pad_13">
						<dt>
							<a href="fenxiang1.html" target="_blank"><img src="images/mi1.jpg" width="290" height="230" alt=""/></a>
                        </dt>
                        <dd>秘境分享：极北之地</dd>
                    </dl>
                    <dl class="pad_13">
						<dt>
							<a href="fenxiang1.html" target="_blank"><img src="images/mi2.jpg" width="290" height="230" alt=""/></a>
                        </dt>
                        <dd>秘境分享：乌兰布统草原</dd>
                    </dl>
                    <dl class="pad_13">
						<dt>
							<a href="fenxiang1.html" target="_blank"><img src="images/mi3.jpg" width="290" height="230" alt=""/></a>
                        </dt>
                        <dd>秘境分享：印度游记</dd>
                    </dl>
                    <dl>
						<dt>
							<a href="fenxiang1.html" target="_blank"><img src="images/mi4.jpg" width="290" height="230" alt=""/></a>
                        </dt>
                        <dd>秘境分享：日本</dd>
                    </dl>
                </div>
            </div>
            <div class="fa_title">发现已知<span class="eng">FIND THE KNOWN</span></div>
            <div class="fa">
            	<div class="f_con">
                	<div class="f_con_title">星级景区<a href="kown.html" target="blank"><span class="more">more>></span></a></div>
					<dl class="pad_13">
						<dt>
							<a href="xingji1.html" target="_blank"><img src="images/yi1.jpg" width="290" height="180" alt=""/></a>
                        </dt>
                        <dd>发现已知：哈尔滨</dd>
                    </dl>
                    <dl>
						<dt>
							<a href="xingji1.html" target="_blank"><img src="images/yi2.jpg" width="290" height="180" alt=""/></a>
                        </dt>
                        <dd>发现已知：韩国</dd>
                    </dl>
                    <dl class="pad_13">
						<dt>
							<a href="xingji1.html" target="_blank"><img src="images/yi3.jpg" width="290" height="180" alt=""/></a>
                        </dt>
                        <dd>发现已知：丽江</dd>
                    </dl>
                    <dl>
						<dt>
							<a href="xingji1.html" target="_blank"><img src="images/yi4.jpg" width="290" height="180" alt=""/></a>
                        </dt>
                        <dd>发现已知：普吉岛</dd>
                    </dl>
                </div>
                <div class="f_con2">
                	<div class="f_con_title">最新资讯<a href="zixun1.html" target="blank"><span class="more">more>></span></a></div>
                	<dl>
                    	<dt><img src="images/fx1.jpg" width="159" height="104" alt=""/></dt>
                        <dd>
                        	<div class="fx_title"><a href="zixun1.html" target="_blank">澳门为打造优质旅游服务"蛮拼的"</a></div>
                            <div class="fx_txt"><a href="zixun1.html" target="_blank">作为一个有着独特魅力的旅游休闲城市，澳门一直吸引全世界的游客纷至沓来。世界旅游业理事会发布的报告称，2014年澳门旅游业产值占GDP的43.1%...</a></div>
                        </dd>
                    </dl>
                    <dl>
                    	<dt><img src="images/fx2.jpg"  width="159" height="104" alt=""/></dt>
                        <dd>
                        	<div class="fx_title"><a href="zixun1.html" target="_blank">朝鲜启动鸭绿江岸旅游区 服务群主要为中国游客</a></div>
                            <div class="fx_txt"><a href="zixun1.html" target="_blank">据朝中社22日报道，新义州鸭绿江岸旅游区启动仪式于20日举行。朝鲜和中方旅行社在鸭绿江岸携手建成这一现代化综合旅游服务区...</a></div>
                        </dd>
                    </dl>
                    <dl>
                    	<dt><img src="images/fx3.jpg"  width="159" height="104" alt=""/></dt>
                        <dd>
                        	<div class="fx_title"><a href="zixun1.html" target="_blank">达古冰山第六届冰雪节开幕 推四项特色活动</a></div>
                            <div class="fx_txt"><a href="zixun1.html" target="_blank">12月19日，第六届黑水·达古冰山冰雪旅游节推介会在成都市宽窄巷子举行，拉开黑水·达古冰山冰雪旅游节的序幕...</a></div>
                        </dd>
                    </dl>
                    <dl>
                    	<dt><img src="images/fx4.jpg"  width="159" height="104" alt=""/></dt>
                        <dd>
                        	<div class="fx_title"><a href="zixun1.html" target="_blank">广西昭平下白村荣获第六届中国景观村落称号</a></div>
                            <div class="fx_txt"><a href="zixun1.html" target="_blank">近日,中国古村落保护与发展专业委员会在古城西安举办"古村落与'一带一路'"论坛暨"第六届中国景观村落"授牌颁证大会...</a></div>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="fa_title pad_50">踏足未知<span class="eng">SET FOOT ON THE UNKNOWN</span><a href="unkown.html" target="blank"><span class="more">more>></span></a></div>
            <div id="slidorion">
                <div id="slider">
                    <div id="slide1" class="slide">
                        <img src="images/wz1.jpg" width="765" height="400" />
                    </div>
                    <div id="slide2" class="slide">
                        <img src="images/wz2.jpg" width="765" height="400" />
                    </div>
                    <div id="slide3" class="slide">
                        <img src="images/wz3.jpg" width="765" height="400" />
                    </div>
                </div>
                
                <div id="accordion">
                    <div class="link-header">格陵兰岛</div>
                    <div class="link-content">
<p>成吉思汗的铁蹄几乎踏平了整个欧亚大陆，也几乎把蒙古人种撒向了世界的各个角落。在北极，他的后人被称作——因纽特人。他们在一片白茫茫的荒芜之中，学会了别具一格的生存本领。而“基维亚克”这种非常人所能享受的美食就是其中之一。</p>
<p>对于爱好探秘的朋友们，北极圈是绝不可错过的选择。对于大多数人而言，真正的挑战并不是严寒和路费，而是需要去学习一套迥然不同的生存规则。小D带着大家先从当地人的美食说起。</p>
                        <a href="unkown1.html" class="f_te">了解详情>></a>
                    </div>
                    <div class="link-header">神农架</div>
                    <div class="link-content">
                        <p>来到神农架，小D建议避开旅行团所设置的路线，当然这一切依然是以安全为前提。在中国，秘境隐藏在很多深山密林中，而神农架就是典型的秘境之一，在这里有太多的传说和未知。</p>
<p>神农架林区，是全国唯一以林区命名的县级行政区。这里森林葱郁，风景秀丽，以其绝无仅有的奇山异水、奇木异卉、奇闻异说及“野人”、“白化动物”等难解之谜，为世人瞩目。而神农架的得名，又与华夏始祖炎帝神农氏有著密切联系。</p>
                        <a href="unkown1.html" class="f_te">了解详情>></a>
                    </div>
                    <div class="link-header">湘西</div>
                    <div class="link-content">
                        <p>湘西民间，自古就有赶尸这一行业，学这行业的，必须具备有两个条件：一胆子大，二是身体好。而且，必须拜师。赶尸匠从不乱收徒弟。学徒由家长先立字据，接着赶尸匠必须面试。一般来讲，要看满16岁，身高1.7米以上，同时还有一个十分特殊的条件，相貌要长得丑一点。 </p>
                        <a href="unkown1.html" class="f_te">了解详情>></a>
                    </div>
                </div> 
            </div>
            <div class="zu">
    			<div class="zu_title">足迹探秘<span class="eng">FOOTPRINT QUEST</span><a href="zuji.html" target="blank"><span class="more">more>></span></a></div>
				<div class="zu_con">
                	<ul>
                        <li><a href="zuji1.html" target="_blank">大西洋“魔海”漩涡逃生记</a><span class="time">2015年12月17日</span></li>
                        <li><a href="zuji1.html" target="_blank">发现“约克城”号航空母舰</a><span class="time">2015年12月17日</span></li>
                        <li><a href="zuji1.html" target="_blank">孤女险海生还记</a><span class="time">2015年12月17日</span></li>
                        <li><a href="zuji1.html" target="_blank">人类首次登月差点永留月球</a><span class="time">2015年12月17日</span></li>
                        <li><a href="zuji1.html" target="_blank">死亡地带那棱格勒峡谷</a><span class="time">2015年12月17日</span></li>
                        <li><a href="zuji1.html" target="_blank">泰坦尼克号船长“鬼屋”惊魂之谜</a><span class="time">2015年12月17日</span></li>
                        <li><a href="zuji1.html" target="_blank">探索者的故事：法国女孩独身纵马走西域</a><span class="time">2015年12月17日</span></li>
                        <li><a href="zuji1.html" target="_blank">泰坦尼克号船长“鬼屋”惊魂之谜</a><span class="time">2015年12月17日</span></li>
                    </ul>
                </div>   
            </div>
			<div class="da">
    			<div class="da_title">达人团队<span class="eng">TALENT TEAM</span><a href="daren.html" target="blank"><span class="more">more>></span></a></div>
				<div class="da_con">
					<div class="box-zzsc">
                        <div class="ctrl-panel">
                            <a class="m-page" href="javascript:;" rel="js_btn_list">1</a>
                            <a class="m-page" href="javascript:;" rel="js_btn_list">2</a>
                            <a class="m-page" href="javascript:;" rel="js_btn_list">3</a>
                            <a class="m-page" href="javascript:;" rel="js_btn_list">4</a>
                            <a class="m-page" href="javascript:;" rel="js_btn_list">5</a>
                        </div>
                        <div class=scroll-wrap>
                            <div class=scroll_box_content rel="scroll_box_content">
                                <div class=content_list>
                                    <img src="images/da1.jpg" width="593" height="240" alt="" />			
                                </div>
                                <div class=content_list>
                                    <img src="images/da2.jpg" width="593" height="240" alt="" />			
                                </div>
                                <div class=content_list>
                                    <img src="images/da3.jpg" width="593" height="240" alt="" />			
                                </div>
                                <div class=content_list>
                                    <img src="images/da4.jpg" width="593" height="240" alt="" />			
                                </div>
                                <div class=content_list>
                                    <img src="images/da5.jpg" width="593" height="240" alt="" />			
                                </div>
                            </div>
                        </div>
                    </div>
<script type="text/javascript">
function setContentTab(name, curr, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var cont = document.getElementById("con_" + name + "_" + i);
        menu.className = i == curr ? "up" : "";
        if (i == curr) {
            cont.style.display = "block";
        } else {
            cont.style.display = "none";
        }
    }
}
</script>    
    
                </div>   
            </div>
    
        </div>
    </div>
    <div class="footer">
    	<div class="foo_main">秘境DIS 版权所有 王丹  </div>
    </div>
</body>
</html>

