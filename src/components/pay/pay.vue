<template>
  <div class="pay">
    <headerui title="福励云积分-支付页面" :back="true"></headerui>
    <div class="add-title">地址</div>
    <!-- 地址 -->
    <div class="address">
      <!-- 地址为空时显示 -->
      <div class="address-null" @click="editAddress" v-show="!address.mobile">
        <mt-button size="normal" plain>+ 填写收货地址</mt-button>
      </div>
      <!-- 地址不为空时显示 -->
      <div class="address-main" @click="editAddress" v-show="address.mobile">
        <div class="main-box">
          <div class="user-name">{{address.name || ''}}</div>
          <div class="user-mobile">{{address.mobile || ''}}</div>
          <div class="user-address" v-show="address.currentArea && address.currentArea.length">
            {{ address.currentArea && address.currentArea[0] ? address.currentArea[0] : ''}} {{ address.currentArea && address.currentArea[1] ? address.currentArea[1] : ''}} {{ address.currentArea && address.currentArea[2] ? address.currentArea[2] : ''}} {{ address.currentArea && address.detailAddress ? address.detailAddress : ''}}
          </div>
        </div>
        <div class="edit-icon">
          <i class="iconfont icon-you you-icon"></i>
        </div>
      </div>
    </div>

    <div class="pro-title">商品</div>
    <!-- 商品列表 -->
    <div class="commodity">
      <div class="commodity-img">
        <img :src="imgUrl" alt="">
      </div>
      <div class="commodity-info">
        <div class="commodity-name" v-cloak>{{goodDetail.name}}</div>
        <div class="commodity-num" v-cloak>数量: {{goodNumber}}</div>
        <div class="commodity-total" v-cloak>共: {{goodDetail.point * goodNumber}} 积分</div>
      </div>
    </div>

    <footer-pay @click.native='buy'></footer-pay>
  </div>
</template>

<script>
import headerui from 'components/headerui/headerui'
import footerPay from 'components/footer-pay/footer-pay'
import bus from 'common/js/bus'
import { request, requestGet } from 'common/js/request'
import { Toast } from 'mint-ui'

export default {
  props: ['goodDetail', 'goodNumber'],
  data() {
    return {
      address: {}
    }
  },
  methods: {
    //   添加/编辑地址
    editAddress() {
      console.log('更改地址')
      this.$router.push({ name: 'myAddressList', query: { type: 'select' } })
    },
    //   确定按钮(购买)
    buy() {
      var url = '/wel/Shop/order_req'
      // var data = {
      //   goods_id: parseInt(this.goodDetail.id),
      //   quantity: this.goodNumber,
      //   address: this.address
      // }
      var data = Object.assign({}, { goods_id: parseInt(this.goodDetail.id), quantity: this.goodNumber}, this.address)
      console.log(data)
      request(url, data).then(
        res => {
          if (res.success) {
            Toast('兑换成功')
            this.$router.go(-1)
          }
        },
        err => {
          Toast(err)
        }
      )
    },
    // 刷新 地址
    refrash() {
      // 请求地址列表
      var url = '/wel/Shop/address_list'
      request(url, { _: Math.random() }).then(res => {
        console.log(res)
        if (res.success) {
          for (var i = 0, len = res.data.length; i < len; i++) {
            if (res.data[i].default) {
              this.address = res.data[i]
              // 有 session 就读取并使用,因为有之能是从pay跳转my-address-list点击地址并返回pay,才有session.
              if (sessionStorage.getItem('userInfo')) {
                var userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
                this.address = userInfo
              }
            }
          }
        }
      })
    }
  },
  mounted() {
    // 请求地址列表
    this.refrash()
  },
  computed: {
    imgUrl() {
      if (this.goodDetail.pic) {
        return 'http://tlink.cc/po-back/' + this.goodDetail.pic
      } else {
        return null
      }
    }
  },
  components: {
    headerui,
    footerPay
  },
  destroyed() {
    console.log('关闭pay,清除session')
    sessionStorage.removeItem('userInfo')
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');
.pay {
  position: fixed;
  top: 1.333333rem;
  right: 0;
  bottom: 51px;
  left: 0;
  background-color: @color-background-d;
  z-index: 1112;
}
.add-title,
.pro-title {
  font-size: @font-size-small;
  line-height: 40px;
  text-align: left;
  padding-left: 10px;
  border-bottom: 1px solid @color-highlight-background;
  background-color: #fff;
}
//  地址
.address {
  width: 100%;
  max-height: 2.773333rem;
  background-color: @color-background;
  font-size: @font-size-small;
  color: @color-text;
  margin-bottom: 0.4rem;
  // 若地址为空
  .address-null {
    line-height: 2.773333rem;
  }
  // 不为空
  .address-main {
    height: 100%;
    padding: 0.266667rem;
    text-align: left;
    display: flex;
    justify-content: space-between;
    .main-box {
      width: 80%;
      height: 100%;
      .user-mobile {
        line-height: 0.8rem;
      }
      .user-address {
        line-height: 0.533333rem;
        color: @color-dialog-background;
        //多于两行隐藏,并显示省略号
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; //将元素设为盒子伸缩模型显示
        -webkit-box-orient: vertical; //伸缩方向设为垂直方向
        -webkit-line-clamp: 2; //超出3行隐藏，并显示省略号
      }
    }
    .edit-icon {
      width: 15%;
      display: flex;
      justify-content: center;
      align-items: center;
      // 右 箭头
      .you-icon {
        font-size: @font-size-large;
        display: block;
      }
    }
  }
}
//  订单详情
.commodity {
  font-size: @font-size-medium;
  background-color: @color-background;
  padding: 0.4rem 0.266667rem;
  margin-bottom: 0.053333rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  .commodity-img {
    width: 2.266667rem;
    height: 1.84rem;
    margin-right: 0.266667rem;
    & img {
      width: 100%;
      height: 100%;
    }
  }
  .commodity-info {
    flex: 1;
    .commodity-name {
      //多于两行隐藏,并显示省略号
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //将元素设为盒子伸缩模型显示
      -webkit-box-orient: vertical; //伸缩方向设为垂直方向
      -webkit-line-clamp: 2; //超出3行隐藏，并显示省略号
    }
    .commodity-num,
    .commodity-total {
      font-size: @font-size-small;
      color: @color-dialog-background;
    }
  }
}
</style>


