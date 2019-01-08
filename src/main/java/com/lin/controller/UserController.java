package com.lin.controller;  
  
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lin.service.UserService;  
  
/** 
 * 功能概要：UserController 
 *  
 * @author fenghaifeng 
 * @since  2018年3月19日  
 */  
@Controller 
public class UserController {  
    @Resource  
    private UserService userService;  
      
    @RequestMapping("/")    
    public String login() {
		return "index";
	}
}