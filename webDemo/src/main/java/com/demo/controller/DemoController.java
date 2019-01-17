package com.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.domain.User;
import com.demo.servers.UserServers;

@Controller
@RequestMapping("/demo")
public class DemoController {
	@Autowired
	public UserServers userServers;
	
	@RequestMapping(value="/login",method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> login() {
		Map<String, Object> map = new ConcurrentHashMap<>();
		List<User> list = userServers.getAll();
		map.put("user", list);
		return map;
	}
	
	@RequestMapping("/index")
    public String index() {
        return "index";
    }
	
	@RequestMapping("/log")
    public String log() {
        return "login";
    }
}
