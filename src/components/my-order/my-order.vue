<template>
    <div class="order">
        <headerui title="乐享积分-订单列表" :back="true"></headerui>

        <div class="order-list">
            <div class="order-item" v-for="(item, index) in orderList" @click="clickOrderList(index)">
                <div class="item-header">
                    <div class="item-order-num">订单编号: 20180423145430</div>
                    <div class="item-order-type" style="color: #f71c08;">待确认</div>
                    <!-- <div class="item-order-type" style="color: #409EFF;">已确认</div> -->
                </div>
                <div class="item-content">
                    <div class="item-img-list">
                        <div class="img-item" v-for="(val, ind) in imgList"></div>
                    </div>
                    <div class="item-content-num">共 30 件</div>
                </div>
                <div class="item-total-integral">合计积分: 500 积分</div>
            </div>
        </div>

        <!-- 子组件 订单详情页面 -->
        <router-view></router-view>
    </div>
</template>

<script>
import headerui from 'components/headerui/headerui'

export default {
  data() {
    return {
      orderList: [1, 2, 3, 4],
      imgList: [1, 2, 3, 4, 5, 6]
    }
  },
  methods: {
    // 点击订单列表 跳转订单详情
    clickOrderList(index) {
      console.log('订单列表')
      this.$router.push({ name: 'orderDetails' })
    }
  },
  components: {
    headerui
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');

.order {
  position: absolute;
  top: 1.333333rem;
  left: 0;
  right: 0;
  bottom: 1.333333rem;
  background-color: @color-background-d;
  .order-list {
    width: 100%;
    height: 100%;
    overflow: auto;
    .order-item {
      font-size: @font-size-small;
      color: @color-text;
      padding: 0 0.266667rem;
      background-color: @color-background;
      margin-bottom: 10px;
      margin-top: 10px;
      .item-header {
        display: flex;
        justify-content: space-between;
        line-height: 0.853333rem;
      }
      .item-content {
        display: flex;
        justify-content: space-between;
        .item-img-list {
          height: 1.413333rem;
          overflow: hidden;
          .img-item {
            width: 1.413333rem;
            height: 1.413333rem;
            background-color: #fff;
            margin-right: 0.16rem;
            display: inline-block;
          }
        }
        .item-content-num {
          width: 20%;
          line-height: 1.413333rem;
          text-align: right;
        }
      }
      .item-total-integral {
        line-height: 1.066667rem;
        color: @color-dialog-background;
      }
    }
  }
}
</style>

