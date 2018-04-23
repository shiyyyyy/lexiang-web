<template>
  <div class="footer">
    <mt-tabbar v-model="select" class="footer-bar">
      <mt-tab-item id="首页">
        <img slot="icon" :src="tabbarImg1"> 首页
      </mt-tab-item>
      <mt-tab-item id="购物车">
        <img slot="icon" :src="tabbarImg2"> 购物车
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" :src="tabbarImg3"> 我的
      </mt-tab-item>
    </mt-tabbar>
  </div>

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
  computed: {
    // 图片地址
    tabbarImg1() {
      return this.select === '首页'
        ? require('../../common/images/tabbar/01.png')
        : require('../../common/images/tabbar/1.png')
    },

    tabbarImg2() {
      return this.select === '购物车'
        ? require('../../common/images/tabbar/02.png')
        : require('../../common/images/tabbar/2.png')
    },

    tabbarImg3() {
      return this.select === '我的'
        ? require('../../common/images/tabbar/03.png')
        : require('../../common/images/tabbar/3.png')
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
.footer {
  height: 51px;
  background-color: @color-highlight-background;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  & /deep/ .footer-bar {
    .mint-tab-item {
      padding: 5px 0;
    }
  }
}
</style>


