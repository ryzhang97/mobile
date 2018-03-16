package com.ryzhang.dao;

import com.ryzhang.entity.UserEntity;

public interface IUserDao {
    UserEntity getUser(int id);
}
