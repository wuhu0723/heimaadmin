//导出菜单数据
export  const  MenuData = [
   { 
       title:'首页',path : '/' ,
   },
   { 
        title:'内容管理',path:'/article',
        children:[
        { title:'发布文章' , path : '/article/publish'},
        { title:'内容列表' , path : '/article/list'},
        { title:'评论列表' , path : '/comment/list'},
        { title:'素材管理' , path : '/material/list'}
    ]
   },
   { 
    title:'粉丝管理', path:'/fans',
    children:[
    { title:'图文数据' , path : '/material/data'},
    { title:'粉丝概况' , path : '/fans/index'},
    { title:'粉丝画像' , path : '/fans/info'},
    { title:'粉丝列表' , path : '/fans/list'}
  ]
},
  { title:'账户信息',path:'/user/center'}
]
 