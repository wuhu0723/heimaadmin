import { USER_KEY} from '@/constants/user.js'
import emmiter from '@/utils/event.js'

export function setStore (key,value){
    if(!key){
        return
    }
    if(value){
        value = (typeof value) !== 'string' ? JSON.stringify(value) : value
    }
    localStorage.setItem(key,value)
}
export function getStore (key){
    if(!key){
        return
    }
    var data = localStorage.getItem(key)
    if(data){
        data = JSON.parse(data)
    }
    return data
}
export function clearStore (key){
    if(!key){
        return
    }
    localStorage.removeItem(key)
}


// 之前的方法是存储用户基本信息，但是如果用户登陆之后，还需要再存储token数据
// 原因是用户资料接口并没有token数据，所以在登陆之后，需要将两者数据进行合并存储
export function setUser(value){
    let old = getStore(USER_KEY)
    setStore(USER_KEY,{...old,...value})
    // 更新数据，让页面能够监听到当前数据的变化
    emmiter.$emit('userChange')
}

// 加下面两个方法，可以节省传递参数，也可以将对用户数据的操作全部封装在一个文件中
export function getUser(){
    return getStore(USER_KEY)
}
export function clearUser(){
    clearStore(USER_KEY)
}