package com.lin.dao;

import java.util.List;

import com.lin.domain.Stock;

public interface StockDao {

	public List<Stock> getStockBySJM(Stock stock);
	
	public List<Stock> getStockYSBySJM(Stock stock);
	
	public List<Stock> countgetStockBySJM(Stock stock);
}
