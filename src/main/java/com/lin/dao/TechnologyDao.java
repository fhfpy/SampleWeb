package com.lin.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.lin.domain.TechnologyDetail;
import com.lin.domain.User;

public interface TechnologyDao {
	public void insertTechnology(TechnologyDetail technologyDetail);
	
	public List<TechnologyDetail> listTechnology(TechnologyDetail technologyDetail);
	
	public List<TechnologyDetail> listTechnologyByPBMC(TechnologyDetail technologyDetail);
	
	public void updateTechnology(TechnologyDetail technologyDetail);
	
	public TechnologyDetail getTechnologyByName(TechnologyDetail technologyDetail);
	
	public TechnologyDetail getPyxxkByName(TechnologyDetail technologyDetail);
	
	public int getYpxxkMaxId();
	
	public int getMaxId();
	
	public String getHphmStart(String hphm);
	
	public String getMaxHphm();
	
	public void updateMaxDJH(@Param("nd")String nd,@Param("yf")String yf);
	
	public void saveYpxxk(@Param("DjLsh")int DjLsh,@Param("HPHM")String HPHM,@Param("LYM")String LYM,@Param("JDRID")String JDRID,@Param("JDR")String JDR,@Param("JDRQ")Date JDRQ);
	
	public int getMaxDocumentsCode(@Param("nd")String nd,@Param("yf")String yf);
	
	public void insertTechnologyDetail(TechnologyDetail technologyDetail);
	
	public void deleteDetali(TechnologyDetail technologyDetail);
	
	public TechnologyDetail getUtdById(User user);
	
	public List<TechnologyDetail> listPBMC();
	
	public List<TechnologyDetail> listSX();
	
}
