package com.ryzhang.service;

import com.ryzhang.dao.IUserDao;
import com.ryzhang.entity.UserEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service("userService")
public class UserServiceImpl implements IUserService {
    @Resource
    private IUserDao userDao;

    public UserEntity getUser(int id) {
        return userDao.getUser(id);
    }

    @Override
    public int addUser(UserEntity userEntity) {
        return userDao.addUser(userEntity);
    }
}
