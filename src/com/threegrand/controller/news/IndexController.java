package com.threegrand.controller.news;

import com.threegrand.bison.news.model.IndexParam;
import com.threegrand.bison.news.service.IndexService;
import com.threegrand.bison.news.service.impl.IndexServiceImpl;
import freemarker.template.TemplateException;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;

@Controller
public class IndexController {

    @Autowired
    private IndexService indexService;


    @RequestMapping("index.do")
    public void index(IndexParam param, HttpServletRequest request, HttpServletResponse response) throws IOException, TemplateException {
        if(StringUtils.isBlank(param.getComId())){
            param.setComId("1");
        }
        if(StringUtils.isBlank(param.getAct())){
            param.setAct(IndexServiceImpl.ACT_INDEX);
        }
        HttpSession session = request.getSession();
        String templatePath = session.getServletContext().getRealPath("template" + File.separator + param.getComId());
        param.setTemplatePath(templatePath);
        indexService.index(param, response.getWriter());
    }
}
