package com.lin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lin.domain.User;
import com.lin.service.UserService;

@Controller 
@RequestMapping("login")
public class LoginController {
	 	@Resource  
	    private UserService userService;  
	      
	    @RequestMapping("/")    
	    public String login() {
			return "login";
		}
	    
	    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
		@ResponseBody
		public Map<String, Object> doLogin(User user, HttpServletRequest request) {
			Map<String, Object> map = new HashMap<String, Object>();
			if (user.getUserID() == null || "".equals(user.getUserID()) || user.getPassword() == null
					|| "".equals(user.getPassword())) {
				map.put("returnCode", "-1");
				map.put("msg", "用户名密码不能为空！");
				return map;
			}
			int returnCode = userService.doLogin(user, request);
			if(returnCode!=0) {
				map.put("returnCode", "-1");
				map.put("msg", "用户名密码错误！");
				return map; 
			}
			map.put("returnCode", returnCode);
			return map;
		}
}
