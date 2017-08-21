package com.threegrand.bison.design.service;

import com.threegrand.bison.design.model.ResourceFile;
import com.threegrand.bison.design.model.ResourceTreeNode;
import com.threegrand.bison.system.model.Company;

import java.util.List;
import java.util.Map;

public interface ResourceService {

    List<ResourceTreeNode> getResourceTree(ResourceTreeNode resourceTreeNode, Company company);

    Map<String, String> getAvailableAndUsedSize(Company company);

    List<ResourceFile> getFileList(String FileName, Company company);

    Boolean deleteFile(String fileName,Company company,String parentDirectName);

    void judgeDirExistOrNotAndMakeIt(Company company);
}
