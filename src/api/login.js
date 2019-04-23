// import { getMobileCode } from "../../../heimatoutiaopc-master/src/api/login";

// 获取axios实例
import request from '@/utils/request'
import { setUser } from '@/utils/store'
// 获取短信验证码    用户认证  人机验证码
import  { API_GETPHONECODE , API_USERAUTH , API_CAPTCHAS }  from '@/constants/api'

// 根据手机号和验证码登陆
export function loginByUsername(mobile, code) {
    var data = {
        mobile, code
    }
    return request({
        url: API_USERAUTH,
        method: 'post',
        data: data
    }).then(result => {
        // alert(JSON.stringify(result))
        // 设置个人数据
        setUser(result)
        return result
    })
}

// mobile:手机号
// params:这个参数是一个对象，里面需要有三个参数：challenge   validate   seccode
export function getMobileCode(mobile, params) {
    //获取短信验证码
    return request({
        url: API_GETPHONECODE + mobile,
        method: 'get',
        params
    })

}
//获取人机验证码
export function getCaptchas(mobile) {
    return request({
        url: API_CAPTCHAS + mobile,
        method: 'get'
    })
}