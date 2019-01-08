package com.lin.domain;

import java.math.BigDecimal;

public class TechnologyDetail extends  Technology{ 
	 
	 private int DjBth;  
	 
	 private int BNumber;  
	 
	 private int Line;  

	 private String JWFL;
	 
	 private String JWSX;
	 
	 private String WPMC;
	 
	 private String ND;
	 
	 private String NX;
	 
	 private BigDecimal YL;
	 
	 private BigDecimal Price;
	 
	 private BigDecimal Amount;
	 
	 private String BMEMO;
	 
	 private String lystr;
	 
	 private String sx;


	public String getSx() {
		return sx;
	}

	public void setSx(String sx) {
		this.sx = sx;
	}

	public int getBNumber() {
		return BNumber;
	}

	public void setBNumber(int bNumber) {
		BNumber = bNumber;
	}

	public int getLine() {
		return Line;
	}

	public void setLine(int line) {
		Line = line;
	}

	public String getLystr() {
		return lystr;
	}

	public void setLystr(String lystr) {
		this.lystr = lystr;
	}

	public int getDjBth() {
		return DjBth;
	}

	public void setDjBth(int djBth) {
		DjBth = djBth;
	}

	public String getJWFL() {
		return JWFL;
	}

	public void setJWFL(String jWFL) {
		JWFL = jWFL;
	}

	public String getJWSX() {
		return JWSX;
	}

	public void setJWSX(String jWSX) {
		JWSX = jWSX;
	}

	public String getWPMC() {
		return WPMC;
	}

	public void setWPMC(String wPMC) {
		WPMC = wPMC;
	}

	public String getND() {
		return ND;
	}

	public void setND(String nD) {
		ND = nD;
	}

	public String getNX() {
		return NX;
	}

	public void setNX(String nX) {
		NX = nX;
	}

	public BigDecimal getYL() {
		return YL;
	}

	public void setYL(BigDecimal yL) {
		YL = yL;
	}

	public BigDecimal getPrice() {
		return Price;
	}

	public void setPrice(BigDecimal price) {
		Price = price;
	}

	public BigDecimal getAmount() {
		return Amount;
	}

	public void setAmount(BigDecimal amount) {
		Amount = amount;
	}

	public String getBMEMO() {
		return BMEMO;
	}

	public void setBMEMO(String bMEMO) {
		BMEMO = bMEMO;
	}
} 