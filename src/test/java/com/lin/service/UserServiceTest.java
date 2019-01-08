package com.lin.service;

import org.junit.Test;

public class UserServiceTest implements Runnable{  
      
    private String name ;   
    public UserServiceTest(){  
          
    }  
  
    public UserServiceTest(String name){  
        this.name = name;  
    }  
    @Override  
    public void run() {  
        // TODO Auto-generated method stub  
        for(int i =0;i <5 ;i++){  
            System.out.println(name +"运行"+i);  
        }  
          
    }  
    @Test
    public static void main(String[] args){  
    	UserServiceTest h1 = new UserServiceTest("线程A");  
        Thread demo = new Thread(h1);  
        UserServiceTest h2 = new UserServiceTest("线程B");  
        Thread demo1 = new Thread(h2);  
        demo.start();  
        demo1.start();  
    }  
  
} 