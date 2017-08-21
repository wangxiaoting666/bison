<%--@elvariable id="pictureList" type="java.util.List<com.threegrand.bison.sjgl.model.Picture>"--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<html>
<head>
    <title>数据管理</title>
</head>
<body>
<form id="form1" name="form1" action="sjgl/addImg" method="post" enctype="multipart/form-data">
    <input type="file" id="imgUpload" name="imgUpload">
    <input type="submit" value="提交">

</form>

<form id="form2" name="form1" action="sjgl/deletImg" method="post" enctype="multipart/form-data">

    <input type="submit" value="删除">

</form>




<div class="row">
    <div class="col-md-12">
        <div class="form-group">
            <label class="col-md-2 control-label">用户</label>
            <div class="col-md-10">

                <c:forEach var="pictureList" items="${pictureList}">
                    <img width="20px" height="60px" src="${pictureList.url}"/>

                </c:forEach>

                <span class="help-block"></span>
            </div>
        </div>
    </div>
</div>










</body>
</html>