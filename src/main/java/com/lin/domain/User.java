package com.lin.domain;  

public class User {  
    private String UserID;  
    
    private String UserName;  

	private String Password;
	
	private String DepartmentCode;
	
	private String DepartmentName;

	public String getDepartmentCode() {
		return DepartmentCode;
	}

	public void setDepartmentCode(String departmentCode) {
		DepartmentCode = departmentCode;
	}

	public String getDepartmentName() {
		return DepartmentName;
	}

	public void setDepartmentName(String departmentName) {
		DepartmentName = departmentName;
	}

	public String getUserID() {
		return UserID;
	}

	public void setUserID(String userID) {
		UserID = userID;
	}

	public String getUserName() {
		return UserName;
	}

	public void setUserName(String userName) {
		UserName = userName;
	}

	public String getPassword() {
		return Password;
	}

	public void setPassword(String password) {
		Password = password;
	}
} 