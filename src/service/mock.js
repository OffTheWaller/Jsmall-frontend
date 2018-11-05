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
