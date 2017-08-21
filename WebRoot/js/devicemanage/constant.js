var CONSTANT = {
    DATA_TABLES: {
        DEFAULT_OPTION: { //DataTables初始化选项
            "dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r><'table-scrollable't><'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>", // datatable layout
            "lengthMenu": [5, 10, 25, 50, 75, 100],
            "search": true,
            "pageLength": 10, // default records per page

            "language": {
                // metronic spesific
                // "metronicGroupActions": "共 _TOTAL_ 条记录被选中",
                // "metronicAjaxRequestGeneralError": "请求失败，请检查网络连接！",
                //Example
                "processing": "处理中...",
                "infoFiltered": "(由 _MAX_ 项结果过滤)",
                "infoPostFix": "",
                "search": "搜索:",
                "url": "",
                "infoThousands": ",",
                // data tables spesific
                "lengthMenu": "<span class='seperator'>|</span>每页 _MENU_ 条",
                "info": "<span class='seperator'>|</span>共 _TOTAL_ 条",
                "infoEmpty": "未查询到记录",
                "emptyTable": "未搜索到相关信息",
                "zeroRecords": "未找到匹配记录",
                "loadingRecords": "载入中...",
                "paginate": {
                    "previous": "上一页",
                    "next": "上一页",
                    "last": "最末页",
                    "first": "第一页",
                    "page": "第",
                    "pageOf": "页，共"
                },
                // "oAria": {      //无障碍项
                //     "sSortAscending": ": 以升序排列此列",
                //     "sSortDescending": ": 以降序排列此列"
                // }
            },
            //Example
            "stripeClasses": ["oddRow", "evenRow"],//为奇偶行加上样式，兼容不支持CSS伪类的场合
            // order: [],			//取消默认排序查询,否则复选框一列会出现小箭头
            //"searching": false,	//禁用原生搜索


            // "columnDefs": [{  // set default column settings
            //         'orderable': false,
            //         'targets': [0]
            //     }, {
            //         "searchable": false,
            //         "targets": [0]
            //     }
            // ],
            // "orderCellsTop": true,
            // "pagingType": "bootstrap_extended", // pagination type(bootstrap, bootstrap_full_number or bootstrap_extended)
            "autoWidth": true, // disable fixed width and enable fluid table
            "processing": false, // enable/disable display message box on record load
            "serverSide": true, // enable/disable server side ajax loading
            // "drawCallback": function (oSettings) { // run some code on table redraw
            //     if (tableInitialized === false) { // check if table has been initialized
            //         tableInitialized = true; // set table initialized
            //         table.show(); // display table
            //     }
            //     Metronic.initUniform($('input[type="checkbox"]', table)); // reinitialize uniform checkboxes on each table reload
            //     countSelectedRecords(); // reset selected records indicator
            // }
        },
	    COLUMN: {
	        CHECKBOX: {	//复选框单元格
	            className: "td-checkbox",
	            orderable: false,
	            width: "30px",
	            data: null,
	            render: function (data, type, row, meta) {
	                return '<input type="checkbox" class="iCheck">';
	            }
	        }
	    },
	    RENDER: {	//常用render可以抽取出来，如日期时间、头像等
	        ELLIPSIS: function (data, type, row, meta) {
	            data = data || "";
	            return '<span title="' + data + '">' + data + '</span>';
	        }
	    }
    }
}