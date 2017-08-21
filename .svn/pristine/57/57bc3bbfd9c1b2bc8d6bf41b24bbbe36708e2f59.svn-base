package com.threegrand.controller.design;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.threegrand.bison.design.service.FenceService;
import com.wonderland.sail.ajax.response.AjaxResponse;

@Controller
@RequestMapping("/design/fence")
public class FenceController {

	@Autowired
	private FenceService fenceService;
	
	@RequestMapping(method = RequestMethod.GET)
    public String getResource() {
        return "/design/fence";
    }
	
	/**
	 * 更新资产的电子围栏
	 * @param ids
	 * @param fenceId
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/updateFence",method=RequestMethod.POST)
	@ResponseBody
	public AjaxResponse updateFence(@RequestParam(value="ids")String[] ids,
			@RequestParam(value="fenceId")String fenceId,HttpServletRequest request){
		String companyId = request.getSession().getAttribute("companyId").toString();
		int count = fenceService.updateFence(ids,fenceId,companyId);
		return AjaxResponse.getInstanceByResult(count > 0);
	}
	
	/**
	 * 删除资产的电子围栏
	 * @param fenceId
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/deleteFence",method=RequestMethod.POST)
	@ResponseBody
	public AjaxResponse deleteFence(@RequestParam(value="fenceId")String fenceId,HttpServletRequest request){
		String companyId = request.getSession().getAttribute("companyId").toString();
		int count = fenceService.deleteFence(fenceId,companyId);
		return AjaxResponse.getInstanceByResult(count > 0);
	}
	
	

	
}
