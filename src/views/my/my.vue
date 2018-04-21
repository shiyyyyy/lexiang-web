<template>
  <div class="my">
    <headerui title="我的"></headerui>
    <mt-cell title="我的订单" is-link value="" class="cell" @click.native="toOrder">
    </mt-cell>
    <mt-cell title="我的积分" is-link value="" class="cell" @click.native="toIntegral">
    </mt-cell>
    <!-- 子路由页面 -->
    <router-view></router-view>

    <footer-bar selected="我的"></footer-bar>
  </div>
</template>

<script>
import headerui from 'components/headerui/headerui'
import footerBar from 'components/footer-bar/footer-bar'

export default {
  methods: {
    // 跳转订单和积分页
    toOrder() {
      console.log('跳转订单页')
      this.$router.push({name: 'myOrder'})
    },
    toIntegral() {
      console.log('跳转积分页')
      this.$router.push({name: 'myIntegral'})      
    }
  },
  components: {
    footerBar,
    headerui
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');

.my {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 1.333333rem 0;
  text-align: left;
  position: relative;
}
</style>


