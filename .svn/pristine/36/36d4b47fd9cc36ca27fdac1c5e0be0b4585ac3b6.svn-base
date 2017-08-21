package com.threegrand.bison.news.freemarker.tag;

import freemarker.core.Environment;
import freemarker.template.*;

import java.io.IOException;
import java.util.Map;

/**
 * Created by Administrator on 2014/10/20.
 */
public class AfterPageDirective implements TemplateDirectiveModel {
    public void execute(Environment env, Map params, TemplateModel[] loopVars,
                        TemplateDirectiveBody body) throws TemplateException, IOException {
        TemplateHashModel dataMap = env.getDataModel();
        int repeat = Integer.parseInt(params.get("repeat").toString());
        int pageNum = Integer.parseInt(dataMap.get("pageNum").toString());
        int totalPage = Integer.parseInt(dataMap.get("totalPage").toString());
        repeat = repeat < (totalPage - pageNum) ? repeat : (totalPage - pageNum);

        String urlPrefix = dataMap.get("urlPrefix").toString();
        String label = params.get("label").toString();
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= repeat; i++) {
            sb.append(label.replace("#url", urlPrefix + (pageNum + i) + ".html")
                    .replace("#pageNum", String.valueOf(pageNum + i)));
        }
        env.getOut().write(sb.toString());
    }
}
