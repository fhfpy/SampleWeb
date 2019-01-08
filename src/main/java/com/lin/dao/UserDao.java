package com.lin.dao;  
  
  
import java.util.List;

import com.lin.domain.User;  
  
/** 
 * ���ܸ�Ҫ��User��DAO�� 
 *  
 * @author linbingwen 
 * @since 2015��9��28�� 
 */  
public interface UserDao {  
    /** 
     *  
     * @author linbingwen 
     * @since 2015��9��28�� 
     * @param userId 
     * @return 
     */  
    public List<User> selectUserById(Integer userId);
    
    public User UserById(Integer pageId);
    
    User getUserById(String userId);
  
}  