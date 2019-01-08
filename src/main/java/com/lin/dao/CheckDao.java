package com.lin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.lin.domain.CardB;
import com.lin.domain.CardH;
import com.lin.domain.Product;
import com.lin.domain.Sample;

public interface CheckDao {
	public List<Sample> listSample(Sample sample);
	
	public int countListSample(Sample sample);
	
	public List<Sample> getListByIds(Integer[] list);
	
	public List<Sample> getListByStrings(String[] list);
	
	public List<Sample> getCardListByStrings(Integer[] list);
	
	public List<Sample> getListPByStrings(String[] list);
	
	public List<Sample> getStockBySJM(Integer[] list);
	
	public int deleteSample(Integer[] list);
	
	public Sample selectSampleById(Product product);
	
	public int saveCardH(CardH cardH);
	
	public int saveCardB(CardB cardB);
	
	public int getMaxCardHId();
	
	public int updateSample(Sample sample);
	
	public int getMaxDocumentsCode(@Param("nd")String nd,@Param("yf")String yf);
	
	public void updateMaxDJH(@Param("nd")String nd,@Param("yf")String yf);
}
