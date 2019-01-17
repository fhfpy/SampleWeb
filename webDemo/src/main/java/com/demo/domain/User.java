package com.demo.domain;

public class User{
    private int id;
    private String userName;
    private String passWord;
    private String nickName;
    @Override
    public String toString() {
    	return "userName:"+userName+"  passWord:"+passWord+"  nickName:"+nickName;
    }
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
    
 
}

