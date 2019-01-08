package com.lin.domain;

import java.math.BigDecimal;
import java.util.Date;

public class Sample extends Page {
	public int sampleId;
	
	public String userId;
	
	public int state;
	
	public Date date;

	public String SJM;
	
	public String CKMC;
	
	public Date OccurDate;
	
	public String DepName;
	
	public String HW;
	
	public String YS;
	
	public BigDecimal SL;
	
	public BigDecimal HWSL;
	
	public String GG;
	
	public String MS;
	
	public String KZ;
	
	public String MD;
	
	public String MF;
	
	public String CFJX;
	
	public String CF;
	
	public String ZXPBCB;
	
	public String ZXMLCB;
	
	public String ZXKSCB;
	
	public String ZXRSCB;
	
	public String BKZW;
	
	public String HKWZ;
	
	public String JG;
	
	public String BZ;
	
	public String LYM;
	
	public String GYSMC;
	
	public String YGSL;
	
	public String ypck; 
	
	public BigDecimal ypsl;
	
	public String cpck;
	
	public BigDecimal cpsl;
	
	public BigDecimal DQKC;
	
	public String YDJH;
	
	public BigDecimal getDQKC() {
		return DQKC;
	}

	public void setDQKC(BigDecimal dQKC) {
		DQKC = dQKC;
	}

	public String getYDJH() {
		return YDJH;
	}

	public void setYDJH(String yDJH) {
		YDJH = yDJH;
	}

	public BigDecimal getYpsl() {
		return ypsl;
	}

	public void setYpsl(BigDecimal ypsl) {
		this.ypsl = ypsl;
	}

	public BigDecimal getCpsl() {
		return cpsl;
	}

	public void setCpsl(BigDecimal cpsl) {
		this.cpsl = cpsl;
	}

	public String getYpck() {
		return ypck;
	}

	public void setYpck(String ypck) {
		this.ypck = ypck;
	}

	public String getCpck() {
		return cpck;
	}

	public void setCpck(String cpck) {
		this.cpck = cpck;
	}

	public String getZXRSCB() {
		return ZXRSCB;
	}

	public void setZXRSCB(String zXRSCB) {
		ZXRSCB = zXRSCB;
	}

	public String getYGSL() {
		return YGSL;
	}

	public void setYGSL(String yGSL) {
		YGSL = yGSL;
	}

	public String getLYM() {
		return LYM;
	}

	public void setLYM(String lYM) {
		LYM = lYM;
	}

	public String getGYSMC() {
		return GYSMC;
	}

	public void setGYSMC(String gYSMC) {
		GYSMC = gYSMC;
	}

	public BigDecimal getHWSL() {
		return HWSL;
	}

	public void setHWSL(BigDecimal hWSL) {
		HWSL = hWSL;
	}

	public String getGG() {
		if(GG==null) {
			return "";
		}
		return GG;
	}

	public void setGG(String gG) {
		GG = gG;
	}

	public String getMS() {
		if(MS==null) {
			return "";
		}
		return MS;
	}

	public void setMS(String mS) {
		MS = mS;
	}

	public String getKZ() {
		return KZ;
	}

	public void setKZ(String kZ) {
		KZ = kZ;
	}

	public String getMD() {
		return MD;
	}

	public void setMD(String mD) {
		MD = mD;
	}

	public String getMF() {
		return MF;
	}

	public void setMF(String mF) {
		MF = mF;
	}

	public String getCFJX() {
		return CFJX;
	}

	public void setCFJX(String cFJX) {
		CFJX = cFJX;
	}

	public String getCF() {
		return CF;
	}

	public void setCF(String cF) {
		CF = cF;
	}

	public String getZXPBCB() {
		return ZXPBCB;
	}

	public void setZXPBCB(String zXPBCB) {
		ZXPBCB = zXPBCB;
	}

	public String getZXMLCB() {
		return ZXMLCB;
	}

	public void setZXMLCB(String zXMLCB) {
		ZXMLCB = zXMLCB;
	}

	public String getZXKSCB() {
		return ZXKSCB;
	}

	public void setZXKSCB(String zXKSCB) {
		ZXKSCB = zXKSCB;
	}

	public String getBKZW() {
		return BKZW;
	}

	public void setBKZW(String bKZW) {
		BKZW = bKZW;
	}

	public String getHKWZ() {
		return HKWZ;
	}

	public void setHKWZ(String hKWZ) {
		HKWZ = hKWZ;
	}

	public String getJG() {
		return JG;
	}

	public void setJG(String jG) {
		JG = jG;
	}

	public String getBZ() {
		return BZ;
	}

	public void setBZ(String bZ) {
		BZ = bZ;
	}

	public int getSampleId() {
		return sampleId;
	}

	public void setSampleId(int sampleId) {
		this.sampleId = sampleId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getSJM() {
		return SJM;
	}

	public void setSJM(String sJM) {
		SJM = sJM;
	}

	public String getCKMC() {
		return CKMC;
	}

	public void setCKMC(String cKMC) {
		CKMC = cKMC;
	}

	public Date getOccurDate() {
		return OccurDate;
	}

	public void setOccurDate(Date occurDate) {
		OccurDate = occurDate;
	}

	public String getDepName() {
		return DepName;
	}

	public void setDepName(String depName) {
		DepName = depName;
	}

	public String getHW() {
		return HW;
	}

	public void setHW(String hW) {
		HW = hW;
	}

	public String getYS() {
		return YS;
	}

	public void setYS(String yS) {
		YS = yS;
	}

	public BigDecimal getSL() {
		if(SL==null) {
			return new BigDecimal("0");
		}
		return SL;
	}

	public void setSL(BigDecimal sL) {
		SL = sL;
	}
}
