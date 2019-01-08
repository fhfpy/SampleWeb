package com.lin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lin.dao.TechnologyDao;
import com.lin.domain.TechnologyDetail;

@Service
public class TechnologyServiceImpl implements TechnologyService {
	
	@Autowired  
    private TechnologyDao technologyDao;
	
	public List<TechnologyDetail> listTechnology(TechnologyDetail technologyDetail){
		return technologyDao.listTechnology(technologyDetail);
	}
	
	public List<TechnologyDetail> listTechnologyByPBMC(TechnologyDetail technologyDetail){
		return technologyDao.listTechnologyByPBMC(technologyDetail);
	}
	
	public void updateTechnology(TechnologyDetail technologyDetail) {
		technologyDao.updateTechnology(technologyDetail);
	}
	
	public TechnologyDetail getTechnologyByName(TechnologyDetail technologyDetail) {
		return technologyDao.getTechnologyByName(technologyDetail);
	}
}
