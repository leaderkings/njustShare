package com.njustshare.demo.service;

import com.njustshare.demo.entity.User;

public interface UserService {
    void insert(User user);
    void update(User user);
    User getMyInfo(String openid);
    String isRegister(String openid);
}
