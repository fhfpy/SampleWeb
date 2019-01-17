package com.demo.serversimps;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.domain.User;
import com.demo.mapper.UserMapper;
import com.demo.servers.UserServers;
@Service
public class UserServersImp implements UserServers {
	
	@Autowired
	UserMapper userMapper;
	
	public List<User> getAll(){
		return userMapper.getAll();
	}
}
