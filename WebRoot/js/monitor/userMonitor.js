var userMonitorListTable = function () {

    var dataTable;
    var zTreeObj;
    var $table = $("#dataTable");
    var zNodes;
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            onQuery:function(data){
                data.userId=$("#userIdQuery").val();
                data.userName=$("#userNameQuery").val();
                data.roleName=$("#roleQuery").val();
                data.tagName=$("#tagQuery").val();
                data.step=$("#stepQuery").val();
                data.building=$("#buildingQuery").val();
            },
            onSortColumn:function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "userId":
                        sortColumn = "user_id";
                        break;
                    case "userName":
                        sortColumn = "user_name";
                        break;
                   /* case "roleName":
                        sortColumn = "user_role";
                        break;
                    case "tagName":
                        sortColumn = "user_tag";
                        break;*/
                   /* case "step":
                        sortColumn = "step_id";
                        break;*/
                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {
                    type:"get",

                    "url": basePath + "userMonitor/getUserMonitorListPage" // ajax source
                },
                "columns": [
                    {data:'userId',orderable:true,searchable:true},
                    {data: 'userName', orderable: true,searchable:true},
                    {data: 'roleName', orderable: true,searchable:true},
                    {data: 'tagName', orderable: true,searchable:true},
                    {data: 'building', orderable: true,searchable:true},
                    {data: 'step', orderable: true,searchable:true},
                    {data: 'locate', orderable: true,searchable:true},
                    {data: 'dangerArea', orderable: true,searchable:true},
                    {data: 'alertArea', orderable: true,searchable:true},
                    {data: 'status', orderable: true,searchable:true},
                    {data: 'relationId', orderable: true,searchable:true},
                    {data: 'braceletId', orderable: true,searchable:true},
                ]
            }
        });
    };
    var handleEvent = function(){
        $("#queryUserMonitor").on("click",function(){
            dataTable.reloadTable();
        });

        $("#reset").on("click",function(){
            userIdQuery.value="";
            userNameQuery.value="";
            roleQuery.value="";
            tagQuery.value="";
            stepQuery.value="";
            buildingQuery.value="";
        });
    }
    var zTreeInit = function (node){
        node = node == undefined ? zNodes : node;
        zTreeObj = $.fn.zTree.init($("#permissionTree"), {
            check: {
                enable: true
            },
            view: {
                showLine:false
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        }, node);
    };

    return {
        init: function (zTreeNodes) {
            handleRecords();
            handleEvent();
            zNodes = zTreeNodes;
        }
    };
}();