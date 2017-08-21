package com.threegrand.bison.sjgl.service;


import com.threegrand.bison.sjgl.model.Picture;

import java.util.List;


public interface PictureService {
    int addImage(Picture picture);
    int deleteImage(int imageId);
    List<Picture> getPictureList();
    int updatePicture(Picture picture);

}

