<%--@elvariable id="newsTypeList" type="java.util.List<com.threegrand.bison.news.model.NewsType>"--%>
<%--@elvariable id="newsParamList" type="java.util.List<com.threegrand.bison.design.model.NewsParam>"--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <%@include file="../includes/head.jsp" %>
    <title>${menu.menuName}</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/js/bower_components/jquery-file-upload/css/jquery.fileupload.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/js/bower_components/smalot-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/js/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css"/>"/>
    <link href="<c:url value="/assets/global/css/components.css"/>" rel="stylesheet" type="text/css"/>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content">
<%@include file="../includes/top.jsp"%>
<div class="page-container">
<%@include file="../includes/sidebar.jsp"%>
    <div class="page-content-wrapper">
        <div class="page-content">
            <%@include file="../includes/current.jsp" %>
            <div class="row">

                <div class="col-md-12">
                    <div class="portlet">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="${menu.icon}"></i>${menu.menuName}
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"></a>
                            </div>
                            <div class="actions">
                                <a href="javascript:;" class="btn default yellow-stripe" id="addNews"><i class="fa fa-plus"></i><span class="hidden-480"> 添加文章信息</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="dataTableReload"><i class="fa fa-refresh"></i><span class="hidden-480"> 重新载入</span></a>
                                
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-container">
                                <table class="table table-striped table-bordered table-hover" id="dataTable">
                                    <thead>
                                    <tr role="row" class="heading">
                                        <th>标题</th>
                                        <th>类别</th>
                                        <th>操作</th>
                                    </tr>
                                    <tr role="row" class="filter">
                                        <td>
                                            <input type="text" class="form-control form-filter input-sm gAuto" autoFlag="gAutoPageTitle" name="pageTitleQuery" id="pageTitleQuery">
                                        </td>
                                        <td>
                                            <select class="form-control form-filter input-sm gAuto" autoFlag="gAutoNewsTypeName" name="newsTypeNameQuery" id="newsTypeNameQuery">
                                                <option value="">全部</option>
                                                <c:forEach var="newsType" items="${newsTypeList}">
                                                    <option value="${newsType.newsTypeId}">${newsType.newsTypeName}</option>
                                                </c:forEach>
                                            </select>
                                        </td>
                                        <td>
                                            <div class="margin-bottom-5">
                                                <a class="btn btn-sm yellow filter-submit margin-bottom">
                                                    <i class="fa fa-search"></i>查询</a>
                                                <a class="btn btn-sm red filter-cancel">
                                                    <i class="fa fa-refresh"></i>重置</a>
                                            </div>
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade bs-modal-lg" id="modalDialog" tabindex="-1" data-keyboard="false" aria-hidden="true"
     data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" id="modalContent">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title" id="modalTitle"></h4>
            </div>
            <div class="modal-body form">
                <form id="dialogForm" class="form-horizontal">
                    <div class="form-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">文章分类<span class="required"> * </span></label>
                                    <div class="col-md-8">
                                        <select id="newsTypeNameList" name="newsTypeNameList"
                                                class="form-control select2" style="width:240px" placeholder="文章分类">
                                            <c:forEach var="newsType" items="${newsTypeList}">
                                                <option value="${newsType.newsTypeId}">${newsType.newsTypeName}</option>
                                            </c:forEach>
                                        </select>
                                        <span class="help-block">必选项</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="col-md-4 control-label">标题</label>
                                    <div class="col-md-8">
                                        <input type="hidden" id="newsId">
                                        <input type="text" class="form-control input-medium" placeholder="标题" id="title" name="title">
                                        <span class="help-block">此标题用于页面顶部显示</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">页面标题<span class="required"> * </span></label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="页面标题"
                                               id="pageTitle" name="pageTitle">
                                        <span class="help-block">此标题用于页面中显示</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="col-md-4 control-label">摘要</label>
                                    <div class="col-md-8">
                                        <textarea class="form-control input-medium" name="summary" id="summary"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">关键字</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="关键字" id="keyword" name="keyword">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="col-md-4 control-label">作者</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="作者" id="author" name="author">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">转向链接</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="转向链接"
                                               id="link" name="link">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="col-md-4 control-label">视频外链</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="视频外链" id="video" name="video">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-md-2 control-label">正文</label>

                                    <div class="col-md-10">
                                        <textarea class="ckeditor form-control" name="content" id="content"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">标题图片</label>
                                    <div class="col-md-8">
                                        <div class="fileinput fileinput-new" data-provides="fileinput" id="uploadImageDiv">
                                            <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                                <img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=no+image" alt=""/>
                                            </div>
                                            <div class="fileinput-preview fileinput-exists thumbnail"
                                                 style="max-width: 200px; max-height: 150px;">
                                            </div>
                                            <div>
                                                <span class="btn default btn-file">
                                                <span class="fileinput-new">选择图片</span>
                                                <span class="fileinput-exists">更改</span>
                                                <input type="file" name="uploadImage" id="uploadImage"/></span>
                                                <a href="#" class="btn default fileinput-exists" data-dismiss="fileinput">移除</a>
                                                <span>请选择1M以内图片</span>
                                            </div>
                                        </div>
                                        <div id="titleImageError" style="color: #a94442"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="control-label col-md-4">发布时间</label>
                                    <div class="col-md-8">
                                        <div class="input-group input-medium date">
                                            <input type="text" class="form-control" readonly placeholder="发布时间" id="publishTime" name="publishTime">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">列表置顶</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-xsmall" id="listSequence" name="listSequence">
                                        <span class="help-block">选择文章的属性，数字越大越排前 </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="col-md-4 control-label">首页推荐</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-xsmall" id="indexSequence" name="indexSequence">
                                        <span class="help-block">选择文章的属性，数字越大越排前 </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <c:forEach var="newsParam" items="${newsParamList}">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" id="paramValue${newsParam.newsParamId}">
                                        <label class="col-md-2 control-label">${newsParam.description}</label>
                                        <div class="col-md-4">
                                            <div class="paramValue" data-news-param-id="${newsParam.newsParamId}">
                                                <input type="text" class="form-control input-medium" placeholder="变量值" data-news-param-id="${newsParam.newsParamId}" name="paramValue">
                                            </div>
                                            <c:if test="${newsParam.paramType==2}">
                                                <button type="button" class="btn btn-circle btn-xs green addParamValue" data-news-param-id="${newsParam.newsParamId}">添加<i class="fa fa-plus"></i></button>
                                                <button type="button" class="btn btn-circle btn-xs grey-cascade delParamValue" data-news-param-id="${newsParam.newsParamId}">删除<i class="fa fa-times"></i></button>
                                            </c:if>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn blue" id="addBtn">保存</button>
                <button type="button" class="btn blue" id="updateBtn">保存</button>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="newsParamId" value="${param.newsParamId}"/>
<input type="hidden" id="moduleId" value="${param.moduleId}"/>
<jsp:include page="../includes/confirmdiv.jsp"/>
<%@include file="../includes/footer.jsp"%>
<%@include file="../includes/bottomscript.jsp" %>
<script type="text/javascript" src="<c:url value="/js/bower_components/DataTables/media/js/jquery.dataTables.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload-process.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload-validate.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/smalot-bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/smalot-bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/bower_components/ckeditor/ckeditor.js"/>"></script>
<script src="<c:url value="/js/global/scripts/datatable.js"/>"></script>
<script src="<c:url value="/js/news/news.js"/>"></script>
<script type="text/javascript">
        $(function () {
            newsListTable.init();
        });
</script>

</body>
</html>