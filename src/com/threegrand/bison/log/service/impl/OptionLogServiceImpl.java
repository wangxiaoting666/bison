package com.threegrand.bison.log.service.impl;



import com.threegrand.bison.log.dao.LogDao;
import com.threegrand.bison.log.model.Log;
import com.threegrand.bison.log.service.OptionLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lzg on 2016-01-13.
 */
@Service("optionLog")
public class OptionLogServiceImpl implements OptionLogService{

    @Autowired
    private LogDao logMapper;

    /**
     * 新增
     * @param log
     */
    public void insertLog(Log log){
        logMapper.insertLog(log);
    }

    /**
     * 获取日志
     * @return
     */
    public List<Log> getLogListPage(Log log){
        return logMapper.getLogListPage(log);
    }
}
