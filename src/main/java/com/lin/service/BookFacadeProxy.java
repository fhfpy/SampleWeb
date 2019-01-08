package com.lin.service;

import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.lang.reflect.InvocationHandler;

public class BookFacadeProxy implements InvocationHandler {
	
		private Object target;
		
		public Object bind(Object target) {
			this.target=target;
			return Proxy.newProxyInstance(target.getClass().getClassLoader(), target.getClass().getInterfaces(), this);
		}
		
		public Object invoke(Object proxy,Method method,Object[] args) throws Throwable {
			Object result = null;
			System.out.println("开始前");
			result = method.invoke(target, args);
			System.out.println("结束后");
			return result;
		}
	 /*private Object target;
	 
	 public Object bind(Object target) {
		 this.target = target;
		 return Proxy.newProxyInstance(target.getClass().getClassLoader(), target.getClass().getInterfaces(), this);
	 }
	 
	 public Object invoke(Object proxy, Method method, Object[] args)  throws Throwable {
		 Object result = null;
		 System.out.println("增加前");
		 result=method.invoke(target, args);  
		 System.out.println("增加后");
		 return result;
	 }*/
}
