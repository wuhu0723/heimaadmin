<template>
    <div class="dashboard-article">
        <div class="header">
            <span>最新图文</span>
            <router-link to='/'>更多</router-link>
        </div>
        <ul>
            <li>
                <img src="@/assets/avatar.jpg" alt="">
                <dl>
                    <dt><router-link to='/'>回到SideBar子组件，在里面先定义props</router-link></dt>
                    <dd class="time"><span>已发表</span>2019-8-9 12:20:33</dd>
                    <dd>在父组件中为 子组件的props属性赋值</dd>
                </dl>
            </li>
            <li>
                <img src="@/assets/avatar.jpg" alt="">
                <dl>
                    <dt><router-link to='/'>回到SideBar子组件，在里面先定义props</router-link></dt>
                    <dd class="time"><span>已发表</span>2019-8-9 12:20:33</dd>
                    <dd>在父组件中为 子组件的props属性赋值</dd>
                </dl>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.dashboard-article{
    background-color: #fff;
    border:1px solid #ccc;
    margin-top: 10px;
    .header{
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        border-bottom: 1px solid #eee;
    }
    li{
        padding: 10px 0;
        display: flex;
        img {
            flex: 1;
        }
        dl {
            flex: 4;
            margin-left: 10px;
            line-height: 22px;
            dt {
                font-size: 12px;
            }
            dd {
                font-size: 11px;
                color: #ccc;
            }
            .time {
                 > span {
                     color: skyblue;
                     margin-right: 10px;
                 }
            }
        }
    }
}
</style>


