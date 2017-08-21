<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>jida</title>
<link type = "text/css" rel="stylesheet" href="${sysParam.basePath}css/default.css">
<link type = "text/css" rel="stylesheet" href="${sysParam.basePath}css/index.css">
<link type = "text/css" rel="stylesheet" href="${sysParam.basePath}css/css.css">

<script src="${sysParam.basePath}js/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="${sysParam.basePath}js/jquery.slideBox.min.js" type="text/javascript"></script>
<script src="${sysParam.basePath}js/style.js" type="text/javascript"></script>
<link href="${sysParam.basePath}js/slider-revolution-slider/css/settings.css" rel="stylesheet">
<script src="${sysParam.basePath}js/slider-revolution-slider/js/jquery.themepunch.plugins.min.js" type="text/javascript"></script>
<script src="${sysParam.basePath}js/slider-revolution-slider/js/jquery.themepunch.revolution.min.js" type="text/javascript"></script>
<script src="${sysParam.basePath}js/slider-revolution-slider/js/jquery.themepunch.tools.min.js" type="text/javascript"></script>


<!--<script type="text/javascript">

    function imageRotater(id){
        var cases = "",
                album = document.getElementById(id),
                images = album.getElementsByTagName("img"),
                links = album.getElementsByTagName("a"),
                dt = album.getElementsByTagName("dt")[0],
                length = images.length,
                aIndex = 1,
                aBefore = length;
        for(var i=0;i< length;i++){
            cases += images[i].id + ':"'+images[i].getAttribute("src")+'",'
        }
        images[0].style.cssText = "position:absolute;top:0;left:0;";//修正图片位置错误
        var tip = document.createElement("dd");
        tip.style.cssText = "position:absolute;bottom:0;height:20px;width:125px;padding:10px;color:#fff;background:#fff;";
        album.insertBefore(tip,dt.nextSibling);
        if(!+"\v1"){
            tip.style.color = "#369";
            tip.style.filter = "alpha(opacity=67)"
        }else{
            tip.style.cssText += "background: rgba(164, 173, 183, .65);"
        }
        cases = eval("({"+cases.replace(/,$/,"")+"})");
        for(var i=0;i<length;i++){
            links[i].onclick = function(e){
                e =e || window.event;
                var index = this.toString().split("#")[1];
                aIndex = index.charAt(index.length-1);//☆☆☆☆
                images[0].src = cases[index];
                tip.innerHTML = images[aIndex -1].getAttribute("alt");
                !+"\v1" ?(e.returnValue = false) :(e.preventDefault());
            }
        }
        var prefix = images[0].id.substr(0,images[0].id.length -1);
        (function(){
            setTimeout(function(){
                if(aIndex > length){
                    aIndex = 1;
                }
                images[0].src = cases[prefix+aIndex];
                tip.innerHTML = images[aIndex -1].getAttribute("alt");
                tip.style.bottom = "-40px";
                links[aBefore-1].className = "";
                links[aIndex-1].className = "hover";
                aBefore = aIndex;
                aIndex++;
                move(tip);
                setTimeout(arguments.callee,1500)
            },1500)
        })()
        var move = function(el){
            var begin = parseFloat(el.style.bottom),
                    speed = 1;
            el.bottom = begin;
            (function(){
                setTimeout(function(){
                    el.style.bottom = el.bottom + speed + "px";
                    el.bottom += speed;
                    speed *= 1.5;//下一次移动的距离
                    if(el.bottom >= 0){
                        el.style.bottom = "0px";
                    }else{
                        setTimeout(arguments.callee,23);
                    }
                },25)
            })()
        }
    }
    window.onload = function(){
        try{document.execCommand("BackgroundImageCache", false, true);}catch(e){};
        imageRotater("album");
    }

</script>-->
<style type="text/css">
    html{ overflow-x:hidden; border:none;}
    #demo1{ width:100%; height:300px;}
    #demo1 ul{ width:100%;}
    #demo1 img{ width:100%; height:300px;}
</style>
<!--
<script>
    jQuery(function($){
        $('#demo1').slideBox();
        $('#demo2').slideBox({
            direction : 'top',//left,top#方向
            duration : 3.5,//滚动持续时间，单位：秒
            easing : 'linear',//swing,linear//滚动特效
            delay : 10,//滚动延迟时间，单位：秒
            startIndex : 1//初始焦点顺序
        });
        $('#demo3').slideBox({
            duration : 3.5,//滚动持续时间，单位：秒
            easing : 'linear',//swing,linear//滚动特效
            delay : 10,//滚动延迟时间，单位：秒
            hideClickBar : false,//不自动隐藏点选按键
            clickBarRadius : 10
        });
        $('#demo4').slideBox({
            hideBottomBar : true//隐藏底栏
        });

    });
</script>-->
