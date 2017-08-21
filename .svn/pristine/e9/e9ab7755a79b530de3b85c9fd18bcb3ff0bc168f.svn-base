package com.threegrand.bison.sjgl.service.impl;


import com.threegrand.bison.sjgl.dao.PictureDao;
import com.threegrand.bison.sjgl.model.Picture;
import com.threegrand.bison.sjgl.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("pictureService")
public class PictureServiceImpl implements PictureService {
    @Autowired
    private PictureDao pictureDao;


    @Override
    public int addImage(Picture picture) {
//        Picture p1 =new Picture();
//        p1.setImageId(1);
//        p1.setImageName("123");
//        p1.setBuilding("2");
//        p1.setLc("2");
//        p1.setUrl("13412123");
//
//        return pictureDao.addImage(p1);
        return pictureDao.addImage(picture);
    }

    @Override
    public int deleteImage(int imageId) {
        return pictureDao.deleteImage(imageId);
    }

    @Override
    public List<Picture> getPictureList() {
        return pictureDao.getPictureList();
    }

    @Override
    public int updatePicture(Picture picture) {
        return pictureDao.updatePicture(picture);
    }
}
