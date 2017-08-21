package com.threegrand.bison.design.service.impl;

import com.wonderland.sail.util.NumberUtil;
import com.threegrand.bison.common.util.FileUtil;
import com.threegrand.bison.design.model.ResourceFile;
import com.threegrand.bison.design.model.ResourceTreeNode;
import com.threegrand.bison.design.service.ResourceService;
import com.threegrand.bison.system.model.Company;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("ResourceService")
public class ResourceServiceImpl implements ResourceService {

    @Value("${apacheDocPath}")
    private String apacheDocPath;
    @Value("${apacheUrl}")
    private String apacheUrl;

    @Override
    public List<ResourceTreeNode> getResourceTree(ResourceTreeNode nodeParam, Company company) {
        if (nodeParam.getPath() == null || nodeParam.getPath().equals("")) {
            nodeParam.setPath(getCompanyFileUploadPath(company));
        }
        List<ResourceTreeNode> resourceTreeNodeList = new ArrayList<ResourceTreeNode>();
        File[] files = new File(nodeParam.getPath()).listFiles();
        if (files != null) {
            for (File aFile : files) {
                if (aFile.isHidden()) {
                    continue;
                }
                resourceTreeNodeList.add(new ResourceTreeNode(aFile));
            }
        }
        return resourceTreeNodeList;
    }

    private String getCompanyFileUploadPath(Company company) {
        return apacheDocPath + company.getCompanyTemplateDir() + File.separator + ResourceFile.FILEUPLOAD + File.separator;
    }

    @Override
    public Map<String, String> getAvailableAndUsedSize(Company company) {
        String path = getCompanyFileUploadPath(company);
        File file = new File(path);
        String usedSize = FileUtil.getFileOrDirSizeWithMb(file).replace("MB", "");
        double availableSize = 100 - Double.parseDouble(usedSize);
        Map<String, String> map = new HashMap<String, String>();
        map.put("availableSize", NumberUtil.numFormat(availableSize, 3));
        map.put("usedSize", NumberUtil.numFormat(usedSize, 3));
        return map;
    }

    @Override
    public List<ResourceFile> getFileList(String FileName, Company company) {
        List<ResourceFile> resourceFileList = new ArrayList<ResourceFile>();
        if (FileName == null || FileName.equals("")) {
            String path = getCompanyFileUploadPath(company);
            File[] files = new File(path).listFiles();
            for (File file : files) {
                path = getCompanyFileUploadPath(company) + file.getName() + File.separator;
                String localHostPath = getCompanyFileUploadUrl(company) + file.getName() + "/";
                resourceFileList.addAll(getResourceFiles(path, localHostPath));
            }
        } else {
            String path = getCompanyFileUploadPath(company) + FileName + File.separator;
            String companyFileUploadUrl = getCompanyFileUploadUrl(company) + FileName + "/";
            resourceFileList = getResourceFiles(path, companyFileUploadUrl);
        }

        return resourceFileList;
    }

    private String getCompanyFileUploadUrl(Company company) {
        return apacheUrl + company.getCompanyTemplateDir() + "/" + ResourceFile.FILEUPLOAD + "/";
    }

    private List<ResourceFile> getResourceFiles(String path, String companyFileUploadUrl) {
        List<ResourceFile> resourceFileList = new ArrayList<ResourceFile>();
        File[] files = new File(path).listFiles();
        if (files != null) {
            for (File aFile : files) {
                if (aFile.isHidden()) {
                    continue;
                }
                ResourceFile resourceFile = new ResourceFile(aFile);
                resourceFile.setUrl(companyFileUploadUrl + resourceFile.getFileName());
                resourceFileList.add(resourceFile);
            }
        }
        return resourceFileList;
    }

    @Override
    public Boolean deleteFile(String fieName, Company company, String parentDirectName) {
        return FileUtil.deleteFile(getCompanyFileUploadPath(company) + parentDirectName + File.separator + fieName);
    }

    @Override
    public void judgeDirExistOrNotAndMakeIt(Company company) {
        String[] fileArray = new String[]{"image", "audio", "video", "doc", "other"};
        for (String fileName : fileArray) {
            File file = new File(getCompanyFileUploadPath(company) + fileName);
            if (!file.exists()) {
                file.mkdirs();
            }
        }
    }
}
