package com.threegrand.controller.sjgl;



import com.fasterxml.jackson.core.JsonProcessingException;
import com.threegrand.bison.common.util.FileUtil;
import com.threegrand.bison.sjgl.model.Picture;
import com.threegrand.bison.sjgl.service.PictureService;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * 地图管理
 */
@Controller
@RequestMapping("sjgl")
public class PictureController {

    @Autowired
    private PictureService pictureService;

    /**
     * @页面跳转
     * @return
     */
    @RequestMapping
    public String toImg(){
        return "sjgl/sjgl";
    }

    /**
     * @获取图片列表
     * @param model
     * @param request
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value="/getPicList",method = RequestMethod.GET)
    public String getPicList(Model model, HttpServletRequest request) throws JsonProcessingException {
        List<Picture> pictureList = pictureService.getPictureList();
        model.addAttribute("pictureList", pictureList);
        return "sjgl/sjgl";
    }

    /**
     * @添加图片
     * @param multipartFile
     * @param request
     * @return
     * @throws IOException
     */
    @RequestMapping(value="/addImg",method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addPicture(@RequestParam("imgUpload") MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        String fileName = getUploadFileName(multipartFile);
        String uploadPath = getZipPath(request, "1");
        FileUtil.readWriteFile(multipartFile, fileName, uploadPath);
        Picture picture = new Picture();
        picture.setUrl(uploadPath);
        picture.setImageName(fileName);
        int affectedLineNum = pictureService.addImage(picture);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    /**
     *
     * @param multipartFile
     * @return
     */
    private String getUploadFileName(MultipartFile multipartFile) {
        String uploadFileName = multipartFile.getOriginalFilename();
        String type = uploadFileName.substring(uploadFileName.lastIndexOf("."));
        return UUID.randomUUID().toString() + type;
    }

    private String getZipPath(HttpServletRequest request, String companyId) {
        return request.getServletContext().getRealPath("template" + File.separator + companyId);
    }

    /**
     *
     * @param picture
     * @return
     */
    @RequestMapping(value = "/deletImg", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse deletePicture(Picture picture) {
        int imgID=picture.getImageId();
        int affectedLineNum = pictureService.deleteImage(imgID);
        FileUtil.deleteFile(picture.getUrl()+picture.getImageName());
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    /**
     * @更新图片
     * @param picture
     * @return
     */
    @RequestMapping(value="/updateImg",method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse updatePicture(Picture picture) {
        int affectedLineNum = pictureService.updatePicture(picture);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

}
