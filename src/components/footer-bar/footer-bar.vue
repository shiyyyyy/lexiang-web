<template>
  <mt-tabbar v-model="select" class="footer-bar">
    <mt-tab-item id="首页">
      <img slot="icon" src="../../assets/首页.png"> 首页
    </mt-tab-item>
    <mt-tab-item id="购物车">
      <img slot="icon" src="../../assets/首页.png"> 购物车
    </mt-tab-item>
    <mt-tab-item id="我的">
      <img slot="icon" src="../../assets/首页.png"> 我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  props: {
    selected: {
      type: String,
      default: '首页'
    }
  },
  data() {
    return {
      // 解耦
      select: this.selected
    }
  },
  watch: {
    select: function(val, oldVal) {
      // 这里就可以通过 val 的值变更来确定
      console.log(val)
      if (val === '首页') {
        this.$router.push({ name: 'index' })
      } else if (val === '购物车') {
        this.$router.push({ name: 'shopCart' })
      } else {
        this.$router.push({ name: 'my' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');
.footer-bar {
  height: 1.333333rem;
  background-color: @color-highlight-background;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  // & .is-selected {
  //   background-color: @color-dialog-background;
  //   color: @color-background;
  // }
}
</style>


