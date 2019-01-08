package com.lin.dao;

import java.util.List;

import com.lin.domain.Pic;
import com.lin.domain.Product;
import com.lin.domain.Sample;

public interface SampleDao {
	
	public List<Product> listProduct(Product product);
	
	public List<Product> listProductT(Product product);
	
	public String selectSjmByLym(String str);
	
	public int countProduct(Product product);
	
	public int countProductT(Product product);
	
	public Product detailProduct(Product product);
	
	public void saveCheck(Sample sample);
	
	public void insertTechnology(String str);
	
	public Product selectSample(Product product);
	
	public void savepic(Pic p);
	
	public List<Product> listStrPics();
	
}
