package com.lin.service;

import java.util.List;

import com.lin.domain.TechnologyDetail;

public interface TechnologyService {
	List<TechnologyDetail> listTechnology(TechnologyDetail technology); 
	
	List<TechnologyDetail> listTechnologyByPBMC(TechnologyDetail technology); 
	
	void updateTechnology(TechnologyDetail technology);
	
	TechnologyDetail getTechnologyByName(TechnologyDetail technology);
}
