package com.lin.domain;

import java.util.Date;

public class Page {

	private String createUser;

	private Date createTime;

	private Integer updateUser;

	private Date updateTime;

	private Integer page;

	private Integer rows;

	private Integer start;

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Integer getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(Integer updateUser) {
		this.updateUser = updateUser;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getRows() {
		return rows;
	}

	public void setRows(Integer rows) {
		this.rows = rows;
	}

	public Integer getStart() {
		if(page == null || "".equals(page)){
			return start;
		}
		if (page == 0) {
			page = 1;
		}
		start = (page - 1) * rows;
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}
}
