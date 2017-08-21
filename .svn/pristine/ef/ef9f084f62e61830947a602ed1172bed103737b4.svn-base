package com.threegrand.bison.system.service.impl;

import com.threegrand.bison.system.dao.CompanyDao;
import com.threegrand.bison.system.model.Company;
import com.threegrand.bison.system.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2014/10/27.
 */
@Service("CompanyService")
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyDao companyDao;

    @Override
    public Company getCompany(String companyId) {
        return companyDao.getCompany(companyId);
    }

    @Override
    public int updateIndexTemplate(Company company) {
        return companyDao.updateIndexTemplate(company);
    }

}
