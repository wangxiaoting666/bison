package com.threegrand.bison.design.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threegrand.bison.design.dao.NodeDao;
import com.threegrand.bison.design.model.Node;
import com.threegrand.bison.design.service.NodeService;
import com.threegrand.bison.system.model.Organ;
import com.threegrand.bison.system.model.Staff;

@Service
public class NodeServiceImpl implements NodeService{

	@Autowired
	private NodeDao nodeDao;

	@Override
	public Node getNodeTree(String organId, String companyId) {
		Node node = nodeDao.getNodeTree(organId, companyId);
		node.setType("organ");
		return node;
	}


	@Override
	public List<Node> getAssetsTree(String organId, String companyId) {
		List<Node> assetsTree = nodeDao.getAssetsTree(organId,companyId);
		for (Node node : assetsTree) {
			node.setType("asset");
		}
		return assetsTree;
	}


	@Override
	public List<Node> getStaffTree(String id, String companyId) {
		return nodeDao.getStaffTree(id,companyId);
	}


	@Override
	public int getAssetCount(String companyId) {
		return nodeDao.getAssetCount(companyId);
	}


	@Override
	public int getAssetCountByPid(String id, String companyId) {
		return nodeDao.getAssetCountByPid(id,companyId);
	}

	
	public List<Node> getOrganNode(String name, String companyId) {
		return nodeDao.getOrganNode(name, companyId);
	}



	
}
