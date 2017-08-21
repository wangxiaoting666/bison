package com.threegrand.bison.system.service;

import com.threegrand.bison.system.model.Company;

/**
 * Created by Administrator on 2014/10/27.
 */
public interface CompanyService {

    Company getCompany(String companyId);

    int updateIndexTemplate(Company company);
}
