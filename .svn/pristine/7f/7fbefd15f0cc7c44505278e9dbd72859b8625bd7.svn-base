package com.threegrand.bison.news.freemarker.tag;

import freemarker.core.Environment;
import freemarker.template.*;

import java.io.IOException;
import java.util.Map;

public class PrePageDirective implements TemplateDirectiveModel {

    public void execute(Environment env, Map params, TemplateModel[] loopVars,
                        TemplateDirectiveBody body) throws TemplateException, IOException {
        TemplateHashModel dataMap = env.getDataModel();
        int repeat = Integer.parseInt(params.get("repeat").toString());
        int pageNum = Integer.parseInt(dataMap.get("pageNum").toString());
        repeat = repeat < pageNum ? repeat : pageNum - 1;

        String urlPrefix = dataMap.get("urlPrefix").toString();
        String label = params.get("label").toString();
        StringBuilder sb = new StringBuilder();
        for (int i = repeat; i > 0; i--) {
            sb.append(label.replace("#url", urlPrefix + (pageNum - i) + ".html")
                    .replace("#pageNum", String.valueOf((pageNum - i))));
        }
        env.getOut().write(sb.toString());
    }

}
