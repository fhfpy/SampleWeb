package com.lin.interceptor;

import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
import javax.servlet.http.HttpSession;  
  
import org.springframework.web.servlet.HandlerInterceptor;  
import org.springframework.web.servlet.ModelAndView;

import com.lin.domain.User;  
/** 
 * ��¼��֤�������� 
 */  
public class Interceptor implements HandlerInterceptor{  
  
    /** 
     * Handlerִ�����֮������������ 
     */  
    public void afterCompletion(HttpServletRequest request,  
            HttpServletResponse response, Object handler, Exception exc)  
            throws Exception {  
          
    }  
  
    /** 
     * Handlerִ��֮��ModelAndView����֮ǰ����������� 
     */  
    public void postHandle(HttpServletRequest request, HttpServletResponse response,  
            Object handler, ModelAndView modelAndView) throws Exception {  
    }  
  
    /** 
     * Handlerִ��֮ǰ����������� 
     */  
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,  
            Object handler) throws Exception {   
        User user = (User)request.getSession().getAttribute("user");  
        if(user==null||user.getUserID()==null){
			response.sendRedirect("/ssm_project/login/");
			return false;
		}
		return true; 
    }  
  
} 