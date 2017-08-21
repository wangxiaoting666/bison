var assetMonitorPageListTable = function () {

    var dataTable;
    var $table = $("#dataTable");
    var zTreeObj;
    var zNodes;
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            onQuery:function(data){
                data.assetId=$("#assetIdQuery").val();
                data.assetName=$("#assetNameQuery").val();
                data.roleName=$("#roleNameQuery").val();
                data.tagName=$("#tagNameQuery").val();
            },
            onSortColumn:function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "assetId":
                        sortColumn = "asset_id";
                        break;
                    case "assetName":
                        sortColumn = "asset_name";
                        break;
                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {

                    "url": basePath + "assetMonitor/getAssetMonitorListPage" // ajax source
                },
                "columns": [
                    {data: 'assetId', orderable: true,searchable:true},
                    {data: 'assetName', orderable: true,searchable:true},
                    {data: 'status', orderable: true,searchable:true},
                    {data: 'building', orderable: true,searchable:true},
                    {data: 'step', orderable: true,searchable:true},
                    {data: 'locate', orderable: true,searchable:true},
                    {data: 'initArea', orderable: true,searchable:true},
                    {data: 'leaveNum', orderable: true,searchable:true},
                    {data: 'roleName', orderable: true,searchable:true},
                    {data: 'tagName', orderable: true,searchable:true},
                    {data:'blindId',orderable:true,searchable:true}
                ]
            }
        });
    };
    var handleEvent = function(){
        $("#queryAssetMonitor").on("click",function(){
            dataTable.reloadTable();
        });

        $("#reset").on("click",function(){
            assetIdQuery.value="";
            assetNameQuery.value="";
            roleNameQuery.value="";
            tagNameQuery.value="";
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