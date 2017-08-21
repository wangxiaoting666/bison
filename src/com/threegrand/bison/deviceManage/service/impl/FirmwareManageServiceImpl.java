package com.threegrand.bison.deviceManage.service.impl;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.threegrand.bison.deviceManage.service.FirmwareManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.threegrand.bison.common.util.FileUtil;
import com.threegrand.bison.design.model.ResourceFile;
import com.threegrand.bison.deviceManage.dao.FirmwareManageDao;
import com.threegrand.bison.deviceManage.model.FirmwareManage;

@Service
public class FirmwareManageServiceImpl implements FirmwareManageService {

    @Autowired
    private FirmwareManageDao firmwareManageDao;


    @Value("${apacheDocPath}")
    private String apacheDocPath;

    @Value("${apacheUrl}")
    private String apacheUrl;

    @Override
    public int insert(FirmwareManage firmwareManage) throws IOException {
        String fileName = firmwareManage.getFirmwareFile().getOriginalFilename();
        String fileUploadName = getUploadFileName(firmwareManage.getFirmwareFile());
        String firmWareFilePath = getFileUploadPath(fileUploadName);
        FileUtil.readWriteFile(firmwareManage.getFirmwareFile(), fileUploadName, firmWareFilePath);
        //firmWareManage.setFirmWareFileName(firmWareFileName);
        firmwareManage.setFileName(fileUploadName);
        firmwareManage.setFirmwareFilePath(firmWareFilePath);
        return firmwareManageDao.insert(firmwareManage);
    }

    @Override
    public int edit(FirmwareManage firmwareManage) {
        return firmwareManageDao.edit(firmwareManage);
    }

    @Override
    public int delete(Integer id) {
        FirmwareManage firmWareManage = new FirmwareManage();
        firmWareManage = firmwareManageDao.getFirmwareById(id);

        FileUtil.deleteFile(getFileUploadPath("") + firmWareManage.getFileName());
        return firmwareManageDao.delete(id);
    }

    @Override
    public List<FirmwareManage> findFirmwareListPage(FirmwareManage firmWareManage) {
        return firmwareManageDao.findFirmwareListPage(firmWareManage);
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
