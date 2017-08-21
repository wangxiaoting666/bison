/*
* StartUpListerner.java
* Created on  2011-12-5 下午4:10
* 版本       修改时间          作者      修改内容
* V1.0.1    2011-12-5      gaoxy    初始版本
*
* Copyright (c) 2010 长春吉成科技有限公司 版权所有
* CHANGCHUN GENGHIS TECHNOLOGY CO.,LTD. All Rights Reserved.
*/
package com.threegrand.bison.common.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * 启动监听
 *
 * @version 1.0.1
 */
public class StartUpListener implements ServletContextListener {

    private Logger logger = LoggerFactory.getLogger(StartUpListener.class);

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        logger.info("------" + servletContextEvent.getServletContext().getContextPath() + " framework init------");
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        logger.info("------" + servletContextEvent.getServletContext().getContextPath() + " framework destroy------");
    }
}
