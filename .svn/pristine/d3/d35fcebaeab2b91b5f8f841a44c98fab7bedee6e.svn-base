package com.threegrand.bison.companyInfo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threegrand.bison.companyInfo.dao.CompanyInfoDao;
import com.threegrand.bison.companyInfo.model.CompanyInfo;
import com.threegrand.bison.companyInfo.service.CompanyInfoService;
import com.threegrand.bison.system.dao.OrganDao;
import com.threegrand.bison.system.model.Organ;

/**
 * Created by lzg on 2016-01-15.
 */
@Service("companyInfoService")
public class CompanyInfoServiceImpl implements CompanyInfoService {
    @Autowired
    private CompanyInfoDao companyInfoDao;
    @Autowired
    private OrganDao organDao;

    @Override
    public int addInfo(CompanyInfo companyInfo) {
        return  companyInfoDao.addInfo(companyInfo);
    }
    
    @Override
    public int updateInfo(CompanyInfo companyInfo) {
    	int count = companyInfoDao.updateInfo(companyInfo);
    	//更新部门的公司信息
    	updateOrgan();
        return  count;
    }
    
    
    public void updateOrgan(){
    	CompanyInfo companyInfo = companyInfoDao.getCompanyInfo();
    	Organ organ = new Organ();
    	organ.setOrganId(companyInfo.getId());
    	organ.setOrganName(companyInfo.getCompanyName());
    	organ.setAddress(companyInfo.getCompanySite());
    	organ.setManager(companyInfo.getCompanyLinker());
    	organ.setPhone(companyInfo.getCompanyLinkMethod());
    	organ.setParentId("-1");
    	organ.setLeaf(false);
    	organ.setLevel("0");
    	organ.setEnable(true);
    	organ.setCompanyId(companyInfo.getId());
    	organDao.updateOrgan(organ);
    }

    @Override
    public CompanyInfo getCompanyInfo() {
        return companyInfoDao.getCompanyInfo();
    }
}
