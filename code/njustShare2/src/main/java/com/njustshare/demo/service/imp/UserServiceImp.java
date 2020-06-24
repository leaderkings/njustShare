package com.njustshare.demo.service.imp;

import com.njustshare.demo.dao.UserDao;
import com.njustshare.demo.entity.FileInfo;
import com.njustshare.demo.entity.User;
import com.njustshare.demo.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImp implements UserService {
    @Resource
    UserDao userDao;

    @Override
    public void insert(User user){
        userDao.insert(user);
    }

    @Override
    public void update(User user) {
        userDao.update(user);
    }

    @Override
    public User getMyInfo(String openid) {
        return userDao.getMyInfo(openid);
    }

    @Override
    public String isRegister(String openid) {
        String temp = userDao.isRegister(openid);
        if (temp == null) {
            temp = "no";
        }
        return temp;
    }
}
