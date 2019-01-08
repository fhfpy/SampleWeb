package com.lin.domain;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class Product extends Page implements Serializable , Cloneable {
	public int DjLsh;
	public String SJM;
	public String GG;
	public String MD;
	public BigDecimal KZ;
	public BigDecimal MF;
	public String CF;
	public String MS;
	public BigDecimal kzmin;
	public BigDecimal kzmax;
	public BigDecimal ypmin;
	public BigDecimal ypmax;
	public BigDecimal ykmin;
	public BigDecimal ykmax;
	public BigDecimal Qty;
	public String GYSMC;
	public String LYM;
	public String DepName;
	public String cfjq;
	public String cfbl;
	public String JDRQKS;
	public String JDRQJS;
	public String HKKW;
	public String getHKKW() {
		return HKKW;
	}
	public void setHKKW(String hKKW) {
		HKKW = hKKW;
	}
	public BigDecimal getQty() {
		return Qty;
	}
	public void setQty(BigDecimal qty) {
		Qty = qty;
	}
	public String getJDRQKS() {
		return JDRQKS;
	}
	public void setJDRQKS(String jDRQKS) {
		JDRQKS = jDRQKS;
	}
	public String getJDRQJS() {
		return JDRQJS;
	}
	public void setJDRQJS(String jDRQJS) {
		JDRQJS = jDRQJS;
	}
	public String getCfbl() {
		return cfbl;
	}
	public void setCfbl(String cfbl) {
		this.cfbl = cfbl;
	}
	public String getDepName() {
		return DepName;
	}
	public void setDepName(String depName) {
		DepName = depName;
	}
	@Override
	    public boolean equals(Object obj)
	    {
	        if (obj == null)
	        {
	            return false;
	        }
	        return SJM == null ? false : this.SJM.equals(((Product) obj).getSJM());
	    }
	public String getGYSMC() {
		return GYSMC;
	}
	public String getLYM() {
		return LYM;
	}
	public void setLYM(String lYM) {
		LYM = lYM;
	}
	public String getCfjq() {
		return cfjq;
	}
	public void setCfjq(String cfjq) {
		this.cfjq = cfjq;
	}
	public void setGYSMC(String gYSMC) {
		GYSMC = gYSMC;
	}
	public BigDecimal getYpmax() {
		return ypmax;
	}
	public void setYpmax(BigDecimal ypmax) {
		this.ypmax = ypmax;
	}
	public BigDecimal getYpmin() {
		return ypmin;
	}
	public void setYpmin(BigDecimal ypmin) {
		this.ypmin = ypmin;
	}
	public BigDecimal getYkmin() {
		return ykmin;
	}
	public void setYkmin(BigDecimal ykmin) {
		this.ykmin = ykmin;
	}
	public BigDecimal getYkmax() {
		return ykmax;
	}
	public void setYkmax(BigDecimal ykmax) {
		this.ykmax = ykmax;
	}
	public BigDecimal getKzmin() {
		return kzmin;
	}
	public void setKzmin(BigDecimal kzmin) {
		this.kzmin = kzmin;
	}
	public BigDecimal getKzmax() {
		return kzmax;
	}
	public void setKzmax(BigDecimal kzmax) {
		this.kzmax = kzmax;
	}
	public String getMS() {
		return MS;
	}
	public void setMS(String mS) {
		MS = mS;
	}
	public int getDjLsh() {
		return DjLsh;
	}
	public void setDjLsh(int djLsh) {
		DjLsh = djLsh;
	}
	public String getSJM() {
		return SJM;
	}
	public void setSJM(String sJM) {
		SJM = sJM;
	}
	public String getGG() {
		return GG;
	}
	public void setGG(String gG) {
		GG = gG;
	}
	public String getMD() {
		return MD;
	}
	public void setMD(String mD) {
		MD = mD;
	}
	public BigDecimal getKZ() {
		return KZ;
	}
	public void setKZ(BigDecimal kZ) {
		KZ = kZ;
	}
	public BigDecimal getMF() {
		return MF;
	}
	public void setMF(BigDecimal mF) {
		MF = mF;
	}
	public String getCF() {
		return CF;
	}
	public void setCF(String cF) {
		CF = cF;
	}
	public Object clone()
    {
        Object obj = null;
        try
        {
            obj = super.clone();
        } catch (CloneNotSupportedException e) 
        {
            System.out.println(e.toString());
        }
        return obj;
    }
}
