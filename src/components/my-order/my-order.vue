<template>
  <div class="order">
    <headerui title="乐享积分-订单列表" :back="true"></headerui>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" class="my-load-more">

      <div class="order-list">
        <div class="order-item" v-for="(item, index) in orderList" @click="clickOrderList(item, index)">
          <div class="item-header">
            <div class="item-order-num">订单编号: D0{{item.id}}</div>
            <div class="item-order-type" v-if="item.state === '1'" style="color: #f71c08;">待确认</div>
            <div class="item-order-type" v-else style="color: #409EFF;">已确认</div>
          </div>
          <div class="item-content">
            <div class="item-img-list">
              <!-- 如果以后图片是多个,则直接把注释取消,然后替换注释下方div(取消注释,删除下面,OK) -->
              <!-- <div class="img-item" v-for="(val, ind) in item.pic"> -->
              <div class="img-item">
                <img :src="'http://tlink.cc/po-back/' + item.pic" alt="">
              </div>
            </div>
            <div class="item-content-num">共 {{item.quantity}} 件</div>
          </div>
          <div class="item-total-integral">合计积分: {{item.point}} 积分</div>
        </div>
      </div>
    </mt-loadmore>

    <!-- 子组件 订单详情页面 -->
    <router-view :detail="detail"></router-view>
  </div>
</template>

<script>
import headerui from 'components/headerui/headerui'
import { request, requestGet } from 'common/js/request'
import { Toast } from 'mint-ui'
import bus from 'common/js/bus'

export default {
  data() {
    return {
      orderList: [],
      imgList: [1, 2, 3, 4, 5, 6],
      // 加载页数
      start: 0,
      // 全部加载了,不能上拉刷新
      allLoaded: false,
      // 点击的订单详情
      detail: {}
    }
  },
  methods: {
    // 点击订单列表 跳转订单详情
    clickOrderList(item, index) {
      console.log('订单列表')
      this.detail = item
      this.$router.push({ name: 'orderDetails' })
    },
    // 上拉加载
    loadBottom() {
      console.log('上拉加载')
      this.start = this.start + 10
      this.loading(this.start)
    },
    // 加载函数
    loading(start) {
      var url = '/wel/Shop/order_list'
      var data = { mod: '移动商城', start: start, limit: 10 }
      requestGet(url, data).then(res => {
        console.log(res)
        if (res.total === this.orderList.length) {
          Toast('已经全部加载')
          this.allLoaded = true
          this.$refs.loadmore.onBottomLoaded()
          return
        }
        this.orderList = this.orderList.concat(res.data)
        this.$refs.loadmore.onBottomLoaded()
      })
      console.log(this)
    }
  },
  mounted() {
    this.loading(this.start)
  },
  components: {
    headerui
  },
  // 销毁前 需要把$emit放在这里,然后下个页面$on放在created里面才可以,不然第一次穿不过去,以后每次都+1
  // (bus总线用于非父子组件通讯 非父子 非)
  beforeDestroy() {
    console.log('销毁')
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');
// 加载组建 样式
.my-load-more {
  width: 100%;
  height: 100%;
}

.order /deep/ .mint-loadmore {
  overflow: auto;
  & div {
    .mint-loadmore-bottom {
      width: 100%;
      height: 30px;
      line-height: 30px;
      position: absolute;
      bottom: -30px;
      margin-bottom: 0;
      .mint-loadmore-spinner {
        vertical-align: super;
        position: relative;
        top: 5px;
      }
      .mint-loadmore-text {
        vertical-align: super;
        font-size: @font-size-small;
      }
    }
  }
}
// 正常代码
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
            & img {
              widows: 100%;
              height: 100%;
            }
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

