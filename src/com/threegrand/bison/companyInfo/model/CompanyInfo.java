package com.threegrand.bison.companyInfo.model;

import com.threegrand.bison.common.ajax.DataTablesPage;

/**
 * Created by lzg on 2016-01-15.
 */
public class CompanyInfo extends DataTablesPage {
    private String id;
    private String companyName;
    private String companySite;
    private String companyLinker;
    private String companyLinkMethod;
    private String image;

    public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanySite() {
        return companySite;
    }

    public void setCompanySite(String companySite) {
        this.companySite = companySite;
    }

    public String getCompanyLinker() {
        return companyLinker;
    }

    public void setCompanyLinker(String companyLinker) {
        this.companyLinker = companyLinker;
    }

    public String getCompanyLinkMethod() {
        return companyLinkMethod;
    }

    public void setCompanyLinkMethod(String companyLinkMethod) {
        this.companyLinkMethod = companyLinkMethod;
    }

	@Override
	public String toString() {
		return "CompanyInfo [id=" + id + ", companyName=" + companyName
				+ ", companySite=" + companySite + ", companyLinker="
				+ companyLinker + ", companyLinkMethod=" + companyLinkMethod
				+ ", image=" + image + "]";
	}
    
}
