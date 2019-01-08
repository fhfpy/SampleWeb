package com.lin.dao;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
@WebListener
public class onLineCount implements HttpSessionListener {
	
	public int count=0;
	public int maxCount=0;
	@Override
    public void sessionCreated(HttpSessionEvent arg0) {
        count++;
        if(count>maxCount) {
        	maxCount=count;
        	arg0.getSession().getServletContext().setAttribute("MaxCount", maxCount);
        }
        arg0.getSession().getServletContext().setAttribute("Count", count);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent arg0) {
        count--;
        arg0.getSession().getServletContext().setAttribute("Count", count);
    }
}
