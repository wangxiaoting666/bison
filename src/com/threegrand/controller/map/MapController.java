package com.threegrand.controller.map;

import com.threegrand.bison.map.model.Location;
import com.threegrand.bison.map.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Kaoji on 2016-11-24.
 */
@Controller
@RequestMapping("map")
public class MapController {
    @Autowired
    private LocationService locationService;

    @RequestMapping("/mapLocations")
    public String mapLocations() {return "/map/maplocations";}

//    @RequestMapping(value = "/getLocation", method = RequestMethod.POST)
//    public Location getLocation()
//    {
//        return locationService.getLocation(locationService.getJourneyIds());
//    }
}
