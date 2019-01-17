package com.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.demo.domain.User;
@Mapper 
public interface UserMapper {
    
    List<User> getAll();
     
    User getOne(Long id);
 
    void insert(User user);
 
    void update(User user);
 
    void delete(Long id);
 
}
