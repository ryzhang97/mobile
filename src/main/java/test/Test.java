package test;

import com.ryzhang.entity.UserEntity;

public class Test {
    public static void main(String[] args){
        UserEntity userEntity=new UserEntity(1,"1");
        System.out.println(userEntity.getId());
        test1(userEntity);
        System.out.println(userEntity.getId());
//        String str="1";
//        System.out.println(str);
//        test2(str);
//        System.out.println(str);
    }
    public static void test1(UserEntity userEntity){
        userEntity.setId(2);
    }
    public static void test2(String str){
        str="2";
    }
}
