<template>
    <div class="integral">
        <headerui title="乐享积分-我的积分" :back="true"></headerui>

        <div class="main">
            <div class="main-head">
                <div>
                    我的积分
                    <br /><br />
                    <span>6666</span>
                </div>
            </div>
            <div class="main-content">
                <mt-cell :title="'已用积分：' + used + ' 积分'" is-link value="消费记录" class="cell" @click.native="toOrder">
                </mt-cell>
                <mt-cell :title="'剩余积分：' + remain + ' 积分'" is-link value="去换购" class="cell" @click.native="toIndex">
                </mt-cell>
            </div>
        </div>
    </div>
</template>

<script>
import headerui from 'components/headerui/headerui'

export default {
  data() {
    return {
      // 已用积分和剩余积分
      used: 0,
      remain: 0
    }
  },
  methods: {
    // 点击 已用积分 去订单列表
    toOrder() {
      console.log('点击 已用积分 去订单列表')
    },
    // 点击 剩余积分 去首页
    toIndex() {
      console.log('点击 剩余积分 去首页')
    }
  },
  components: {
    headerui
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');

.integral {
  position: absolute;
  top: 1.333333rem;
  left: 0;
  right: 0;
  bottom: 1.333333rem;
  background-color: #fff;
}
.main {
  width: 100%;
  height: 100%;
  .main-head {
    width: 100%;
    height: 4.533333rem;
    font-size: @font-size-medium-x;
    color: @color-background;
    background-color: @color-dialog-background;
    text-align: center;
    padding-top: 1.333333rem;
    & span {
      font-size: @font-size-large;
      font-weight: bold;
    }
  }
}
</style>

