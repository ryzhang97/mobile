package com.ryzhang.controller;

import com.google.gson.Gson;
import com.ryzhang.service.IUserService;
import com.ryzhang.entity.UserEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@Controller
@RequestMapping("user")
public class UserController {
    @Resource
    HttpServletRequest request;
    @Resource
    private IUserService userService;

    @RequestMapping("/getUserInfo")
    @ResponseBody
    public String getUser() {
        Integer id = Integer.parseInt(request.getParameter("id"));
        UserEntity userEntity = userService.getUser(id);
        HashMap<String,UserEntity> map= new HashMap<>();
        map.put("user",userEntity);
        return new Gson().toJson(map);
    }

    @RequestMapping("/addUser")
    @ResponseBody
    public String addUser() {
        int id = Integer.parseInt(request.getParameter("id"));
        String name = request.getParameter("name");
        UserEntity userEntity = new UserEntity(id, name);
        int count = userService.addUser(userEntity);
        return "{count:" + count + "}";
    }

}
