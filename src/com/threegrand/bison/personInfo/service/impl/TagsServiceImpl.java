package com.threegrand.bison.personInfo.service.impl;

import com.threegrand.bison.personInfo.dao.TagDao;
import com.threegrand.bison.personInfo.model.Tag;
import com.threegrand.bison.personInfo.service.TagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2016/1/7.
 */
@Service("tagsService")
public class TagsServiceImpl implements TagsService{
    @Autowired
    private TagDao tagDao;
    @Override
    public List<Tag> getTags() {
        return tagDao.getTags();
    }

    @Override
    public int addTags(Tag tag) {
        int affectLineNumber=tagDao.addTags(tag);
        return affectLineNumber;
    }
}
