package com.threegrand.bison.design.model;

import com.threegrand.bison.common.ajax.DataTablesPage;
import com.threegrand.bison.common.util.FileUtil;

import java.io.File;
import java.util.HashSet;
import java.util.Set;

public class ResourceFile extends DataTablesPage {
    /*对象方法*/
    public static final String FILEUPLOAD = "fileupload";
    public static final String IMAGE = "image";
    public static final String VIDEO = "video";
    public static final String AUDIO = "audio";
    public static final String DOC = "doc";
    public static final String OTHER = "other";
    public static final long FILE_SIZE = 52275200;
    public static final Set<String> imageExtensionSet = new HashSet<String>() {
        {
            add("jpg");
            add("jpeg");
            add("png");
            add("gif");
        }
    };

    public ResourceFile() {
    }

    public ResourceFile(File file) {

        String size = FileUtil.getFileSizeWithMbOrKb(file);
        setFileName(file.getName());
        setPicture(imageExtensionSet.contains(FileUtil.getExtensionName(file).toLowerCase()));
        setSize(size);
        setFileParentDirect(file.getParent());
//        setSize(file.length());
    }

    /*对象属性开始*/
    private String fileName;
    private String size;
    private String url;
    private boolean isPicture;
    private String fileParentDirect;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public boolean isPicture() {
        return isPicture;
    }

    public void setPicture(boolean isPicture) {
        this.isPicture = isPicture;
    }

    public String getFileParentDirect() {
        return fileParentDirect;
    }

    public void setFileParentDirect(String fileParentDirect) {
        this.fileParentDirect = fileParentDirect;
    }
}
