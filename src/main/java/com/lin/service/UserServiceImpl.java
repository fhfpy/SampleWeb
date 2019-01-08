package com.lin.service;  
  
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lin.dao.SysDao;
import com.lin.dao.UserDao;
import com.lin.domain.User;
  
/** 
 * ���ܸ�Ҫ��UserServiceʵ���� 
 *  
 * @author linbingwen 
 * @since  2015��9��28��  
 */  
@Service  
public class UserServiceImpl implements UserService{  
    @Autowired  
    private UserDao userDao; 
    @Autowired
    private SysDao sysDao; 
  
    public List<User> selectUserById(Integer userId) {  
        return userDao.selectUserById(userId);  
          
    }
    
    public User selectSysById(Integer userId) {  
        return sysDao.getSysName(userId);  
          
    }
    
    @Override
	public int doLogin(User user,HttpServletRequest request) {
		User dbUser = userDao.getUserById(user.getUserID());
		if (dbUser == null) {
		}
		// 鍒ゆ柇甯愬彿瀵嗙爜鏄惁鍖归厤
		if (user.getPassword().equals(dbUser.getPassword())) {
			request.getSession().setAttribute("user", dbUser);
			request.getSession().setMaxInactiveInterval(60*60*8);
			return 0;
		} else {
			return -1;
		}
	}
  
} 