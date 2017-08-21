package com.threegrand.bison.map.service.impl;

import com.threegrand.bison.map.dao.LocationDao;
import com.threegrand.bison.map.model.Location;
import com.threegrand.bison.map.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Kaoji on 2016-11-24.
 */
@Service("locationService")
public class LocationServiceImpl implements LocationService {
    @Autowired
    private LocationDao locationDao;

}
