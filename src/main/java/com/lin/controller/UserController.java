package com.lin.controller;  
  
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lin.service.UserService;  
  
/** 
 * ���ܸ�Ҫ��UserController 
 *  
 * @author fenghaifeng 
 * @since  2018��3��19��  
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