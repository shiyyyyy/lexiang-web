<template>
  <div class="title">
    <i class="header-slot iconfont icon-back" v-if="back" @click="clickBack"></i>
    {{title}}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '福励云积分'
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    // 返回按钮
    clickBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');
.title {
  font-size: @font-size-medium-x;
  color: @color-background;
  background-color: @color-text-ll;
  line-height: 1.333333rem;
  height: 1.333333rem;
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999;
}
// 顶部 slot
.header-slot {
  font-size: @font-size-large-x;
  position: absolute;
  left: 0.333333rem;
  top: 0;
}
</style>

