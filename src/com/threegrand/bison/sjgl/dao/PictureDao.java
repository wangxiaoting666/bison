package com.threegrand.bison.sjgl.dao;


import com.threegrand.bison.sjgl.model.Picture;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@mybatisRepository
public interface PictureDao {

    int addImage(Picture picture);

    int deleteImage(int imageId);

    List<Picture> getPictureList();

    int updatePicture(Picture picture);

}
