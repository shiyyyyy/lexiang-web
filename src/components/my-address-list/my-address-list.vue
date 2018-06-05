<template>
  <div class="address">
    <headerui title="福励云积分-我的地址" :back="true"></headerui>

    <div class="address-list">

      <div class="address-main" @click="setDefault(index)" v-for="(item,index) in addressArr">
        <div class="main-box">
          <div class="user-name">{{item.name}}
            <div class="main-default" v-show="item.default">
              <div class="main-default-main">
                默认
              </div>
            </div>
          </div>
          <div class="user-mobile">{{item.mobile}}</div>
          <div class="user-address">
            {{ item.currentArea && item.currentArea[0] ? item.currentArea[0] : ''}} {{ item.currentArea && item.currentArea[1] ? item.currentArea[1] : ''}} {{ item.currentArea && item.currentArea[2] ? item.currentArea[2] : ''}} {{ item.currentArea && item.detailAddress ? item.detailAddress : ''}}
          </div>
        </div>

        <div class="edit-icon" @click.stop="editAddress(index)">
          <i class="iconfont icon-you you-icon"></i>
        </div>
      </div>
      <!-- tian添加地址按钮 -->
      <div class="address-null">
        <mt-button size="normal" plain  @click.native="addAddress">+ 添加收货地址</mt-button>
      </div>
    </div>

    <!-- 子路由组件 -->
    <router-view :currentAddress="currentAddress" @refrash="refrash"></router-view>

  </div>

</template>

<script>
import headerui from 'components/headerui/headerui'
import footerPay from 'components/footer-pay/footer-pay'
import bus from 'common/js/bus'
import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { request, requestGet } from 'common/js/request'

export default {
  data() {
    return {
      addressArr: [],
      currentAddress: {},
      select: ''
    }
  },
  methods: {
    //   地址   添加/修改/设为默认
    addAddress() {
      console.log('添加地址')
      sessionStorage.setItem('editAddress', 'add')
      this.$router.push({ name: 'address' })
    },
    editAddress(index) {
      console.log('修改地址')
      this.currentAddress = this.addressArr[index]
      sessionStorage.setItem('editAddress', 'edit')
      console.log(this.addressArr[index].id)
      sessionStorage.setItem('addressKey', this.addressArr[index].id)
      this.$router.push({ name: 'address' })
    },
    setDefault(index) {
      console.log('设为默认地址/选择地址')
      // select 为真,则是pay页面过来的,不选择默认地址,选择地址跳转到pay页面进行支付
      if (this.select) {
        console.log('选择地址')
        var userInfo = JSON.stringify(this.addressArr[index])
        sessionStorage.setItem('userInfo', userInfo)
        this.$router.go(-1)
      } else {
        // else时,为选择默认地址
        console.log('选择默认地址')
        var url = '/wel/Shop/set_default_address'
        var data = {
          id: this.addressArr[index].id,
          _: Math.random()
        }
        request(url, data).then(
          res => {
            Toast('设置默认地址成功')
            this.refrash()
          },
          err => {
            Toast(err)
          }
        )
      }
    },
    // 刷新
    refrash(refrash) {
      // 请求地址列表
      var url = '/wel/Shop/address_list'
      request(url, { _: Math.random() }).then(res => {
        console.log(res)
        if (res.success) {
          this.addressArr = res.data
        }
      })
    }
  },
  created() {
    // 如果是从pay页面过来的,就不是选择默认地址,而是选择地址到pay页面进行支付地址确认
    if (this.$route.query && this.$route.query.type) {
      this.select = this.$route.query.type
    }

    // 请求地址列表
    var url = '/wel/Shop/address_list'
    request(url, {}).then(res => {
      console.log(res)
      if (res.success) {
        this.addressArr = res.data
      }
    })
  },
  components: {
    headerui,
    footerPay
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');

.address {
  overflow: auto;
  position: absolute;
  top: 1.333333rem;
  left: 0;
  right: 0;
  bottom: 51px;
  background-color: @color-background-d;
  //  地址
  .address-list {
    width: 100%;
    font-size: @font-size-small;
    color: @color-text;
    margin-bottom: 0.4rem;
    // 添加地址按钮
    .address-null {
      line-height: 2.773333rem;
      text-align: center;
    }
    //
    .address-main {
      height: 100%;
      padding: 0.266667rem;
      margin-bottom: 10px;
      text-align: left;
      background-color: @color-background;
      display: flex;
      justify-content: space-between;
      .main-default {
        color: @color-theme;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .main-default-main {
          border: 1px solid @color-theme;
          border-radius: 6px;
          padding: 2px 4px;
        }
      }
      .main-box {
        width: 80%;
        height: 100%;
        .user-name {
          position: relative;
        }
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
}
</style>

