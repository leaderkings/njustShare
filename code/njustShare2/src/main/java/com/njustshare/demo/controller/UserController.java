package com.njustshare.demo.controller;

import com.njustshare.demo.entity.User;
import com.njustshare.demo.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    public Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    UserService userService;

    @PostMapping(value = "/newUser")
    public void newUser(HttpServletRequest request)throws IOException {
        logger.info(request.getParameter("openid"));

        request.setCharacterEncoding("utf8");
        User user = new User();
        user.setOpenID(request.getParameter("openid"));
        user.setSchoolNum(request.getParameter("schoolNum"));
        user.setRealName(request.getParameter("name"));
        user.setCollege(request.getParameter("college"));
        user.setPhone(request.getParameter("phone"));
        logger.info(user.realName);
        userService.insert(user);
    }
    @GetMapping("/myInfo")
    public Map<String,Object> getMyInfo(@Param("openid")String openid){
        Map<String,Object> map = new HashMap<String,Object>();
        User user = new User();
        user=userService.getMyInfo(openid);
        map.put("info",user);
        return map;
    }
    @PostMapping("/updateInfo")
    public void updateInfo(HttpServletRequest request)throws IOException{
        request.setCharacterEncoding("utf8");

        User user = new User();
        user.setOpenID(request.getParameter("openid"));
        user.setSchoolNum(request.getParameter("schoolNum"));
        user.setRealName(request.getParameter("name"));
        user.setCollege(request.getParameter("college"));
        user.setPhone(request.getParameter("phone"));

        logger.info(user.toString());
        userService.update(user);
    }
    @GetMapping("/isRegister")
    public String isRegister(@Param("openid")String openid){
        String result= userService.isRegister(openid);
        logger.info(result);
        return result;
    }
}
