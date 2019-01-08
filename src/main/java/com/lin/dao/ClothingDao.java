package com.lin.dao;

import java.util.List;

import com.lin.domain.Clothing;

public interface ClothingDao {
	public List<Clothing> listClothing(Clothing clothing);
	
	public Clothing clothingDetail(Clothing clothing);
	
	public int countClothing(Clothing clothing);
	
	public List<Clothing> listPosition(Clothing clothing);
	
	public List<Clothing> listClothingEdit(Clothing clothing);
	
	public int saveClothing(Clothing clothing);
	
	public void saveClothingEdit(Clothing clothing);
	
	public void deleteClothingEdit(Clothing clothing);
	
	public int countListClothingEdit(Clothing clothing);
	
	public int insertClothing(Clothing clothing);
	
	public int insertClothingLink(Clothing clothing);
	
	public Clothing selectByClothing(Clothing clothing);
}
