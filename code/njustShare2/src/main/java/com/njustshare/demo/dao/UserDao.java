package com.njustshare.demo.dao;

import com.njustshare.demo.entity.User;

public interface UserDao {
    void insert(User user);
    void update(User user);
    User getMyInfo(String openid);
    String isRegister(String openid);
}
