package com.lin.service;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.ss.formula.functions.Now;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lin.dao.CheckDao;
import com.lin.dao.ClothingDao;
import com.lin.dao.ProductDetailDao;
import com.lin.dao.SampleDao;
import com.lin.dao.StockDao;
import com.lin.dao.TechnologyDao;
import com.lin.domain.CardB;
import com.lin.domain.CardH;
import com.lin.domain.Clothing;
import com.lin.domain.Product;
import com.lin.domain.ProductDetail;
import com.lin.domain.Sample;
import com.lin.domain.Stock;
import com.lin.domain.Technology;
import com.lin.domain.User;

@Service
public class SampleServiceImpl implements SampleService {
	
	@Autowired  
    private SampleDao sampleDao;
	
	@Autowired  
    private CheckDao checkDao;
	
	@Autowired  
    private StockDao stockDao;
	
	@Autowired  
    private ClothingDao clothingDao;
    
    @Autowired  
    private TechnologyDao technologyDao;
	
	@Autowired  
    private ProductDetailDao productDetailDao;
	
	public List<Product> listProduct(Product product) {
		return sampleDao.listProduct(product);
	}
	
	public List<Product> listProductT(Product product) {
		return sampleDao.listProductT(product);
	}
	
	public String selectSjmByLym(String str) {
		return sampleDao.selectSjmByLym(str);
	}
	
	public int countProduct(Product product) {
		return sampleDao.countProduct(product);
	}
	
	public int countProductT(Product product) {
		return sampleDao.countProductT(product);
	}
	
	public Product detailProduct(Product product) {
		return sampleDao.detailProduct(product);
	}
	
	public int saveCheck(HttpServletRequest request,Stock stock) {
		User user = (User)request.getSession().getAttribute("user");
		Sample sample = new Sample();
		sample.setUserId(user.getUserID());
		sample.setState(0);
		sample.setDate(new Date());
		sample.setSJM(stock.getSJM());
		sample.setCKMC(stock.getCKMC());
		sample.setOccurDate(stock.getOccurDate());
		sample.setDepName(stock.getDepName());
		sample.setHW(stock.getHW());
		sample.setYS(stock.getYS());
		sample.setSL(stock.getSL());
		sample.setHWSL(stock.getHWSL());
		sampleDao.saveCheck(sample);			
		return 0;
	}
	
	public List<Sample> listSample(Sample sample) {
		return checkDao.listSample(sample);
	}
	
	public int countListSample(Sample sample) {
		return checkDao.countListSample(sample);
	}
	
	public List<Sample> getListByIds(Integer[] list) {
		return checkDao.getListByIds(list);
	}
	
	public List<Sample> getListByStrings(String[] list) {
		return checkDao.getListByStrings(list);
	}
	
	public List<Sample> getCardListByStrings(Integer[] list) {
		return checkDao.getCardListByStrings(list);
	}
	
	public List<Sample> getListPByStrings(String[] list) {
		return checkDao.getListPByStrings(list);
	}
	
	public int deleteSample(Integer[] list) {
		return checkDao.deleteSample(list);
	}
	
	public Map<String, Object> submitSample(HttpServletRequest request,Integer[] list) {
		Map<String, Object> map = new HashMap<>();
		List<Sample> listSameples = checkDao.getListByIds(list);
		User user = (User)request.getSession().getAttribute("user");
		CardB cardB = new CardB();
		int num = 1;
		BigDecimal price1 =new BigDecimal("2.00"); 
		BigDecimal price2 =new BigDecimal("4.00");
		BigDecimal totalprice = new BigDecimal("0.00");
		BigDecimal totalnum = new BigDecimal("0.00");
		int djlsh = checkDao.getMaxCardHId();
		String isNotSubmit ="";
		int count = 0;
		//插入表体
		for (Sample sample : listSameples) {
			if(sample.getDQKC().compareTo(sample.getSL())>=0) {
				count++;
				cardB.setDjLsh(djlsh);
				cardB.setDjBth(num);
				cardB.setHH(num);
				cardB.setXH(num);
				cardB.setHPHM(sample.getYDJH());
				cardB.setSJM(sample.getSJM());
				cardB.setYS(sample.getYS());
				cardB.setDQKC(sample.getHWSL().intValue());
				cardB.setHW(sample.getHW());
				cardB.setCKSL(sample.getSL().intValue());
				if(sample.getYS().equals("黑色")) {
					cardB.setDJ(price1);
				}
				else {
					cardB.setDJ(price2);
				}
				cardB.setJE(sample.getSL().multiply(cardB.getDJ()));
				totalprice = totalprice.add(cardB.getJE());
				totalnum = totalnum.add(sample.getSL());
				num++;
				sample.setState(-1);
				checkDao.updateSample(sample);
				checkDao.saveCardB(cardB);
			}
			else {
				isNotSubmit=isNotSubmit+sample.getSJM()+",";
			}
		}
		//插入表头
		if(count>0) {
			CardH cardH = new CardH();
			cardH.setDjLsh(djlsh);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			calendar.set(Calendar.HOUR, 0);
			calendar.set(Calendar.MINUTE, 0);
			calendar.set(Calendar.SECOND, 0);
			cardH.setDJH(DocumentsCode(new Date()));//单据号
			cardH.setDJLY("网站录入");
			cardH.setCKLX("样卡");
			cardH.setDJFX("蓝字");
			cardH.setSRRQ(calendar.getTime());//输入日期
			cardH.setCompanyCode("0108");
			cardH.setCompanyName("富丽达集团杭州进出口有限公司");
			cardH.setOrgCode("010");
			cardH.setOrgName("进出口");
			cardH.setDepartmentCode(user.getDepartmentCode());
			cardH.setDepartmentName(user.getDepartmentName());//部门
			cardH.setCKH("02801");
			cardH.setCKMC("样卡仓库");
			cardH.setZDR(user.getUserName());
			cardH.setZDRID(user.getUserID());
			cardH.setZDRQ(new Date());
			cardH.setYKYS(listSameples.get(0).getYS());
			cardH.setHJSL(totalnum);//数量
			cardH.setHJJE(totalprice);//金额
			checkDao.saveCardH(cardH);
		}
		if(isNotSubmit.length()>0) {
			map.put("isNotSubmit", isNotSubmit.substring(0,isNotSubmit.length()-1)+"库存不足");
		}
		else {
			map.put("isNotSubmit", isNotSubmit);
		}
		return map;
	}
	
	public String DocumentsCode(Date date) {
		Calendar dateStart = Calendar.getInstance();
		dateStart.setTime(new Date());
		int num =checkDao.getMaxDocumentsCode(Integer.toString(dateStart.get(Calendar.YEAR)),Integer.toString(dateStart.get(Calendar.MONTH)+1));
		checkDao.updateMaxDJH(Integer.toString(dateStart.get(Calendar.YEAR)),Integer.toString(dateStart.get(Calendar.MONTH)+1));
		return "YKCK"+Integer.toString(dateStart.get(Calendar.YEAR)).substring(2)+getMonth(dateStart.get(Calendar.MONTH)+1)+format(num);
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
	
	public Product selectProduct(Product product) {
		return sampleDao.selectSample(product);
	}
	
	public ProductDetail getProductDetailById(Product product){
		return productDetailDao.getProductDetailById(product);
	}
	
	public List<ProductDetail> getProductLYMById(Product product){
		return productDetailDao.getProductLYMById(product);
	}
	
	public List<Stock> getStockBySJM(Stock stock){
		return stockDao.getStockBySJM(stock);
	}
	
	public List<Stock> getStockYSBySJM(Stock stock){
		return stockDao.getStockYSBySJM(stock);
	}
	
	public List<Stock> countgetStockBySJM(Stock stock) {
		return stockDao.countgetStockBySJM(stock);
	}
	
	public List<Clothing> listClothing(Clothing clothing) {
		return clothingDao.listClothing(clothing);
	}
	
	public int countClothing(Clothing clothing) {
		return clothingDao.countClothing(clothing);
	}
	
	public Clothing clothingDetail(Clothing clothing) {
		return clothingDao.clothingDetail(clothing);
	}
	
	public List<Clothing> listPosition(Clothing clothing) {
		return clothingDao.listPosition(clothing);
	}
	
	public List<Clothing> listClothingEdit(Clothing clothing) {
		return clothingDao.listClothingEdit(clothing);
	}
	
	public int countListClothingEdit(Clothing clothing) {
		return clothingDao.countListClothingEdit(clothing);
	}

	public int saveClothingEdit(Clothing clothing) {
		clothingDao.saveClothingEdit(clothing);		
		return 0;
	}
	
	public int saveClothing(Clothing clothing) {
		return clothingDao.saveClothing(clothing);
	}
	
	public void deleteClothingEdit(Clothing clothing) {
		clothingDao.deleteClothingEdit(clothing);
	}
	
	public int insertClothing(Clothing clothing) {
		return clothingDao.insertClothing(clothing);
	}
	
	public int insertClothingLink(Clothing clothing) {
		return clothingDao.insertClothingLink(clothing);
	}
	
	public Clothing selectByClothing(Clothing clothing) {
		return clothingDao.selectByClothing(clothing);
	}
}
