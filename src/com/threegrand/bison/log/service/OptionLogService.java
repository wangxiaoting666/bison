package com.threegrand.bison.log.service;

import com.threegrand.bison.log.model.Log;

import java.util.List;

/**
 * Created by lzg on 2016-01-14.
 */
public interface OptionLogService {

    void insertLog(Log log);

    List<Log> getLogListPage(Log log);
}
