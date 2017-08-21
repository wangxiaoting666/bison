package com.threegrand.controller.design;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.threegrand.bison.assets.model.Asset;
import com.threegrand.bison.assets.service.AssetService;
import com.threegrand.bison.design.model.Node;
import com.threegrand.bison.design.service.NodeService;
import com.threegrand.bison.security.model.Role;
import com.threegrand.bison.security.service.RoleService;
import com.threegrand.bison.security.service.UserService;
import com.threegrand.bison.system.model.Organ;
import com.threegrand.bison.system.service.OrganService;
import com.wonderland.sail.ajax.response.AjaxResponse;

@Controller
@RequestMapping("node")
public class NodeController {

	@Autowired
	private NodeService nodeService;
	@Autowired
	private UserService userService;
	@Autowired
	private RoleService roleService;
	@Autowired
	private OrganService organService;
	@Autowired
	private AssetService assetService;

	/**
	 * 初始加载zTree
	 * 
	 * @param node
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/initNode", method = RequestMethod.GET)
	@ResponseBody
	public AjaxResponse getNode(HttpServletRequest request) {
		String companyId = request.getSession().getAttribute("companyId")
				.toString();
		Node node = nodeService.getNodeTree(companyId, companyId);
		// 查询资产的数量
		int count = nodeService.getAssetCount(companyId);
		node.setName(node.getName() + "(" + count + ")");
		node.setType("organ");
		node.setIsParent(true);
		return new AjaxResponse("node", node);
	}

	/**
	 * zTree点击时间 加载相应的部门和资产
	 * 
	 * @param organId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "getTree", method = RequestMethod.GET)
	@ResponseBody
	public AjaxResponse getTree(@RequestParam(value = "id") String id,
			HttpServletRequest request) {
		String companyId = request.getSession().getAttribute("companyId")
				.toString();

		// 创建集合，装载数据
		ArrayList<Node> treeList = new ArrayList<Node>();

		// 获取当前用户角色对应的部门id集合
		List<String> organIds = getUserOrganIdsByRoleName(request, companyId);

		// 查询当前用户下所有的pid为id的部门
		for (String organId : organIds) {
			Node node = nodeService.getNodeTree(organId, companyId);
			if (node.getpId().equals(id)) {
				// 根据部门id查询该部门下的所有资产
				int count = nodeService.getAssetCountByPid(node.getId(),
						companyId);
				// 递归获取子部门计算资产数量
				int sum = assetCount(node.getId(), companyId, count);
				node.setName(node.getName() + "(" + sum + ")");
				node.setType("organ");
				node.setIsParent(true);
				treeList.add(node);
			}
		}

		// 根据部门id查询当前部门下的所有资产
		List<Node> assetsTree = nodeService.getAssetsTree(id, companyId);
		for (Node node : assetsTree) {
			node.setType("asset");
			node.setIsParent(false);
		}
		treeList.addAll(assetsTree);

		// 查询部门下的所有人员
		/*
		 * List<Node> staffTree = nodeService.getStaffTree(id,companyId); for
		 * (Node node : staffTree) { node.setType("staff");
		 * node.setIsParent(false); } treeList.addAll(staffTree);
		 */

		return new AjaxResponse("treeList", treeList);
	}

	public int assetCount(String pid, String companyId, int count) {
		// 获取所有pid为id的部门id
		List<String> idList = organService.queryOrganByPId(pid, companyId);
		for (String id : idList) {
			// 获取该部门下的资产
			int c = nodeService.getAssetCountByPid(id, companyId);
			count += c;
			// 递归
			assetCount(id, companyId, count);
		}
		return count;
	}

	/**
	 * 根据关键字查询部门或资产
	 * 
	 * @param key
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	@ResponseBody
	public AjaxResponse searchOrganOrAsset(@RequestParam("key") String key,
			HttpServletRequest request) throws Exception {
		// 获取当前用户角色对应的部门id集合
		String companyId = (String) request.getSession().getAttribute(
				"companyId");
		List<String> organIds = getUserOrganIdsByRoleName(request, companyId);

		List<Organ> organList = organService.searchOrgan(key, companyId);
		StringBuffer sb = new StringBuffer();
		if (organList.size() > 0) {
			for (Organ organ : organList) {
				if (organIds.contains(organ.getOrganId())) {
					sb.append(organ.getOrganName()).append(",");
				}
			}
		} else {
			// 如果根据关键词查询不到部门，就去查询资产
			List<Asset> assetList = assetService.getAssetLikeName(key,
					companyId);
			for (Asset asset : assetList) {
				String id = asset.getOrganId().toString();
				if (organIds.contains(id)) {
					sb.append(asset.getAssetName()).append("(")
							.append(asset.getOrganName()).append(")")
							.append(",");
				}
			}
		}
		return new AjaxResponse("nameList", sb.toString());
	}

	/**
	 * 根据name查询部门或者资产
	 * 
	 * @param key
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "queryOrganOrAssetByName", method = RequestMethod.POST)
	@ResponseBody
	public AjaxResponse queryOrganByName(@RequestParam("name") String name,
			HttpServletRequest request) throws Exception {

		ArrayList<Node> nodeList = new ArrayList<Node>();
		// 根据名称获取organTree
		String companyId = (String) request.getSession().getAttribute(
				"companyId");
		List<Node> oNodeList = nodeService.getOrganNode(name, companyId);
		//判断是查找部门还是资产
		if (oNodeList.size() > 0) {
			for (Node node : oNodeList) {
				node.setIsParent(true);
				node.setType("organ");
				nodeList.add(node);
			}
		} else {
			// 如果没有部门去查询资产
			// 判断是精确到部门的查找，还是模糊查找
			if (name.contains("(")) {
				// 获取资产和部门名称
				String assetName = name.substring(0, name.indexOf("("));
				String organName = name.substring(name.indexOf("(") + 1,
						name.indexOf(")"));
				// 根据资产和部门去查找资产
				List<Asset> assetList = assetService.queryAssetByNameAndOrgan(
						assetName, organName, companyId);
				for (Asset asset : assetList) {
					Node node = new Node();
					node.setId(asset.getAssetId());
					node.setName(asset.getAssetName() + "("
							+ asset.getOrganName() + ")");
					node.setIsParent(false);
					node.setType("asset");
					nodeList.add(node);
				}
			} else {
				// 模糊查找
				List<Asset> assetList = assetService.queryAssetByLikeName(name,
						companyId);
				for (Asset asset : assetList) {
					Node node = new Node();
					node.setId(asset.getAssetId());
					node.setName(asset.getAssetName() + "("
							+ asset.getOrganName() + ")");
					node.setIsParent(false);
					node.setType("asset");
					nodeList.add(node);
				}
			}
		}
		return new AjaxResponse("ztreeNode", nodeList);
	}

	/**
	 * 获取当前用户所有的部门权限
	 * 
	 * @param request
	 * @param companyId
	 * @return
	 */
	public List<String> getUserOrganIdsByRoleName(HttpServletRequest request,
			String companyId) {
		// 获取当前用户对应的角色名
		String loginName = (String) SecurityUtils.getSubject().getPrincipal();
		String roleName = userService.getRoles(loginName, companyId).get(0);

		// 通过角色名获取部门id
		Role role = roleService.getRoleByName(roleName, companyId);
		List<String> organIds = roleService.getOrganIds(role.getRoleId(),
				companyId);
		return organIds;
	}

}
