package com.lin.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.lin.domain.Clothing;
import com.lin.domain.Product;
import com.lin.domain.ProductDetail;
import com.lin.domain.Sample;
import com.lin.domain.Stock;
import com.lin.domain.Technology;

public interface SampleService {
	/**
	 * ��ѯ��Ʒ�б�
	* <p>Title: listProduct</p>  
	* <p>Description: </p>  
	* @author fenghaifeng  
	* @date 2018��4��2��
	 */
	List<Product> listProduct(Product product); 
	
	List<Product> listProductT(Product product); 
	
	String selectSjmByLym(String str);
	
	List<Clothing> listClothing(Clothing clothing); 
	
	Clothing clothingDetail(Clothing clothing); 
	
	List<Clothing> listPosition(Clothing clothing); 
	
	List<Clothing> listClothingEdit(Clothing clothing); 
	
	int saveClothing(Clothing clothing);
	
	int countListClothingEdit(Clothing clothing);
	
	int insertClothing(Clothing clothing);
	
	int insertClothingLink(Clothing clothing);
	
	Clothing selectByClothing(Clothing clothing);
	
	int countProduct(Product product); 
	
	int countProductT(Product product); 
	
	int countClothing(Clothing clothing); 
	/**
	 * ��ѯ��Ʒ��ϸ
	* <p>Title: detailProduct</p>  
	* <p>Description: </p>  
	* @author fenghaifeng  
	* @date 2018��4��2��
	 */
	Product detailProduct(Product product);
	
	int saveCheck(HttpServletRequest request,Stock stock);
	
	int saveClothingEdit(Clothing clothing);
	
	void deleteClothingEdit(Clothing clothing);
	
	List<Sample> listSample(Sample sample);
	
	int countListSample(Sample sample);
	
	List<Sample> getListByIds(Integer[] list);
	
	List<Sample> getListByStrings(String[] list);
	
	List<Sample> getCardListByStrings(Integer[] id);
	
	List<Sample> getListPByStrings(String[] list);
	
	int deleteSample(Integer[] list);
	
	Map<String, Object> submitSample(HttpServletRequest request,Integer[] list);
	
	Product selectProduct(Product product);
	
	ProductDetail  getProductDetailById(Product product);
	
	List<ProductDetail>  getProductLYMById(Product product);
	
	List<Stock>  getStockBySJM(Stock stock);
	
	List<Stock>  getStockYSBySJM(Stock stock);
	
	List<Stock>  countgetStockBySJM(Stock stock);
}
