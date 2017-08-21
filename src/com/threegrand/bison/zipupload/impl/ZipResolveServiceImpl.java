package com.threegrand.bison.zipupload.impl;

import com.wonderland.sail.exception.ValidateErrorException;
import com.threegrand.bison.design.dao.TemplateDao;
import com.threegrand.bison.design.model.Template;
import com.threegrand.bison.zipupload.ZipResolveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;

@Service("ZipResolveService")
public class ZipResolveServiceImpl implements ZipResolveService {

    @Autowired
    TemplateDao templateDao;

    @Override
    public void fileResolve(File file, String companyId) {
        if (!file.isDirectory()) {
            throw new ValidateErrorException("您输入目录有误，请重新输入");
        } else {
            File[] files = file.listFiles();
            for (File file1 : files) {
                if (file1.isDirectory()) {
                    fileResolve(file1, companyId);
                } else {
                    if (getFileParent(file1).equals("\\index")) {
                        addTemplate(file1.getName().substring(0, file1.getName().lastIndexOf(".")), file1.getName().substring(0, file1.getName().lastIndexOf(".")), companyId, "1");
                    }
                    if (getFileParent(file1).equals("\\moduleindex")) {
                        addTemplate(file1.getName().substring(0, file1.getName().lastIndexOf(".")), file1.getName().substring(0, file1.getName().lastIndexOf(".")), companyId, "2");
                    }
                    if (getFileParent(file1).equals("\\list")) {
                        addTemplate(file1.getName().substring(0, file1.getName().lastIndexOf(".")), file1.getName().substring(0, file1.getName().lastIndexOf(".")), companyId, "3");
                    }
                    if (getFileParent(file1).equals("\\content")) {
                        addTemplate(file1.getName().substring(0, file1.getName().lastIndexOf(".")), file1.getName().substring(0, file1.getName().lastIndexOf(".")), companyId, "4");
                    }
                    if (getFileParent(file1).equals("\\singlepage")) {
                        addTemplate(file1.getName().substring(0, file1.getName().lastIndexOf(".")), file1.getName().substring(0, file1.getName().lastIndexOf(".")), companyId, "5");
                    }
                    if (getFileParent(file1).equals("\\include")) {
                        addTemplate(file1.getName().substring(0, file1.getName().lastIndexOf(".")), file1.getName().substring(0, file1.getName().lastIndexOf(".")), companyId, "6");
                    }
                }
            }
        }
    }

    private String getFileParent(File file) {
        return file.getParent().substring(file.getParent().lastIndexOf("\\"));
    }

    private int addTemplate(String templateName, String alias, String companyId, String templateType) {
        return templateDao.addTemplate(setTemplate(templateName, alias, companyId, templateType));
    }

    private Template setTemplate(String templateName, String templateAlias, String companyId, String TemplateType) {
        Template template = new Template();
        template.setTemplateName(templateName);
        template.setTemplateAlias(templateAlias);
        template.setCompanyId(companyId);
        template.setTemplateType(TemplateType);

        return template;
    }
}