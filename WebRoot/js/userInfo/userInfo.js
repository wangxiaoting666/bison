var userInfoListTable = function () {
    var dataTable1;
    var dataTable2;
    var dataTable;
    var zTreeObj;
    var $table  =$("#dataTable");
    var $table1 =$("#dataTable1");
    var $table2 =$("#dataTable2");
    var zNodes;
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            onQuery:function(data){
                data.userName=$("#userNameQuery").val();
                data.userRole=$("#userRoleQuery").val();
                data.userTag=$("#userTagQuery").val();
               
            },
            dataTable: {
                "ajax": {
                     type:"get",
                    "url": basePath + "/personInfo/userInfo/getUserInfoListPage" // ajax source
                },
                "columns": [
                    {data: 'user_id', orderable: false,
                        render: function (data, type, full) {
                            return '<input type="checkbox" name="test" value="'+full.personId+'"/>';
                        }},
                    {data: 'personId', orderable: true,searchable:true},
                    {data: 'personName', orderable: true,searchable:true},
                    {data: 'personSex', orderable: true,searchable:true},
                    {data: 'organId', orderable: true,searchable:true},
                    {data: 'age',orderable:true,searchable:true},
                    {data: 'brithday', orderable: true,searchable:true},
                    {data: 'phone', orderable: true,searchable:true},
                    {data: 'Address', orderable: true,searchable:true},
                    {data: 'stepNumber', orderable: true,searchable:true},
                   
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                        
                            return  '<a class="check btn default btn-xs purple" personId="'
							+ full.id
							+ '">查看</a>&nbsp;<a class="delete btn default btn-xs purple" personId="'+ full.id+ '"  personId="'
							+ full.personId + '">删除</a>';
                        }
                    }
                ]
            }
        });
        $("#dataTableReload").on("click",function(){
            dataTable.reloadTable();
        });
    };

//查询和重置
    var handleEvent = function(){

        $("#queryUserInfo").on("click",function(){
                dataTable.reloadTable();
        });

      

         $("#reset").on("click",function(){
            userNameQuery.value="";
            userRoleQuery.value="";
            userTagQuery.value="";
           
        });  
    };
    
	// checkbox删除
    $("#assetremove").click(function() {
    	   if($("input[name='test']:checked")[0] == null){
    		   alert("请勾选需要删除的资产");
    		   return;
    	   }
    	    var mymessage=confirm("确认删除吗？");  
    	    if(mymessage==true){  
    	 		$("input[name='test']:checked").each(function() { // 遍历选中的checkbox
    	 			$.ajax({
    	 				url : "xxxxxxxxxxx",
    	 				data : "id=" + $(this).val(),
    	 				dataType : "json",
    	 			});
    	 			//页面删除
    	 			n = $(this).parents("tr").index() + 1; // 获取checkbox所在行的顺序
    	 			$("table#dataTable").find("tr:eq(" + n + ")").remove();
    	 			
    	 		});
    	    }  
    	});
	// 添加人员
	$("#addUserInfo").on("click", function() {
		
		layer.open({
			  type: 2,
			  title: '添加人员',
			  area: ['1000px', '550px'],
			  fix: false, //
			  content:basePath+ 'jsp/personInfo/adduser.jsp',
			  end: function () {
				  dataTable.reloadTable();
	            }
		});
        });
//查看人员
    $table.on("click", "a.check", function() {
		layer.open({
			  type: 2,
			  title: '查看人员',
			  area: ['1000px', '550px'],
			  fix: false, //
			  content: 'jsp/personInfo/checkuser.jsp?personId=' + $(this).attr("personId"),
			  end: function () {
				  dataTable.reloadTable();
	            }
		});
});

   
    function fun(){
        var  objs = $("#dataTable input[type=checkbox]:checked");
        var check_val = "";
        $.each(objs,function(index,obj){
            check_val +=  objs[index].defaultValue+"%";
        });
        return check_val;
    }


    return {
        init: function (zTreeNodes) {
            handleRecords();
            handleEvent();
            handleRecords01();
            handleRecords02();
            zNodes = zTreeNodes;
        }
    };
}();