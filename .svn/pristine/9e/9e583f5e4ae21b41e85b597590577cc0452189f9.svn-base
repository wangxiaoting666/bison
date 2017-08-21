package com.threegrand.bison.deviceManage.service.impl;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.threegrand.bison.common.util.FileUtil;
import com.threegrand.bison.design.model.ResourceFile;
import com.threegrand.bison.deviceManage.dao.ApplicationManageDao;
import com.threegrand.bison.deviceManage.model.ApplicationManage;
import com.threegrand.bison.deviceManage.service.ApplicationManageService;
import com.threegrand.bison.system.model.Company;

@Service
public class ApplicationManageServiceImpl implements ApplicationManageService {

    @Autowired
    private ApplicationManageDao applicationManageDao;


    @Value("${apacheDocPath}")
    private String apacheDocPath;

    @Value("${apacheUrl}")
    private String apacheUrl;

    @Override
    public int insert(ApplicationManage applicationManage) throws IOException {
        String fileName = applicationManage.getApplicationFile().getOriginalFilename();
        String fileUploadName = getUploadFileName(applicationManage.getApplicationFile());
        String applicationFilePath = getFileUploadPath(fileUploadName);
        FileUtil.readWriteFile(applicationManage.getApplicationFile(), fileUploadName, applicationFilePath);
        //firmWareManage.setFirmWareFileName(firmWareFileName);
        applicationManage.setFileName(fileUploadName);
        applicationManage.setApplicationFilePath(applicationFilePath);
        return applicationManageDao.insert(applicationManage);
    }

    @Override
    public int edit(ApplicationManage applicationManage) {
        return applicationManageDao.edit(applicationManage);
    }

    @Override
    public int delete(Integer id) {
        ApplicationManage applicationManage = new ApplicationManage();
        applicationManage = applicationManageDao.getApplicationById(id);

        FileUtil.deleteFile(getFileUploadPath("") + applicationManage.getFileName());
        return applicationManageDao.delete(id);
    }

    @Override
    public List<ApplicationManage> findApplicationListPage(ApplicationManage applicationManage) {
        return applicationManageDao.findApplicationListPage(applicationManage);
    }

    private String getFileUploadPath(String fileName) {
        //return apacheDocPath + File.separator + ResourceFile.FILEUPLOAD + File.separator + fileName;
        return apacheDocPath + File.separator + ResourceFile.FILEUPLOAD + File.separator;
    }

    /**
     * 获取上传文件的名称,新文件名为原文件名加上时间戳
     *
     * @param multipartFile multipartFile
     * @return 文件名
     */
    private String getUploadFileName(MultipartFile multipartFile) {
        String uploadFileName = multipartFile.getOriginalFilename();
        String fileName = uploadFileName.substring(0, uploadFileName.lastIndexOf("."));
        String type = uploadFileName.substring(uploadFileName.lastIndexOf("."));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String timeStr = sdf.format(new Date());
        return fileName + "_" + timeStr + type;
    }

}
