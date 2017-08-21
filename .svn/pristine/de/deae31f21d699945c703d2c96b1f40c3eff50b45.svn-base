package com.threegrand.bison.design.model;

import com.threegrand.bison.common.util.FileUtil;

import java.io.File;

public class ResourceTreeNode {

    private String id;
    private String name;
    private String path;
    private String size;
    private boolean isParent;

    public ResourceTreeNode() {
    }

    public ResourceTreeNode(File file) {
        String size = FileUtil.getFileSizeWithMbOrKb(file);
        setId(String.valueOf(file.hashCode()));
        setName(file.getName());
        setIsParent(file.isDirectory());
        setPath(file.getAbsolutePath());
        setSize(size);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public boolean getIsParent() {
        return isParent;
    }

    public void setIsParent(boolean isParent) {
        this.isParent = isParent;
    }
}
