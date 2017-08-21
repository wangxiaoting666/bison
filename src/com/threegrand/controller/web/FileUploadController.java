package com.threegrand.controller.web;

import com.wonderland.sail.ajax.response.AjaxResponse;
import com.threegrand.bison.common.util.FileUtil;
import com.threegrand.bison.common.util.ZipUtil;
import com.threegrand.bison.design.model.ResourceFile;
import com.threegrand.bison.system.model.Company;
import com.threegrand.bison.zipupload.ZipResolveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;


/**
 * Created by Administrator on 2014/10/8.
 */
@Controller
@RequestMapping("/upload")
public class FileUploadController {

    @Value("${apacheDocPath}")
    private String apacheDocPath;

    @Value("${apacheUrl}")
    private String apacheUrl;

    @Autowired
    ZipResolveService zipResolveService;

    @RequestMapping("/uploadImage")
    public ModelAndView handleRequest(@RequestParam("upload") MultipartFile multipartFile,
                                      HttpServletRequest request, HttpServletResponse response) throws Exception {
        Company company = (Company) request.getSession().getAttribute("company");

        String fileName = getUploadFileName(multipartFile);
        String uploadPath = getFileUploadPath(company, ResourceFile.IMAGE);
        FileUtil.readWriteFile(multipartFile, fileName, uploadPath);

        //设置返回“图像”选项卡
        String callback = request.getParameter("CKEditorFuncNum");
        String src = apacheUrl + company.getCompanyTemplateDir() + "/" + ResourceFile.FILEUPLOAD + "/" + ResourceFile.IMAGE + "/" + fileName;
        PrintWriter out = response.getWriter();
        out.println("<script>window.parent.CKEDITOR.tools.callFunction(" + callback + ",'" + src + "','')</script>");
        return null;
    }

    /**
     * 获取上传文件的名称,以uuid生成文件名
     *
     * @param multipartFile multipartFile
     * @return 文件名
     */
    private String getUploadFileName(MultipartFile multipartFile) {
        String uploadFileName = multipartFile.getOriginalFilename();
        String type = uploadFileName.substring(uploadFileName.lastIndexOf("."));
        return UUID.randomUUID().toString() + type;
    }

    /**
     * 获取上传文件的保存路径
     *
     * @param company company
     * @return 路径
     */
    private String getFileUploadPath(Company company, String fileType) {
        return apacheDocPath + company.getCompanyTemplateDir() + File.separator + ResourceFile.FILEUPLOAD + File.separator + fileType;
    }

    @RequestMapping("/uploadNewsTitleImage")
    @ResponseBody
    public AjaxResponse uploadFile(@RequestParam("uploadImage") MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        Company company = (Company) request.getSession().getAttribute("company");
        String fileName = getUploadFileName(multipartFile);
        String uploadPath = getFileUploadPath(company, ResourceFile.IMAGE);
        FileUtil.readWriteFile(multipartFile, fileName, uploadPath);
        return new AjaxResponse("url", apacheUrl + company.getCompanyTemplateDir() + "/" + ResourceFile.FILEUPLOAD + "/" + ResourceFile.IMAGE + "/" + fileName);
    }

    /**
     * @param request
     * @param companyId
     * @return 文件上传路径
     */
    private String getZipPath(HttpServletRequest request, String companyId) {
        return request.getServletContext().getRealPath("template" + File.separator + companyId);
    }

    @RequestMapping("/uploadTemplateZip")
    @ResponseBody
    public AjaxResponse uploadZip(@RequestParam("uploadTemplate") MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        String companyId = (String) request.getSession().getAttribute("companyId");
        String fileName = getUploadFileName(multipartFile);
        String uploadPath = getZipPath(request, companyId);
        String unZipPath =  getZipPath(request, companyId);
        File directoryFile = new File(unZipPath);
        setDirFileSize(directoryFile, unZipPath, ResourceFile.FILE_SIZE);
        FileUtil.readWriteFile(multipartFile, fileName, uploadPath);
        ZipUtil.unZip(uploadPath + File.separator + fileName, unZipPath + File.separator + fileName.substring(0, fileName.lastIndexOf(".")));
        new File(request.getServletContext().getRealPath("template" + File.separator + "module")).mkdirs();
        FileUtil.copyFolder(unZipPath + File.separator + fileName.substring(0, fileName.lastIndexOf(".")), request.getServletContext().getRealPath("template" + File.separator + "module"));
        File file = new File(request.getServletContext().getRealPath("template" + File.separator + "module"));
        zipResolveService.fileResolve(file, companyId);
        return new AjaxResponse();
    }

    private void setDirFileSize(File directoryFile, String path, long size) {
        if (FileUtil.getFileOrDirSize(directoryFile) > size) {
            try {
                FileUtil.deleteFiles(new File(path));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
