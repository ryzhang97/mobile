package com.ryzhang.service;

import com.ryzhang.entity.UserEntity;

public interface IUserService {
    UserEntity getUser(int id);
    int addUser(UserEntity userEntity);
}
