<%@ page import="org.apache.commons.fileupload.FileUpload" %>
<%--
  Created by IntelliJ IDEA.
  User: haxp
  Date: 2015/12/26
  Time: 21:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>显示上传图片</title>
</head>
<body>
<%
    String filePath=request.getSession().getServletContext().getRealPath("");
    out.println(filePath+"<br/>");
    String photo=request.getParameter("imgUpload");

    int indexOfLine =photo.lastIndexOf("\\");
    String fileName =photo.substring(indexOfLine + 1, photo.length());
    String destFilePathAndName =filePath+"\\image\\"+fileName;

    String relativeFilePath=".\\image\\"+fileName;
    out.println(photo+"<br/>");
    out.println(destFilePathAndName+"<br/>");



%>







</body>
</html>
