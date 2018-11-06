var Mock = require('mockjs');
//检查用户登录状态
var get_user_info = {
    "status": 0,
    "data": {
        "id": 13,
        "username": "admin18",
        "email": "11111@qq.com",
        "phone": "13911111111",
        "role": 0,
        "createTime": 123456789,
        "updateTime": 12345678912
    }
}
Mock.mock('/user/get_user_info.do','post',get_user_info);
//获取登录用户的详细信息
var get_information = {
    "status": 0,
    "data": {
        "id": 1,
        "username": "admin18",
        "password": "123456",
        "email": "11111@qq.com",
        "phone": "13911111111",
        "question": "我的名字是？",
        "answer": "admin18",
        "role": 1,
        "createTime": 1478422605000,
        "updateTime": 1491305256000
    }
}
Mock.mock('/user/get_information.do','post',get_information);
//登录状态下更新密码
var reset_password = {
    "status": 0,
    "msg": "修改密码成功"
}
Mock.mock('/user/reset_password.do','post',reset_password);
