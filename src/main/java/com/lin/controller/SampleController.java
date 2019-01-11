package com.lin.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.net.Socket;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.lin.dao.MyRun;
import com.lin.dao.PuRun;
import com.lin.dao.SampleDao;
import com.lin.domain.CardB;
import com.lin.domain.Clothing;
import com.lin.domain.Common;
import com.lin.domain.Consumer;
import com.lin.domain.CubbyHole;
import com.lin.domain.FullArrangement1;
import com.lin.domain.Iterator;
import com.lin.domain.MyCollection;
import com.lin.domain.Producer;
import com.lin.domain.Product;
import com.lin.domain.ProductDetail;
import com.lin.domain.Sample;
import com.lin.domain.Stock;
import com.lin.domain.ToolUnit;
import com.lin.domain.User;
import com.lin.service.BookFacade;
import com.lin.service.BookFacadeImpl;
import com.lin.service.BookFacadeProxy;
import com.lin.service.SampleService;
import com.lin.service.UserService;

import net.coobird.thumbnailator.Thumbnails;

@Controller 
@RequestMapping("sample")

public class SampleController {
	 	@Resource  
	    private UserService userService;  
	    
	 	@Resource
	 	private SampleService sampleService;
	 	
	 	@Resource
	 	private SampleDao sampleDao;
	 	
	    @RequestMapping("/sampleList")    
	    public String sampleList(){     
	    	return "sampleList";
	    }
	    
	    @RequestMapping("/sampledetail")    
	    public String sampledetail(){     
	    	return "sampledetail";
	    }
	    
	    @RequestMapping("/checkList")    
	    public String checkList(){     
	    	return "checkList";
	    }
	    
	    @RequestMapping("/detail")    
	    public String detail(){     
	    	return "detail";
	    }
	    
	    @RequestMapping("/test")    
	    public String test(){     
	    	return "test";
	    }
	    
	    @RequestMapping("/plate")    
	    public String plate(){     
	    	return "plate";
	    }
	    
	    @RequestMapping("/platenew")    
	    public String platenew(){     
	    	return "platenew";
	    }
	    
	    @RequestMapping("/clothing")    
	    public String clothing(){     
	    	return "clothing";
	    }
	    
	    @RequestMapping("/clothingDetail")    
	    public String clothingDetail(){     
	    	return "clothingDetail";
	    }
	    
	    @RequestMapping("/importClothing")    
	    public String importClothing(){
	    	return "importClothing";
	    }
	    
	    @RequestMapping("/clothingEdit1")    
	    public String clothingEdit1(){
	    	return "clothingEdit1";
	    }
	    
	    @RequestMapping("/TechnologyCreate")    
	    public String TechnologyCreate(){
	    	return "TechnologyCreate";
	    }
	    /**
	     * 面料列表查询
	    * <p>Title: listMenu</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/listSample",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> listMenu(HttpServletRequest request,Product product){
	    	Map<String, Object> map = new HashMap<>();
	    	int first=0;
	    	int first1=0;
	    	int first2=0;
	    	int first3=0;
	    	int page = product.getPage();
	    	int rows = 24;
	    	String cf = product.getCF();
	    	String ms = product.getMS();
	    	String cfbl = product.getCfbl();
	    	String cfjq = product.getCfjq();
	    	String [] arr3 = null;
    		String[] array = null;
	    	List<Product> products =new ArrayList<>();
	    	List<Product> productlist =new ArrayList<>();
	    	List<Product> products1 =new ArrayList<>();
	    	List<Product> products2 =new ArrayList<>();
	    	List<Product> products3 =new ArrayList<>();
	    	List<Product> productlist1 =new ArrayList<>();
	    	List<Product> productlist2 =new ArrayList<>();
	    	List<Product> productlist3 =new ArrayList<>();
    		if(product.getCfjq()!=null||product.getCfjq()=="") {
    			arr3 = product.getCfjq().replace(" ", ",").split(",");
    			FullArrangement1 fullArrangement1 =new FullArrangement1();
        		array = fullArrangement1.doFullArrangement(arr3).toArray(new String[0]);
        		for(int i=0;i<array.length;i++) {
        			array[i] = array[i].substring(1, array[i].length()-1).replace(", ", " ");
        		}
    		}
    		if(array!=null) {
    			products3 = sampleService.listCfjq(array);
    		}
    		array =null;
	    	if((product.getMS()==null||product.getMS()=="")&&((product.getCF()==null||product.getCF()==""))&&(product.getCfbl()==null||product.getCfbl()=="")) {
	    		if(product.getYpmin()!=null||product.getYpmax()!=null||product.getYkmin()!=null||product.getYkmax()!=null||(product.getDepName()!=null&&product.getDepName()!="")) {
	    			products = sampleService.listProductT(product);
		    	}
		    	else {
		    		products = sampleService.listProduct(product);
				}
	    	}
	    	else {
	    		product.setMS(ms);
	    		product.setCF("");
	    		product.setCfbl("");
	    		product.setCfjq("");
	    		String [] arr = product.getMS().replace(" ", ",").split(",");
	    		if(arr[0]!="") {
			    	for (String string : arr) {
			    		product.setMS(string);
						first++;
						if(product.getYpmin()!=null||product.getYpmax()!=null||product.getYkmin()!=null||product.getYkmax()!=null||(product.getDepName()!=null&&product.getDepName()!="")) {
				    		productlist = sampleService.listProductT(product);
				    	}
				    	else {
					    	productlist = sampleService.listProduct(product);
						}
						if(first==1) {
							products.addAll(productlist);
						}
						else {
							products.retainAll(productlist);
						}
					}
	    		}
	    		product.setMS("");
	    		product.setCF(cf);
	    		product.setCfbl("");
	    		product.setCfjq("");
		    	String [] arr1 = product.getCF().replace(" ", ",").split(",");
	    		if(arr1[0]!="") {
			    	for (String string : arr1) {
			    		product.setCF(string);
						first1++;
						if(product.getYpmin()!=null||product.getYpmax()!=null||product.getYkmin()!=null||product.getYkmax()!=null||(product.getDepName()!=null&&product.getDepName()!="")) {
				    		productlist1 = sampleService.listProductT(product);
				    	}
				    	else {
					    	productlist1 = sampleService.listProduct(product);
						}
						if(first1==1) {
							products1.addAll(productlist1);
						}
						else {
							products1.retainAll(productlist1);
						}
					}
	    		}
	    		product.setMS("");
	    		product.setCF("");
	    		product.setCfbl(cfbl);
	    		product.setCfjq("");
		    	String [] arr2 = product.getCfbl().replace(" ", ",").split(",");
	    		if(arr2[0]!="") {
			    	for (String string : arr2) {
			    		product.setCfbl(string);
						first2++;
						if(product.getYpmin()!=null||product.getYpmax()!=null||product.getYkmin()!=null||product.getYkmax()!=null||(product.getDepName()!=null&&product.getDepName()!="")) {
				    		productlist2 = sampleService.listProductT(product);
				    	}
				    	else {
				    		productlist2 = sampleService.listProduct(product);
						}
						if(first2==1) {
							products2.addAll(productlist2);
						}
						else {
							products2.retainAll(productlist2);
						}
					}
	    		}
	    		
	    		/*product.setCfjq(cfjq);
	    		product.setMS("");
	    		product.setCF("");
	    		product.setCfbl("");
	    		String [] arr3 = product.getCfjq().replace(" ", ",").split(",");
	    		String[] array = FullArrangement1.doFullArrangement(arr3).toArray(new String[0]);
	    		product.setRows(99999);
	    		product.setPage(1);
	    		if(array[0]!="") {
			    	for (String string : array) {
			    		product.setCfjq(string.substring(1, string.length()-1).replace(", ", " "));
						first3++;
						if(product.getYpmin()!=null||product.getYpmax()!=null||product.getYkmin()!=null||product.getYkmax()!=null||(product.getDepName()!=null&&product.getDepName()!="")) {
				    		productlist3 = sampleService.listProductT(product);
				    	}
				    	else {
					    	productlist3 = sampleService.listProduct(product);
						}
						products3.addAll(productlist3);
					}
	    		}*/
	    	}
	    	products = retainList(products,products1);
    		products = retainList(products,products2);
    		products = retainList(products,products3);
	    	Common.removeDuplicate(products);
	    	String allSJM = "";
	    	int count =products.size();
	    	for (Product p : products) {
				allSJM =allSJM+","+p.getSJM();
			}
	    	if(products.size()>24) {
	    		if(page* rows>products.size()) {
	    			products = products.subList((page - 1) * rows, products.size());
	    		}
	    		else{
	    			products = products.subList((page - 1) * rows, page* rows);
	    		}
	    	}
	    	map.put("rows",products);
			if(allSJM!="") {
				map.put("allSJM",allSJM.substring(1, allSJM.length()));
			}
			else {
				map.put("allSJM","");
			}
			map.put("count",count);
			//User user = (User)request.getSession().getAttribute("user");
			return map;
	    	
		}
	    
	    public List<Product> retainList(List<Product> p1,List<Product> p2){
	    	List<Product> p = new ArrayList<>();
	    	if(p1.size()>0&&p2.size()>0) {
	    		p1.retainAll(p2);
	    		p=p1;
	    	}
	    	else if(p1.size()>0&&p2.size()==0) {
	    		p=p1;
	    	}
	    	else if(p1.size()==0&&p2.size()>0) {
	    		p=p2;
	    	}
	    	else {
	    		
			}
	    	return p;
	    }
	    /**
	     * 样衣列表查询
	    * <p>Title: listClothing</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/listClothing",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> listClothing(HttpServletRequest request,Clothing clothing){
	    	Map<String, Object> map = new HashMap<>();
	    	List<Clothing> clothinglist = sampleService.listClothing(clothing);
	    	int total = sampleService.countClothing(clothing);
			map.put("rows",clothinglist);
			map.put("total", total);
			return map;
	    	
		}
	    /**
	     * 样衣列表数量查询
	    * <p>Title: countClothing</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/countClothing",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> countClothing(HttpServletRequest request,Clothing clothing){
	    	Map<String, Object> map = new HashMap<>();
	    	int count = sampleService.countClothing(clothing);
			map.put("count",count);
			return map;
	    	
		}
	    
	    @RequestMapping(value="/clothingDetail",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> clothingDetail(HttpServletRequest request,Clothing clothing){
	    	Map<String, Object> map = new HashMap<>();
	    	Clothing clothingDetail = sampleService.clothingDetail(clothing);
			map.put("rows",clothingDetail);
			return map;
	    	
		}
	    @RequestMapping(value="/listPosition",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> listPosition(HttpServletRequest request,Clothing clothing){
	    	Map<String, Object> map = new HashMap<>();
	    	List<Clothing> pList = sampleService.listPosition(clothing);
			map.put("rows", pList);
			return map;
	    	
		}
	    @RequestMapping(value="/listClothingEdit",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> listClothingEdit(HttpServletRequest request,Clothing clothing){
	    	Map<String, Object> map = new HashMap<>();
	    	List<Clothing> pList = sampleService.listClothingEdit(clothing);
	    	int total = sampleService.countListClothingEdit(clothing);
			map.put("rows", pList);
			map.put("total", total);
			return map;
		}
	    @RequestMapping(value="/saveClothingEdit",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> saveClothingEdit(HttpServletRequest request,Clothing clothing){
	    	Map<String, Object> map = new HashMap<>();
	    	int result = sampleService.saveClothingEdit(clothing);
	    	if(result==0) {
	    		map.put("returnCode", 0);
	    	}
	    	else {
	    		map.put("returnCode", -1);
	    	}
			return map;
		}
	    @RequestMapping(value="/deleteClothingEdit",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> deleteClothingEdit(HttpServletRequest request,Clothing clothing){
	    	Map<String, Object> map = new HashMap<>();
	    	sampleService.deleteClothingEdit(clothing);
	    	map.put("returnCode", 0);
			return map;
		}
	    /**
	     * 面料数量查询
	    * <p>Title: countProduct</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/countProduct",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> countProduct(HttpServletRequest request,Product product){
	    	Map<String, Object> map = new HashMap<>();
	    	int count = 0;
	    	if(product.getYpmin()!=null||product.getYpmax()!=null||product.getYkmin()!=null||product.getYkmax()!=null||(product.getDepName()!=null&&product.getDepName()!="")) {
	    		count = sampleService.countProductT(product);
	    	}
	    	else {
	    		if(product.getCfbl()!=null&&product.getMS()!=null&&product.getCF()!=null) {
	    			product.setCfbl(product.getCfbl().replace(" ",""));
		    		product.setMS(product.getMS().replace(" ",""));
		    		product.setCF(product.getCF().replace(" ",""));
	    		}
	    		count = sampleService.countProduct(product);
			}
			map.put("count",count);
			return map;
	    	
		}
	    /**
	     * 面料明细查询
	    * <p>Title: detail</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/detailSample",method = RequestMethod.GET)
	    @ResponseBody
	    public Map<String,Object> detail(HttpServletRequest request,Product product){
	    	Map<String, Object> map = new HashMap<>();
	    	ProductDetail detail =sampleService.getProductDetailById(product);
			map.put("rows",detail);
			return map;
	    }
	    
	    @RequestMapping(value="/getLYM",method = RequestMethod.GET)
	    @ResponseBody
	    public Map<String,Object> getLYM(HttpServletRequest request,Product product){
	    	Map<String, Object> map = new HashMap<>();
	    	List<ProductDetail> lym =sampleService.getProductLYMById(product);
			map.put("rows",lym);
			return map;
	    }
	    /**
	     * 颜色种类查询(根据面料编码)
	    * <p>Title: listStockYS</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/listStockYS",method = RequestMethod.POST)
	    @ResponseBody
	    public Map<String,Object> listStockYS(HttpServletRequest request,Stock stock){
	    	Map<String, Object> map = new HashMap<>();
	    	List<Stock> stocklist = sampleService.getStockYSBySJM(stock);
			map.put("rows",stocklist);
			return map;
	    }
	    /**
	     * 选样
	    * <p>Title: saveCheck</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/saveCheck",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> saveCheck(HttpServletRequest request,Stock stock){
	    	Map<String, Object> map = new HashMap<>();
	    	int result = sampleService.saveCheck(request,stock);
	    	if(result==0) {
	    		map.put("returnCode", 0);
	    	}
	    	else {
	    		map.put("returnCode", -1);
	    	}
			return map;
		}
	    /**
	     * 选样列表查询
	    * <p>Title: listCheck</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/listCheck",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> listCheck(HttpServletRequest request,Sample sample){
	    	Map<String, Object> map = new HashMap<>();
	    	User user = (User)request.getSession().getAttribute("user");
	    	sample.setUserId(user.getUserID());
	    	List<Sample> listCheck = sampleService.listSample(sample);
	    	int total = sampleService.countListSample(sample);
	    	map.put("total", total);
			map.put("rows",listCheck);
			return map;
		}
	    /**
	     * 查询面料库存
	    * <p>Title: listStock</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/listStock",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> listStock(HttpServletRequest request,Stock stock){
	    	Map<String, Object> map = new HashMap<>();
	    	List<Stock> stocklist = sampleService.getStockBySJM(stock);
	    	List<Stock> total = sampleService.countgetStockBySJM(stock);
	    	map.put("total", total.size());
			map.put("rows",stocklist);
			return map;
		}
	    /**
	     * 导出选样
	    * <p>Title: importChecked</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/importChecked",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> importChecked(HttpServletRequest request,Integer[] list){
	    	Map<String, Object> map = new HashMap<>();
	    	List<Sample> samples = sampleService.getListByIds(list);
	    	try {
	    		String dest = request.getServletContext().getRealPath("\\public\\upload");
				XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(dest + "\\sample.xlsx"));
				XSSFSheet sheet = wb.getSheetAt(0);
				int i=1;
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    		for (Sample sample : samples) {
					XSSFRow row1 = sheet.createRow(i);
					XSSFCell cell0 = row1.createCell(0);
					cell0.setCellValue(sample.getSampleId());
					XSSFCell cell1 = row1.createCell(1);
					cell1.setCellValue(sample.getSJM());	
					XSSFCell cell2 = row1.createCell(2);
					cell2.setCellValue(sdf.format(sample.getDate()));
					XSSFCell cell3 = row1.createCell(3);
					cell3.setCellValue(sample.getCKMC());
					XSSFCell cell4 = row1.createCell(4);
					if(sample.getOccurDate()!=null) {
						cell4.setCellValue(sdf.format(sample.getOccurDate()));
					}
					XSSFCell cell5 = row1.createCell(5);
					if(sample.getDepName()!=null) {
						cell5.setCellValue(sample.getDepName());
					}
					XSSFCell cell6 = row1.createCell(6);
					cell6.setCellValue(sample.getHW());
					XSSFCell cell7 = row1.createCell(7);
					cell7.setCellValue(sample.getYS());
					XSSFCell cell8 = row1.createCell(8);
					cell8.setCellValue(sample.getSL().toString());
					XSSFCell cell9 = row1.createCell(9);
					if(sample.getHWSL()!=null) {
						cell9.setCellValue(sample.getHWSL().toString());
					}
					XSSFCell cell10 = row1.createCell(10);
					cell10.setCellValue(sample.getGG());
					XSSFCell cell11 = row1.createCell(11);
					cell11.setCellValue(sample.getMS());
					XSSFCell cell12 = row1.createCell(12);
					cell12.setCellValue(sample.getKZ());
					XSSFCell cell13 = row1.createCell(13);
					cell13.setCellValue(sample.getMD());
					XSSFCell cell14 = row1.createCell(14);
					cell14.setCellValue(sample.getMF());
					XSSFCell cell15 = row1.createCell(15);
					cell15.setCellValue(sample.getCFJX());
					XSSFCell cell16 = row1.createCell(16);
					cell16.setCellValue(sample.getCF());
					XSSFCell cell17 = row1.createCell(17);
					cell17.setCellValue(sample.getZXPBCB());
					XSSFCell cell18 = row1.createCell(18);
					cell18.setCellValue(sample.getZXMLCB());
					XSSFCell cell19 = row1.createCell(19);
					cell19.setCellValue(sample.getZXKSCB());
					XSSFCell cell20 = row1.createCell(20);
					cell20.setCellValue(sample.getBKZW());
					XSSFCell cell21 = row1.createCell(21);
					cell21.setCellValue(sample.getHKWZ());
					XSSFCell cell22 = row1.createCell(22);
					cell22.setCellValue(sample.getJG());
					XSSFCell cell23 = row1.createCell(23);
					cell23.setCellValue(sample.getBZ());
					XSSFCell cell24 = row1.createCell(24);
					cell24.setCellValue(sample.getLYM());
					XSSFCell cell25 = row1.createCell(25);
					cell25.setCellValue(sample.getGYSMC());
					i++;
				}
	    		FileOutputStream os = new FileOutputStream(dest + "\\" + "sampleOut.xlsx");
				wb.write(os);
				os.close();
				wb.close();
				map.put("title", "sampleOut.xlsx");
				return map;
			} catch (Exception e) {
				e.printStackTrace();
				return map;
			}
		}
	    /**
	     * 删除选样
	    * <p>Title: deleteSample</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/deleteSample",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> deleteSample(HttpServletRequest request,Integer[] list){
	    	Map<String, Object> map = new HashMap<>();
	    	int result = sampleService.deleteSample(list);
	    	return map;
	    }
	    /**
	     * 样衣明细保存
	    * <p>Title: saveClothing</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/saveClothing",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> saveClothing(HttpServletRequest request,Clothing clothing){
	    	Map<String, Object> map = new HashMap<>();
	    	int result = sampleService.saveClothing(clothing);
	    	return map;
	    }
	    
	    /**
	     * 样衣导入
	    * <p>Title: improtClothing</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/improtClothing",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> improtClothing(HttpServletRequest request,@RequestParam(value = "file", required = false) MultipartFile file){
	    	Map<String, Object> map = new HashMap<>();
	    	try {
	    		XSSFWorkbook wb = new XSSFWorkbook(file.getInputStream());
		    	String fileName = file.getOriginalFilename();
	    		XSSFSheet sheet = wb.getSheetAt(0);
				// 寰楀埌鎬昏鏁�
				int rowNum = sheet.getLastRowNum();
				for(int i=0;i<rowNum;i++) {
					XSSFRow row = sheet.getRow(i+1);
					XSSFCell cell0 = row.getCell(0);
					XSSFCell cell1 = row.getCell(1);
					XSSFCell cell2 = row.getCell(2);
					XSSFCell cell3 = row.getCell(3);
					Clothing clothing =new Clothing();
					clothing.setClothingCode(cell0.toString());
					clothing.setSJM(cell1.toString());
					clothing.setPosition("");
					if(cell2!=null) {
						clothing.setPosition(cell2.toString());
					}
					clothing.setType(cell3.toString());
					Clothing clocheck= sampleService.selectByClothing(clothing);
					if(clocheck==null) {
						sampleService.insertClothing(clothing);
						sampleService.insertClothingLink(clothing);
					}
				}
				wb.close();
				map.put("code", "1");
	    	}
	    	catch (Exception e) {
			}
	    	return map;
	    }
	    /**
	     * 样衣图片上传(小)
	    * <p>Title: uploadCloPicSmall</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/uploadCloPicSmall",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> uploadCloPicSmall(HttpServletRequest request,@RequestParam(value = "file", required = false) MultipartFile file){
	    	Map<String, Object> map = new HashMap<>();
	    	try {
		    	String fileName = file.getOriginalFilename();
				String dest = request.getServletContext().getRealPath("\\public\\img\\clothingsmall");
				file.transferTo(new File(dest+"\\"+fileName));
				map.put("code", "1");
	    	}
	    	catch (Exception e) {
			}
	    	return map;
	    }
	    /**
	     * 样衣图片上传(大)
	    * <p>Title: uploadCloPicbig</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年4月29日
	     */
	    @RequestMapping(value="/uploadCloPicbig",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> uploadCloPicbig(HttpServletRequest request,@RequestParam(value = "file", required = false) MultipartFile file){
	    	Map<String, Object> map = new HashMap<>();
	    	try {
		    	String fileName = file.getOriginalFilename();
				String dest1 = request.getServletContext().getRealPath("\\public\\img\\clothing");
				String dest2 = request.getServletContext().getRealPath("\\public\\img\\clothingsmall");
				file.transferTo(new File(dest1+"\\"+fileName));
				File fromPic=new File(dest1+"\\"+fileName);  
		        File toPic=new File(dest2+"\\"+fileName);
				Thumbnails.of(fromPic).scale(0.3f).toFile(toPic);
	    	}
	    	catch (Exception e) {
			}
	    	map.put("code", "1");
	    	return map;
	    }
	    
	    @RequestMapping(value="/checkUser",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> checkUser(HttpServletRequest request){
	    	Map<String, Object> map = new HashMap<>();
	    	User user = (User)request.getSession().getAttribute("user");
			map.put("user",user);
			return map;
	    }
	    
	    @RequestMapping(value="/test",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> test(HttpServletRequest request){
	    	Map<String, Object> map = new HashMap<>();
	    	try {
	    		Constructor<User> constructor = User.class.getConstructor();
		    	User emp3 = constructor.newInstance();
			} catch (Exception e) {
				// TODO: handle exception
			}
	    	
	    	Set set = new HashSet<>();
	    	set.add("1");
			return map;
	    }
	    
	    public static  List <String> getNewList(List<String> li){
	        List<String> list = new ArrayList<String>();//创建新的list
	        for(int i=0; i<li.size(); i++){
	            String str = li.get(i);  //获取传入集合对象的每一个元素
	            if(!list.contains(str)){   //查看新集合中是否有指定的元素，如果没有则加入
	                list.add(str);
	            }
	        }
	        return list;  //返回集合
	    }
	    
	    
	    @RequestMapping(value="/importProduct",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> importProduct(HttpServletRequest request,String[] list){
	    	Map<String, Object> map = new HashMap<>();
	    	List<Sample> samples = sampleService.getListByStrings(list);
	    	try {
	    		String dest = request.getServletContext().getRealPath("\\public\\upload");
				XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(dest + "\\sampleImport.xlsx"));
				XSSFSheet sheet = wb.getSheetAt(0);
				int i=1;
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				List<Sample> yk = new ArrayList<Sample>();
				List<Sample> yp = new ArrayList<Sample>();
				List<Sample> cp = new ArrayList<Sample>();
				List<Sample> samplesFinal = new ArrayList<Sample>();
				List<String> sjms = new ArrayList<String>();
				for (Sample sample : samples) {
					sjms.add(sample.getSJM());
					if(sample.getCKMC().equals("样卡仓库")) {
						yk.add(sample);
					}
					if(sample.getCKMC().equals(" 样品仓库")) {
						yp.add(sample);
					}
					if(sample.getCKMC().equals(" 成品仓库")) {
						cp.add(sample);
					}
				}
				BigDecimal s1 =new BigDecimal("0");
				BigDecimal s2 =new BigDecimal("0");
				BigDecimal s3 =new BigDecimal("0");
				String ykhw = "";
				String yphw = "";
				String cphw = "";
				List<String> newList = getNewList(sjms);
				Sample eachS = new Sample();
				for (String str : newList) {
					for(Sample s : yk) {
						if(s.getSJM().equals(str)) {
							s1 = s.getSL();
							ykhw = s.getHW();
						}
					}
					for(Sample s : yp) {
						if(s.getSJM().equals(str)) {
							s2 = s.getSL();
							yphw = s.getHW();
						}
					}
					for(Sample s : cp) {
						if(s.getSJM().equals(str)) {
							s3 = s.getSL();
							cphw = s.getHW();
						}
					}
					for(Sample s : yk) {
						if(s.getSJM().equals(str)) {
							s.setCKMC(ykhw);
							s.setSL(s1);
							s.setYpck(yphw);
							s.setYpsl(s2);
							s.setCpck(cphw);
							s.setCpsl(s3);
							samplesFinal.add(s);
						}
					}
				}
				
	    		for (Sample sample : samplesFinal) {
					XSSFRow row1 = sheet.createRow(i);
					XSSFCell cell0 = row1.createCell(1);
					cell0.setCellValue(sample.getSJM());	
					XSSFCell cell2 = row1.createCell(2);
					cell2.setCellValue(sample.getCF());
					
					XSSFCell cell3 = row1.createCell(3);
					cell3.setCellValue(sample.getGG());
					
					XSSFCell cell25 = row1.createCell(4);
					cell25.setCellValue(sample.getMD());
					
					XSSFCell cell4 = row1.createCell(5);
					cell4.setCellValue(sample.getMF());
					XSSFCell cell5 = row1.createCell(6);
					cell5.setCellValue(sample.getKZ());
					
					XSSFCell cell6 = row1.createCell(7);
					cell6.setCellValue(sample.getCKMC());
					XSSFCell cell7 = row1.createCell(8);
						cell7.setCellValue(sample.getSL().toString());
					XSSFCell cell8 = row1.createCell(9);
					cell8.setCellValue(sample.getYpck());
					XSSFCell cell9 = row1.createCell(10);
						cell9.setCellValue(sample.getYpsl().toString());
					XSSFCell cell10 = row1.createCell(11);
					cell10.setCellValue(sample.getCpck());
					XSSFCell cell11 = row1.createCell(12);
						cell11.setCellValue(sample.getCpsl().toString());
					XSSFCell cell12 = row1.createCell(13);
					cell12.setCellValue(sample.getDepName());
					
					XSSFCell cell13 = row1.createCell(14);
					cell13.setCellValue(sample.getYS());
					
					XSSFCell cell14 = row1.createCell(15);
					cell14.setCellValue(sample.getMS());
					
					XSSFCell cell15 = row1.createCell(16);
					cell15.setCellValue(sample.getCFJX());
					
					XSSFCell cell16 = row1.createCell(17);
					cell16.setCellValue(sample.getZXPBCB());
					XSSFCell cell17 = row1.createCell(18);
					cell17.setCellValue(sample.getZXMLCB());
					XSSFCell cell18 = row1.createCell(19);
					cell18.setCellValue(sample.getZXRSCB());
					XSSFCell cell19 = row1.createCell(20);
					cell19.setCellValue(sample.getBKZW());
					XSSFCell cell20 = row1.createCell(21);
					
					cell20.setCellValue(sample.getHKWZ());
					XSSFCell cell21 = row1.createCell(22);
					cell21.setCellValue(sample.getJG());
					XSSFCell cell22 = row1.createCell(23);
					cell22.setCellValue(sample.getBZ());
					XSSFCell cell23 = row1.createCell(24);
					cell23.setCellValue(sample.getLYM());
					XSSFCell cell24 = row1.createCell(25);
					cell24.setCellValue(sample.getGYSMC());
					i++;
				}
	    		FileOutputStream os = new FileOutputStream(dest + "\\" + "sampleExport.xlsx");
				wb.write(os);
				os.close();
				wb.close();
				map.put("title", "sampleExport.xlsx");
				return map;
			} catch (Exception e) {
				e.printStackTrace();
				return map;
			}
		}
	    
	    @RequestMapping(value="/listProduct",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> listProduct(HttpServletRequest request,String[] list){
	    	Map<String, Object> map = new HashMap<>();
	    	List<Sample> samples = sampleService.getListPByStrings(list);
	    	map.put("rows",samples);
	    	map.put("total", list.length);
	    	return map;
		}
	    
	    public boolean isNotIn(List<String> str,Product p) {
	    	boolean isNot = true;
	    	for(String s:str) {
	    		if(s.equals(p.getSJM())) {
	    			isNot = false;
	    		}
	    	}
	    	return isNot;
	    }
	    
	    @RequestMapping(value="/jmyppic",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> jmyppic(HttpServletRequest request) throws Exception{
	    	Map<String, Object> map = new ConcurrentHashMap<>();
	    	
	    	/*Object count = request.getSession().getServletContext().getAttribute("Count");
	    	
	    	Object maxCount = request.getSession().getServletContext().getAttribute("MaxCount");
	    	
	    	map.put("count", count.toString());
	    	map.put("maxCount", maxCount.toString());*/
	    	/*
	    	
	    	CardB cardB = new CardB();
	    	cardB.CF = "123";
	    	ToolUnit.setValue(cardB, "CF", "321");
	    	
	    	String str = "hello";
	        Method m = str.getClass().getMethod("toUpperCase");
	        System.out.println(m.invoke(str));
	    	
	    	String driverName="com.microsoft.sqlserver.jdbc.SQLServerDriver";//SQL数据库引擎
	        String dbURL="jdbc:sqlserver://10.1.5.1:1433;DatabaseName=EosData";//数据源  ！！！！注意若出现加载或者连接数据库失败一般是这里出现问题
	        String Name="sa";
	        String Pwd="fld@3999";
	        
	        Class.forName(driverName);
	        Connection conn=DriverManager.getConnection(dbURL,Name,Pwd);
	        System.out.println("连接数据库成功");
	        
	        Statement stm1 = conn.createStatement();
	        
	        ResultSet rs1 = stm1.executeQuery("select * from Pub_CheckH where DjLsh > 206691");
	        
	        while (rs1.next()) {
				System.out.println(rs1.getString("DocCode"));
			}
	    	
	    	try {
	    		BufferedReader bf1 = new BufferedReader(new FileReader("C:\\Users\\Administrator\\Desktop\\1.txt"));
	    		String line = bf1.readLine();
	    		while (line!=null) {
					System.out.println(line);
					line = bf1.readLine();
				}
	    		bf1.close();
			} catch (Exception e) {
				// TODO: handle exception
			}
	    	
	    	try {
				File f1 = new File("C:\\Users\\Administrator\\Desktop\\2.txt");
				if(!f1.exists()) {
					f1.createNewFile();
				}
				FileWriter fw1 = new FileWriter(f1.getAbsolutePath());
				BufferedWriter bw1 = new BufferedWriter(fw1);
				bw1.write("111");
				bw1.close();
			} catch (Exception e) {
				// TODO: handle exception
			}
	    	int inum = Integer.parseInt("123");
	    	
	    	//Provider provider = new SendMailFactory();  
	        //Sender sender = provider.produce();  
	        //sender.Send(); 
	    	CubbyHole h = new CubbyHole();
	    	Runnable rp = new Producer(h,1);
	    	Runnable rc = new Consumer(h, 1);
	    	Thread t1 = new Thread(rp);
	    	Thread t2 = new Thread(rc);
	    	t1.start();
	    	t2.start();
	    	
	    	ExecutorService ser2 = Executors.newFixedThreadPool(20);
	    	ser2.submit(new MyRun(100));
	    	
	    	
	    	MyCollection my1 = new MyCollection();
	    	Iterator it = my1.iterator();
	    	
	    	while(it.hasNext()){  
	            System.out.println(it.next());  
	        }  
	    	
	    	BookFacadeImpl bfi = new BookFacadeImpl();
	    	BookFacadeProxy bfp = new BookFacadeProxy();
	    	BookFacade bf = (BookFacade)bfp.bind(bfi);
	    	bf.addBook();
	    	bf.deleteBook();
	    	
	    	
	    	LocalDateTime l = LocalDateTime.now();
	    	LocalDateTime l1 =l.minusDays(1);
	    	l1 = l.with(TemporalAdjusters.firstDayOfNextMonth());
	    	Calendar c1 = Calendar.getInstance();
	    	Date d1 =c1.getTime();
	    	SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMdd");
	    	String s1 = sdf1.format(d1);
	    	DateTimeFormatter dtf1 = DateTimeFormatter.ofPattern("yyyyMMdd");
	    	String s2 = l1.format(dtf1);
	    	
	    	Calendar cl1 = Calendar.getInstance();
	    	Date d3 = cl1.getTime();
	    	SimpleDateFormat sdf3 = new SimpleDateFormat("yyyy");
	    	String s3 = sdf3.format(d3);
	    	BigDecimal bd3 = new BigDecimal("0");
	    	
	    	List<String> list1 = Collections.synchronizedList(new ArrayList<String>());
	    	List<Future<Integer>> lf1 = new ArrayList<>();
	    	
	    	ExecutorService ser1 = Executors.newFixedThreadPool(10);
	    	PuRun pr =new PuRun();
	    	Future<?> f1 = ser1.submit(pr);
	    	for(int i = 0; i < 10; i++) {
	    		lf1.add(ser1.submit(new MyRun(10)));
	        }
	    	int sum =0;
	    	for(Future<Integer> f :lf1) {
	    		sum += f.get();
	    	}
	    	MyRun mr1 = new MyRun(10);
	    	MyRun mr2 = MyRun.clone(mr1);
	    	mr2.setUpperBounds(100);
	    	int tesxi = mr1.getUpperBounds();
	    	System.out.println(sum);*/
	    	
	    	
	    	String des = request.getServletContext().getRealPath("\\public\\img");
	    	File fb = new File(des+"\\big");
	    	List<String> list = new ArrayList<String>();
	        for(File temp : fb.listFiles()) {
	            if(temp.isFile()) {
	                list.add(temp.getName().substring(0, temp.getName().indexOf(".")));
	            }
	        }
	        List<Product> samplesList = sampleDao.listStrPics();
	        
	        File fs = new File(des+"\\small");
	    	List<String> lists = new ArrayList<String>();
	        for(File temp : fs.listFiles()) {
	            if(temp.isFile()) {
	                lists.add(temp.getName().substring(0, temp.getName().indexOf(".")));
	            }
	        }
	        try {
	    		String dest = request.getServletContext().getRealPath("\\public\\upload");
				XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(dest + "\\picImport.xlsx"));
				XSSFSheet sheet = wb.getSheetAt(0);
				XSSFSheet sheet1 = wb.getSheetAt(1);
				int i=1;
				int j=1;
	    		for (Product p : samplesList) {
	    			if(isNotIn(list,p)) {
	    				XSSFRow row1 = sheet.createRow(i);
						XSSFCell cell0 = row1.createCell(0);
						cell0.setCellValue(p.getSJM());	
						XSSFCell cell1 = row1.createCell(1);
						cell1.setCellValue(p.getHKKW());	
						i++;
	    			}
				}
	    		for (Product p : samplesList) {
	    			if(isNotIn(lists,p)) {
	    				XSSFRow row2 = sheet1.createRow(j);
						XSSFCell cell3 = row2.createCell(0);
						cell3.setCellValue(p.getSJM());	
						XSSFCell cell4 = row2.createCell(1);
						cell4.setCellValue(p.getHKKW());
						j++;
	    			}
				}
	    		FileOutputStream os = new FileOutputStream(dest + "\\" + "picExport.xlsx");
				wb.write(os);
				os.close();
				wb.close();
				map.put("title", "picExport.xlsx");
				return map;
			} catch (Exception e) {
				e.printStackTrace();
				return map;
			}
	    	/*LocalDateTime dateTime = LocalDateTime.now();
	    	int year = dateTime.getYear();
	    	int totalDay = dateTime.getDayOfYear();
	    	int monthDay = dateTime.getDayOfMonth();
	    	DayOfWeek weekDay = dateTime.getDayOfWeek();
	    	Month t = dateTime.getMonth();
	    	LocalDateTime l = LocalDateTime.ofInstant((new Date()).toInstant(),ZoneId.systemDefault());
	    	DateTimeFormatter dateTimeFormatter =DateTimeFormatter.ofPattern("yyyy,ss");
	    	String s1 = l.format(dateTimeFormatter);
	    	Date date = new Date();*/
	    	/*Calendar cal =Calendar.getInstance();
	    	Date date = new Date();
	    	int i = cal.get(Calendar.YEAR);
	    	SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd");
	    	String aString = sFormat.format(date);
	    	DateTimeFormatter dateTimeFormatter =DateTimeFormatter.ofPattern("今天是yyyy年MM月dd日,HH点mm分ss秒");
	    	LocalDate ld = LocalDate.now();
	    	LocalDateTime ltd =LocalDateTime.now();
	    	LocalTime lt = LocalTime.now();
	    	LocalDate d1 = ld.with(TemporalAdjusters.firstDayOfMonth());
	    	LocalDate d2 = ld.with(TemporalAdjusters.lastDayOfMonth());
	    	LocalDate d3 = LocalDate.parse("2018-01-01").with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY));
	    	//String s1 = ld.format(dateTimeFormatter);
	    	
	    	ZoneId zoneId =ZoneId.systemDefault();
	    	Instant instant =date.toInstant();
	    	LocalDateTime dTOldt1 = LocalDateTime.ofInstant(date.toInstant(), zoneId);
	    	LocalDate dTOldt2 = instant.atZone(zoneId).toLocalDate();
	    	String s2 = ltd.format(dateTimeFormatter);*/
	    	/*Pic p =new Pic();
	    	p.pic = pic;
	    	p.datetime = l;
	    	p.date = l.toLocalDate();
	    	p.timestamp = l.toInstant(ZoneOffset.of("+8")).toEpochMilli();
	    	sampleDao.savepic(p);*/
	        
	        
		}
	    
	    /**
	     * 
	    * <p>Title: submitSample</p>  
	    * <p>Description: </p>  
	    * @author fenghaifeng  
	    * @date 2018年11月25日
	     */
	    @RequestMapping(value="/submitSample",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> submitSample(HttpServletRequest request,Integer[] list){
	    	Map<String, Object> map = new HashMap<>();
	    	map = sampleService.submitSample(request,list);
	    	return map;
	    }
	    
	    @RequestMapping(value="/importCard",method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> importCard(HttpServletRequest request,Integer[] list){
	    	Map<String, Object> map = new HashMap<>();
	    	List<Sample> samples = sampleService.getCardListByStrings(list);
	    	try {
	    		String dest = request.getServletContext().getRealPath("\\public\\upload");
				XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(dest + "\\sampleCardImport.xlsx"));
				XSSFSheet sheet = wb.getSheetAt(0);
				int i=1;
	    		for (Sample sample : samples) {
					XSSFRow row1 = sheet.createRow(i);
					XSSFCell cell0 = row1.createCell(0);
					cell0.setCellValue(sample.getSJM());	
					XSSFCell cell1 = row1.createCell(1);
					cell1.setCellValue(sample.getHW());
					XSSFCell cell2 = row1.createCell(2);
					cell2.setCellValue(sample.getSL().toString());
					i++;
				}
	    		FileOutputStream os = new FileOutputStream(dest + "\\" + "sampleCardExport.xlsx");
				wb.write(os);
				os.close();
				wb.close();
				map.put("title", "sampleCardExport.xlsx");
				return map;
			} catch (Exception e) {
				e.printStackTrace();
				return map;
			}
		}
}
