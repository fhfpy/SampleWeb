package com.lin.service;  
  
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lin.domain.User;  
  
/** 
 * ���ܸ�Ҫ��UserService�ӿ��� 
 *  
 * @author linbingwen 
 * @since  2015��9��28��  
 */  
public interface UserService {  
    List<User> selectUserById(Integer userId);  
    
    User selectSysById(Integer id);
    
    int doLogin(User user, HttpServletRequest request);
}  