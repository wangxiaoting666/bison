package com.threegrand.bison.design.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threegrand.bison.design.dao.FenceDao;
import com.threegrand.bison.design.service.FenceService;

@Service("fenceService")
public class FenceServiceiImpl implements FenceService{
	
	@Autowired
	private FenceDao fenceDao;

	//更细电子围栏编号
	@Override
	public int updateFence(String[] ids, String fenceId,String companyId) {
		return fenceDao.updateFence(ids,fenceId,companyId);
	}

	//删除电子围栏
	@Override
	public int deleteFence(String fenceId, String companyId) {
		return fenceDao.deleteFence(fenceId,companyId);
	}

}
