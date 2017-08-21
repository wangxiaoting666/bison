var menuTree = function () {

    var setting = {
        check:{
            enable:true
        },
        view:{
            addDiyDom: addDiyDom,
            selectedMulti:false,
            showIcon:false,
            showLine:false
        },
        data:{
            simpleData:{
                rootPId:-1,
                enable:true
            }
        },
        edit:{
            drag:{
                isCopy:false
            },
            enable:true,
            showRenameBtn:false,
            showRemoveBtn:false
        },
        callback:{
            onRightClick: onRightClick
        }
    };
    var zTreeObj;

    function initTree(){
        $.get("develop/menu/getMenuTree",function(data){
            zTreeObj = $.fn.zTree.init($("#menuTree"), setting, data.returnData.tree);
        });
    }

    function addDiyDom(treeId, treeNode) {
        var menuIcon = treeNode.menuIcon == undefined ? "" : treeNode.menuIcon;
        var afterString =
            "<span class='diy-dom font-blue'>menuId:</span>" + treeNode.id+
            "<span class='diy-dom font-blue'>permToken:</span>" + treeNode.permToken+
            "<span class='diy-dom font-blue'>level:</span>" + treeNode.level;
        if(treeNode.menuUrl){
            afterString = afterString + "<span class='diy-dom font-blue'>url:</span>" + treeNode.menuUrl;
        }
        if(treeNode.memo){
            afterString = afterString + "<span class='diy-dom font-blue'>备注:</span>" + treeNode.memo;
        }
        $("#" + treeNode.tId +"_a")
            .before("<i class='" + menuIcon+"'></i>")
            .after(afterString)
    }

    function onRightClick(event, treeId, treeNode) {
        if (treeNode) {
            zTreeObj.selectNode(treeNode);
            showContextMenu("node", event.clientX+5, event.clientY+10);
        }
    }

    function showContextMenu(type, x, y) {
        $("#treeContextMenu").css({"top":y+"px", "left":x+"px"}).show();
        $("body").on("mousedown", onBodyMouseDown);
    }
    function hideContextMenu() {
        $("#treeContextMenu").hide();
        $("body").off("mousedown", onBodyMouseDown);
    }

    function onBodyMouseDown(event){
        if (!(event.target.id == "treeContextMenu" || $(event.target).parents("#treeContextMenu").length>0)) {
            hideContextMenu();
        }
    }

    var handleEvent = function(){
        $("#treeReload").on("click",initTree);

        $("#addChildMenu").on("click",function(){
            $("#modalTitle").html("添加子菜单");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#addBtn").show();
            $("#updateBtn").hide();
            var selectedNode = zTreeObj.getSelectedNodes()[0];
            $("#parentId").val(selectedNode.id);
            $("#sequence").val(1000);
            $("#level").val(parseInt(selectedNode.level,10)+1);
        });
        $("#addSiblingMenu").on("click",function(){
            $("#modalTitle").html("添加同级菜单");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#addBtn").show();
            $("#updateBtn").hide();
            var selectedNode = zTreeObj.getSelectedNodes()[0];
            $("#parentId").val(selectedNode.pId);
            $("#sequence").val(parseFloat(selectedNode.sequence)+1);
            $("#level").val(selectedNode.level);
        });
        $("#addBtn").on("click",function(){
            $.post("develop/menu",{
                menuName:$("#menuName").val(),
                icon:$("#icon").val(),
                url:$("#url").val(),
                permToken:$("#permToken").val(),
                parentId:$("#parentId").val(),
                level:$("#level").val(),
                leaf:$("input[name=leaf]:checked").val(),
                sequence:$("#sequence").val(),
                memo:$("#memo").val(),
                enable:$("input[name=enable]:checked").val()
            },function (data) {
                if (customGlobal.ajaxCallback(data)) {
                    $("#modalDialog").modal("hide");
                    initTree();
                }
            });
        });
        $("#toUpdateBtn").on("click",function(){
            $.get("develop/menu/"+zTreeObj.getSelectedNodes()[0].id,function(data){
                $("#modalTitle").html("修改菜单");
                customGlobal.clearFormAndShowDialog("modalDialog");
                $("#addBtn").hide();
                $("#updateBtn").show();
                var menu = data.returnData.menu;
                $("#menuId").val(menu.menuId);
                $("#menuName").val(menu.menuName);
                $("#icon").val(menu.icon);
                $("#url").val(menu.url);
                $("#permToken").val(menu.permToken);
                $("#parentId").val(menu.parentId);
                $("#level").val(menu.level);
                $("input[name=leaf]").removeAttr("checked")
                    .filter("[value=" + (menu.leaf ? "1" : "0") + "]").prop("checked", true);
                $("#sequence").val(menu.sequence);
                $("#memo").val(menu.memo);
                $("input[name=enable]").removeAttr("checked")
                    .filter("[value=" + (menu.enable ? "1" : "0") + "]").prop("checked", true);
                $("input:radio").uniform()
            })
        })
    };
    $("#updateBtn").on("click",function(){
        $.ajax({
            url:"develop/menu",
            data:{
                menuId:$("#menuId").val(),
                menuName:$("#menuName").val(),
                icon:$("#icon").val(),
                url:$("#url").val(),
                permToken:$("#permToken").val(),
                parentId:$("#parentId").val(),
                level:$("#level").val(),
                leaf:$("input[name=leaf]:checked").val(),
                sequence:$("#sequence").val(),
                memo:$("#memo").val(),
                enable:$("input[name=enable]:checked").val()
            },
            type:"put",
            success:function (data) {
                if (customGlobal.ajaxCallback(data)) {
                    $("#modalDialog").modal("hide");
                    initTree();
                }
            }
        })
    });
    //confirm中确认按钮事件，此处需要unbind，否则点击取消时下次再点击删除按钮会重复绑定click。
    $("#confirmBtn").on("click.deleteRow",function(){
        $.ajax({
            url: "develop/menu/" + zTreeObj.getSelectedNodes()[0].id,
            type: "DELETE",
            success: function (data) {
                $("#confirmDialog").modal("hide");
                if (customGlobal.ajaxCallback(data)) {
                    initTree();
                }
            }
        })
    });

    $("#saveOrder").on("click", function (){
        var zTreeNodes = zTreeObj.transformToArray(zTreeObj.getNodes());
        var nodeArray = [];
        for (var i = 0, ii = zTreeNodes.length; i < ii; i++) {
            var node = zTreeNodes[i];
            nodeArray.push({
                menuId:node.id,
                parentId:node.pId,
                level:node.level,
                leaf:!node.isParent,
                sequence:i,
                enable:node.checked
            })
        }
        $.ajax({
            url: "develop/menu/updateMenuOrder",
            data: JSON.stringify(nodeArray),
            type: "put",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (customGlobal.ajaxCallback(data)) {
                    $("#modalDialog").modal("hide");
                    initTree();
                }
            }
        });
    });

    return {
        init: function () {
            initTree();
            handleEvent();
        }
    };
}();