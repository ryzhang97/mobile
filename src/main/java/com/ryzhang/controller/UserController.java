package com.ryzhang.controller;

import com.google.gson.Gson;
import com.ryzhang.service.IUserService;
import com.ryzhang.entity.UserEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("user")
public class UserController {
    @Resource
    HttpServletRequest request;
    @Resource
    private IUserService userService;

    @RequestMapping("/getuserInfo")
    @ResponseBody
    public String getUser() {
        Integer id=Integer.parseInt(request.getParameter("id"));
        UserEntity userEntity=userService.getUser(id);

        return  new Gson().toJson(userEntity);
    }
}
