var Login = function () {

    function login(){
        var $loginForm = $('.login-form');
        if ($loginForm.validate().form()) {
            var $password = $("#password");
            $.ajax({
        		url:"captcha/checkCode",
        		type:"post",
        		data:{code:$("#idenCode").val()},
        		datatype:"json",
        		success:function(data){
        			if(data==true){
        				$password.val($password.val().md5());
        				$loginForm.submit();
        			}else{
        				alert("验证码错误");
        			}
        		}
        	});
            
        }
    }

    var handleCookie = function(){
    	
    	var loginName = $.cookie("loginName");
    	var password = $.cookie("password");
    	if(loginName!=null && password!=null){
    		$("#loginName").val(loginName);
    		$("#password").val(password);
    		$("[name = remember]:checkbox").attr("checked", true);
    		$("#checkbox").parent().addClass("checked");
    	}
    	
    	$("#loginBtn").click(function(){
    		if($("#checkbox").attr("checked")){
    			$.cookie('loginName', $("#loginName").val(), { expires: 365, path: '/' }); 
    			$.cookie('password', $("#password").val(), { expires: 365, path: '/' });
        	}else{
        		$.cookie('loginName', '', { expires: -1 }); 
        		$.cookie('password', '', { expires: -1 }); 
        	}
    	});
    	
    	
    }
    
    var handleLogin = function() {
        $("#loginName").focus();
        $('.login-form').validate({
            rules: {
                loginName: {
                    required: true
                },
                password: {
                    required: true
                }
            },

            messages: {
                loginName: {
                    required: "用户名不能为空！"
                },
                password: {
                    required: "密码不能为空！"
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit
                $('.alert-danger', $('.login-form')).show();
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function (error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function (form) {
                form.submit();
            }
        });

        $('#password').keypress(function (e) {
            if (e.which == 13) {
                login();
                return false;
            }
        });

        $("#loginBtn").on("click",function(){
            login();
        });

        $.backstretch([
            "img/login/1.jpg",
            "img/login/2.jpg",
            "img/login/3.jpg",
            "img/login/4.jpg"
        ], {
            fade: 1000,
            duration: 8000
        });
    };

    return {
        //main function to initiate the module
        init: function () {
            handleLogin();
            handleCookie();
        }

    };

}();