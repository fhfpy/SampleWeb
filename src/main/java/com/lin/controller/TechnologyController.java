package com.lin.controller;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.poi.ss.formula.functions.Replace;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lin.dao.TechnologyDao;
import com.lin.domain.TechnologyDetail;
import com.lin.domain.User;
import com.lin.service.TechnologyService;

@Controller
@RequestMapping("technology")
public class TechnologyController {
	@Resource
	private TechnologyService technologyService;

	@Resource
	private TechnologyDao technologyDao;

	@RequestMapping("/TechnologyCreate")
	public String TechnologyCreate() {
		return "TechnologyCreate";
	}

	@RequestMapping("/TechnologyEdit")
	public String TechnologyEdit() {
		return "TechnologyEdit";
	}

	@RequestMapping("/TechnologyList")
	public String TechnologyList() {
		return "TechnologyList";
	}

	@RequestMapping("/TechnologyPrint")
	public String TechnologyPrint() {
		return "TechnologyPrint";
	}

	@RequestMapping("/test")
	public String test() {
		return "test";
	}

	@RequestMapping(value = "/listTechnology", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> listTechnology(HttpServletRequest request, TechnologyDetail technology) {
		Map<String, Object> map = new HashMap<>();
		List<TechnologyDetail> list = technologyService.listTechnology(technology);
		map.put("rows", list);
		map.put("total", list.size());
		return map;
	}

	@RequestMapping(value = "/listTechnologyByPBMC", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> listTechnologyByPBMC(HttpServletRequest request, TechnologyDetail technology) {
		Map<String, Object> map = new HashMap<>();
		List<TechnologyDetail> list = technologyService.listTechnologyByPBMC(technology);
		map.put("rows", list);
		return map;
	}

	@RequestMapping(value = "/saveTechnology", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveTechnology(HttpServletRequest request, TechnologyDetail technology) {
		Map<String, Object> map = new HashMap<>();
		User user = (User) request.getSession().getAttribute("user");
		TechnologyDetail utd = technologyDao.getUtdById(user);
		TechnologyDetail t = technologyService.getTechnologyByName(technology);
		TechnologyDetail t1 = technologyDao.getPyxxkByName(technology);
		if(t1==null) {
			//创建样品信息库
			int id = technologyDao.getYpxxkMaxId();
			Calendar dateStart = Calendar.getInstance();
			dateStart.setTime(new Date());
			dateStart.get(Calendar.YEAR);
			String hphm=Integer.toString(dateStart.get(Calendar.YEAR))+getMonth(dateStart.get(Calendar.MONTH)+1)+Integer.toString(dateStart.get(Calendar.DATE))+"01";
			String h = technologyDao.getHphmStart(hphm);
			if(h!=null) {
				hphm = technologyDao.getMaxHphm();
			}
			technologyDao.saveYpxxk(id,hphm,technology.getPBMC(),user.getUserID(),user.getUserName(),new Date());
		}
		if (t != null) {
			// 更新
			TechnologyDetail tDetail = new TechnologyDetail();
			String[] arr = technology.getLystr().split("\\|");
			int num = 0;
			// 更新明细表
			technologyDao.deleteDetali(t);
			for (String s : arr) {
				String[] list = s.split("\\,");
				if (list[3].length() > 3) {
					num += 1;
					tDetail.setDjLsh(t.getDjLsh());
					tDetail.setDjBth(num);
					tDetail.setBNumber(num);
					tDetail.setLine(num);
					tDetail.setJWFL(list[0].contains("经") ? "经原料" : "纬原料");
					tDetail.setJWSX(list[0].replace("　",""));
					tDetail.setWPMC(list[1]);
					tDetail.setND(list[2]);
					tDetail.setYL(new BigDecimal(list[3].substring(0, list[3].length() - 3)));
					technologyDao.insertTechnologyDetail(tDetail);
				}
			}
			// 更新主表
			technologyService.updateTechnology(technology);
			map.put("returnCode", 1);
		} else {
			int id = technologyDao.getMaxId();
			// 插入主表
			technology.setDjLsh(id);
			technology.setDocumentsCode(DocumentsCode(new Date()));
			technology.setDocState("正常");
			technology.setOccurDate(getStartTime(new Date()));
			technology.setSourceType("手工录入");
			technology.setCompanyCode(utd.getCompanyCode());
			technology.setCompanyName(utd.getCompanyName());
			technology.setOrgCode(utd.getOrgCode());
			technology.setOrgName(utd.getOrgName());
			technology.setDABH(technology.getPBMC());
			technology.setPBMF(new BigDecimal("0"));
			technology.setPBWM(new BigDecimal("0"));
			technology.setPBJM(new BigDecimal("0"));
			technology.setMZ(new BigDecimal("0"));
			technology.setProducer(user.getUserName());
			technology.setProducerId(user.getUserID());
			technology.setProduceTime(new Date());
			technologyDao.insertTechnology(technology);
			// 插入明细
			TechnologyDetail tDetail = new TechnologyDetail();
			String[] arr = technology.getLystr().split("\\|");
			int num = 0;
			for (String s : arr) {
				String[] list = s.split("\\,");
				if (list[3].length() > 3) {
					num += 1;
					tDetail.setDjLsh(id);
					tDetail.setDjBth(num);
					tDetail.setBNumber(num);
					tDetail.setLine(num);
					tDetail.setJWFL(list[0].contains("经") ? "经原料" : "纬原料");
					tDetail.setJWSX(list[0].replace("　",""));
					tDetail.setWPMC(list[1]);
					tDetail.setND(list[2]);
					tDetail.setYL(new BigDecimal(list[3].substring(0, list[3].length() - 3)));
					technologyDao.insertTechnologyDetail(tDetail);
				}
			}
			map.put("returnCode", 1);
		}
		return map;
	}

	@RequestMapping(value = "/checkUser", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> checkUser(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<>();
		User user = (User) request.getSession().getAttribute("user");
		map.put("user", user);
		return map;
	}

	@RequestMapping(value = "/listPBMC", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> listPBMC(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<>();
		List<TechnologyDetail> list = technologyDao.listPBMC();
		map.put("list", list);
		return map;
	}

	@RequestMapping(value = "/listSX", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> listSX(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<>();
		List<TechnologyDetail> list = technologyDao.listSX();
		map.put("list", list);
		return map;
	}

	public Date getStartTime(Date date) {
		Calendar dateStart = Calendar.getInstance();
		dateStart.setTime(date);
		dateStart.set(Calendar.HOUR_OF_DAY, 0);
		dateStart.set(Calendar.MINUTE, 0);
		dateStart.set(Calendar.SECOND, 0);
		return dateStart.getTime();
	}
	
	public String DocumentsCode(Date date) {
		Calendar dateStart = Calendar.getInstance();
		dateStart.setTime(new Date());
		int num =technologyDao.getMaxDocumentsCode(Integer.toString(dateStart.get(Calendar.YEAR)),Integer.toString(dateStart.get(Calendar.MONTH)+1));
		technologyDao.updateMaxDJH(Integer.toString(dateStart.get(Calendar.YEAR)),Integer.toString(dateStart.get(Calendar.MONTH)+1));
		return "Pb-Gyd-"+Integer.toString(dateStart.get(Calendar.YEAR))+getMonth(dateStart.get(Calendar.MONTH)+1)+format(num);
	}
	
	public String getMonth(int month) {
		if(month>=10) {
			return Integer.toString(month);
		}
		else {
			return "0"+Integer.toString(month);
		}
	}
	
	public String format(int i) {
		NumberFormat nf = NumberFormat.getInstance();
		nf.setGroupingUsed(false);
		nf.setMaximumIntegerDigits(4);
		nf.setMinimumIntegerDigits(4);
		return nf.format(i+1);
	}
}
