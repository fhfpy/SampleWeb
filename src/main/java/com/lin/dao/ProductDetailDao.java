package com.lin.dao;

import java.util.List;

import com.lin.domain.Product;
import com.lin.domain.ProductDetail;
import com.lin.domain.Stock;

public interface ProductDetailDao {
	public ProductDetail getProductDetailById(Product product);
	
	public List<ProductDetail> getProductLYMById(Product product);
}
