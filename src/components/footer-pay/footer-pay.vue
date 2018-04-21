<template>
    <div class="footer-pay">
        {{title}}
    </div>
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      default: '立即兑换'
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');
.footer-pay {
  font-size: @font-size-medium-x;
  color: @color-background;
  background-color: @color-footer-pay-background;
  line-height: 1.333333rem;
  height: 1.333333rem;
  text-align: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1111;
}
</style>