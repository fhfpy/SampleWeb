package com.lin.domain;

import java.math.BigDecimal;
import java.util.Date;

public class Stock extends Page {
	public String CKMC;//仓库名称
	public String DepName;//部门名称
	public String SJM;//随机码
	public String HW;//货位
	public String YS;//颜色
	public String Notes;//备注
	public BigDecimal SL;//数量
	public Date OccurDate;//入库时间
	public BigDecimal HWSL;//库存数量
	public String getNotes() {
		return Notes;
	}
	public void setNotes(String notes) {
		Notes = notes;
	}
	public BigDecimal getHWSL() {
		return HWSL;
	}
	public void setHWSL(BigDecimal hWSL) {
		HWSL = hWSL;
	}
	public BigDecimal getSL() {
		return SL;
	}
	public void setSL(BigDecimal sL) {
		SL = sL;
	}
	public Date getOccurDate() {
		return OccurDate;
	}
	public void setOccurDate(Date occurDate) {
		OccurDate = occurDate;
	}
	public String getCKMC() {
		return CKMC;
	}
	public void setCKMC(String cKMC) {
		CKMC = cKMC;
	}
	public String getDepName() {
		return DepName;
	}
	public void setDepName(String depName) {
		DepName = depName;
	}
	public String getSJM() {
		return SJM;
	}
	public void setSJM(String sJM) {
		SJM = sJM;
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
}
