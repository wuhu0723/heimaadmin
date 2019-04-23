import axios from 'axios'
import BigInt from 'json-bigint'
import { Message } from 'element-ui'

import { getUser } from   '@/utils/store'

import { API_USERIMAGES , API_HEAD} from  '@/constants/api'

const service = axios.create({
    // 基准路径
    baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/', // api 的 base_url
    timeout: 10000, // request timeout
    // `transformResponse`选项允许我们在数据传送到`then/catch`方法之前对数据进行改动
    transformResponse(data) {
        if (data)
            return BigInt.parse(data)  //由于后端的数据库对id进行了变更 所以这里必须采用json-bigint插件来进行处理 保证数据正确
    }
})

const IsImgUpload = (config) => {
    return  ((config.url == API_USERIMAGES && config.method == 'post') || (config.url == API_HEAD && config.method == 'patch')) 
}

// 设置请求头
// axios.interceptors.request.use((config) => {
//     // 在非图片上传场景下 给默认的上传格式
//     // 否则设置图片上传的请求头multipart/form-data
//     // 如果有token,在发送请求的时候还需要将请求头传递给服务器
// })
service.interceptors.request.use(
    config => {
        //LoadingManage.openLoading(); //打开弹层
        let Authorization = getUser () ;
        if(Authorization && Authorization.token){
          //如果当前缓存中存在用户令牌 后台接口的参数格式
          if(!IsImgUpload(config)){
            /****在非图片上传场景下 给默认的上传格式****/
            config.headers['Content-Type'] = 'application/json'
          }else{
            config.headers['Content-Type'] = 'multipart/form-data'
          }
          config.headers['Authorization'] ='Bearer'+ ' ' + Authorization.token
        }
        // 让每个请求携带token-- ['X-Token']为自定义key
      
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    /**
     * 监控拦截 如果出现 异常 则直接终止请求链
     */
    response => {
      //LoadingManage.closeLoading() //关闭loading弹层
      //直接返回返回体中的结构
      return response.data ? response.data.data : null
    },
    
  error => {
    // LoadingManage.closeLoading() //关闭loading弹层
    console.log(error)
    let message = ''
    let  code = error.response ? error.response.status : ''
    switch(code){
      case 400:
       message = '请求参数错误'
      break;
      case 401:
      message = 'token过期或未传'
      break;
      case 403:
       message = '操作失败'
       break;
      case 404:
       message = '手机号不正确'
       break;
      case 500:
      message = '服务器异常'
      break;
      case 507:
      message = '服务器数据库异常'
       break;
       default :
       message = '处理异常'
    }
   // message = message + ':' +  error.response ? error.response.data.message : error.response.data.message
      Message({
        message,
        type: 'warning',
        onClose:code  == '401' ? () =>   Router.replace({path:'/login'}) : null
      })
     return new Promise(function(){}) //终止当前的promise链
  }
  )


export default service