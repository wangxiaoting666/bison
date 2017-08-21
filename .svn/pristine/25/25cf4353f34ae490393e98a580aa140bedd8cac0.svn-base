var companyInfo = function () {

    /**
     * dataTable事件初始化方法
     */

	
	function getNewsData(titleImageUrl) {  
        return {
            image: titleImageUrl == undefined ? "" : titleImageUrl,
            companyName: $("#companyName").val() == '' ?  $("#cName").html() :  $("#companyName").val(),
            companySite: $("#companySite").val(),
            companyLinker: $("#companyLinker").val(),
            companyLinkMethod:$("#companyLinkMethod").val()
        }
    }
	

	function addNews(data) {
        $.ajax({
            url: "company",
            data: JSON.stringify(getNewsData(data)),
            contentType: "application/json; charset=utf-8",
            type: "post",
            success: function (data) {
                if (customGlobal.ajaxCallback(data)) {
                    $("#modalDialog").modal("hide");
                    location.reload();
                }else{
                	toastr.warning(data.returnMsg);
                }
            }
        });
    }
	function initAddBtn() {
		
        //添加保存按钮点击事件
        $("#updateBtn").off("click").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                addNews();
            }
        });
    }
	
    var handleEvent = function(){
        $("#editCompanyInfo").on("click",function(){
            $("#modalTitle").html("编辑信息");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("a.fileinput-exists").click();
            $("#uploadImage").attr("name", "uploadFile");
            $("#addBtn").hide();
            $("#updateBtn").show();
        });
        
        
        $("#uploadImage").fileupload({
            url: "design/resource/uploadFile",
            dataType: 'json',
            autoUpload: false,
            acceptFileTypes: /(gif|jpe?g|png)$/i,
            maxFileSize: 1000000, // 1 MB
            imageMaxWidth:100,
            imageMaxHeight:100,
            messages: {
                acceptFileTypes: '文件类型不匹配',
                maxFileSize: '文件过大',
                minFileSize: '文件过小'
            }
        }).on("fileuploadadd", function (e, data) {
        	$("#titleImageError").html("");
            $("#addBtn,#updateBtn").off("click").on("click", function () {
                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    data.submit()
                }
            })
        }).on("fileuploadprocessalways", function (e, data) {
        	var index = data.index,
                file = data.files[index];
            if (file.error) {
                $("#titleImageError").html(file.error)
            }
            $("#addBtn,#updateBtn").prop('disabled', !!data.files.error);
        }).on("fileuploaddone", function (e, data) {
        	if(data.result.returnState=="ERROR"){
    			toastr.warning(data.result.returnMsg);
    			customGlobal.ajaxCallback(data);
    			return;
    		}
        	addNews(data.result.returnData.url);
        	   
        });
        initAddBtn();


    };

    //验证手机号码
/* 	$(function(){
		var juddge01=juddge02= false;
	
		$("#companyLinkMethod").blur(function(){
			
			var $phone_num = $("#companyLinkMethod").val();
			var reg02 = /^1[3|4|5|7|8]\d{9}$/;//手机号
			var reg03 = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;//座机号
			if(reg02.test($phone_num) || reg03.test($phone_num) ){
			$(".po_phone_num").css("display","none");
			
			juddge01 = true;
		}else{
			$(".po_phone_num").css("display","block");
			juddge01 = false;
		}
		})
})*/

    return {
        init: function () {
            handleEvent();
        }
    };
}();