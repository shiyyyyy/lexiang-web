<template>
  <div class="shop-cart">
    <headerui></headerui>
    <!-- 购物车为空时显示的页面 -->
    <!-- <div class="null">
      <span>还未选购商品~~</span><br /><br />
      <mt-button size="large" type="default" class="btn" @click="GoIndex">去选购</mt-button>
    </div> -->
    <!-- 购物车里 有商品时 显示的页面 -->
    <div class="shoping">
      <!-- 地址 -->
      <div class="address">
        <!-- 地址为空时显示 -->
        <!-- <div class="address-null" @click="addAddress">
          <mt-button size="normal" plain>+ 填写收货地址</mt-button>
        </div> -->
        <!-- 地址不为空时显示 -->
        <div class="address-main" @click="editAddress">
          <div class="main-box">
            <div class="user-name">王尼玛</div>
            <div class="user-mobile">18877776666</div>
            <div class="user-address">北京市北京市朝阳区潘家园大厦3层北区营销中心屋里信息部</div>
          </div>
          <div class="edit-icon">
            <i>></i>
          </div>
        </div>
      </div>
      <!-- 商品列表 -->
      <div class="commodity-list">
        <div class="comm-item" v-for="(item, index) in 10">
          <div class='item-img'><img src="../../assets/swiper2.jpg" alt="" /></div>
          <div class="item-info">
            <div class="info-name">蚂蚁大力丸蚂蚁大力丸蚂蚁大力丸蚂蚁大力丸蚂蚁大力丸蚂蚁大力丸蚂蚁大力丸蚂蚁大力丸</div>
            <div class="info-prices">11.11 积分</div>
            <div class="info-num">
              <div @click="subNum"> - </div>
              <div> {{num}} </div>
              <div @click="addNum"> + </div>
            </div>
            <div class="info-del" @click='delCommodity'>删除</div>
          </div>
        </div>
      </div>
      <!-- 继续添加按钮 -->
      <div class="add-btn">
        <mt-button size="large" @click="continueAdd">继续添加</mt-button>
      </div>
      <!-- 提交订单 -->
      <div class="submit-order">
        <div class="order-prices">
          <div class="should-prices">应付积分: 666</div>
          <div class="current-prices">当前积分: 888</div>
        </div>
        <div class="order-btn" @click="submitOrder">提交订单</div>
      </div>
      <!-- 点击提交订单 弹出框 -->
      <mt-popup v-model="popupVisible" position="bottom" class="submit-confirm">
        <div class="confirm">
          <div @click="confirmSubmit">确定</div>
          <div @click="confirmCancel">取消</div>
        </div>
      </mt-popup>
      <!-- 支付完成提示弹出框 -->
      <mt-popup v-model="popupVisible1" position="right" class="success-prompt">
        <div class="success-text">恭喜您订单已提交</div>
        <div class="success-data">{{countdown}}秒后返回首页</div>
        <!-- <mt-button class="success-btn" type="default">立即返回</mt-button> -->
      </mt-popup>
    </div>
    <!-- 子页面 地址显示区域 -->
    <router-view></router-view>
    <footer-bar selected="购物车"></footer-bar>
  </div>
</template>

<script>
import headerui from 'components/headerui/headerui'
import footerBar from 'components/footer-bar/footer-bar'

export default {
  data() {
    return {
      // num 这个上线没用了,因为不可能只有一个num
      num: 0,
      // 底部弹出框,显示隐藏 底部弹出的确定/取消和右侧弹出的成功提示/返回首页
      popupVisible: false,
      popupVisible1: false,
      // 倒计时 订单提交成功 3秒返回首页(因为直接要减1,所以给4)
      countdown: 4
    }
  },
  methods: {
    // 添加地址(地址为空时点击地址栏,可以触发)
    addAddress() {
      console.log('添加地址')
      this.$router.push({ name: 'address' })
    },
    // 编辑地址(地址 不为空 时点击地址栏,可以触发)
    editAddress() {
      console.log('编辑地址')
      this.$router.push({ name: 'address' })
      // this.$router.push({ name: 'index' })
    },
    // 点击 加/减号 +/-
    subNum() {
      console.log('点击减号')
      if (this.num <= 1) return
      this.num -= 1
    },
    addNum() {
      console.log('点击加号')
      if (this.num >= 10) return
      this.num += 1
    },
    // 点击删除按钮
    delCommodity(e) {
      console.log('删除')
    },
    // 继续添加按钮 跳转首页
    continueAdd() {
      console.log('继续添加')
    },
    // 提交订单
    submitOrder() {
      console.log('提交订单')
      this.popupVisible = true
    },
    // 提交表单确认
    confirmSubmit() {
      console.log('提交表单确认')
      this.popupVisible = false
      this.successPrompt()
    },
    // 提交表单取消
    confirmCancel() {
      console.log('提交表单取消')
      this.popupVisible = false
    },
    // 表单提交成功 提示倒计时
    successPrompt() {
      console.log('表单提交成功')
      this.popupVisible1 = true
      --this.countdown
      if (this.countdown >= 0) {
        console.log(111111)
        setTimeout(this.successPrompt, 1000)
      } else {
        this.$router.push({ name: 'index' })
        console.log(222222)
      }
    },
    // 没有商品时 去选购 按钮
    GoIndex() {
      console.log('没有商品 去选购')
      this.$router.push({ name: 'index' })
    }
  },
  components: {
    headerui,
    footerBar
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');

.shop-cart {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 1.333333rem 0;
  background-color: @color-background-d;
  // null 样式
  .null {
    width: 60%;
    font-size: @font-size-medium;
    font-weight: bold;
    margin: 5rem auto;
    text-align: center;
    .btn {
      width: 80%;
      margin: 0 10%;
      background-color: #fff;
    }
  }
  // main
  .shoping {
    width: 100%;
    height: 100%;
    overflow: auto;
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
        }
      }
    }
    // 商品列表
    .commodity-list {
      background-color: @color-background;
      //   每条商品
      .comm-item {
        border-bottom: 1px solid @color-background-d;
        padding: 0.373333rem 0.266667rem 0;
        display: flex;
        justify-content: space-between;
        // 左边 img
        .item-img {
          width: 2.053333rem;
          height: 1.68rem;
          padding-bottom: 0.373333rem;
          margin-right: 0.266667rem;
          & img {
            width: 100%;
            height: 100%;
          }
        }
        // 右边 info
        .item-info {
          font-size: @font-size-small;
          color: @color-dialog-background;
          text-align: left;
          flex: 1;
          position: relative;
          .info-name {
            line-height: 0.373333rem;
            //多于两行隐藏,并显示省略号
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box; //将元素设为盒子伸缩模型显示
            -webkit-box-orient: vertical; //伸缩方向设为垂直方向
            -webkit-line-clamp: 2; //超出3行隐藏，并显示省略号
          }
          .info-prices {
            font-size: @font-size-small-s;
            line-height: 0.64rem;
          }
          .info-num {
            width: 25%;
            background-color: @color-background;
            margin-bottom: 0.266667rem;
            text-align: center;
            display: flex;
            justify-content: space-around;
            & > div {
              flex: 1;
            }
          }
          .info-del {
            width: 17%;
            font-size: @font-size-small-s;
            color: @color-sub-theme;
            text-align: center;
            border: 1px solid @color-sub-theme;
            border-radius: 5px;
            background-color: @color-background;
            position: absolute;
            right: 0;
            bottom: 0.266667rem;
            &:active {
              background-color: rgba(0, 0, 0, 0.2);
            }
          }
        }
      }
    }
    // 继续添加 按钮
    .add-btn {
      width: 40%;
      margin: 0.533333rem auto 1.6rem;
      & button {
        background-color: #fff;
      }
    }
    // 提交订单
    .submit-order {
      height: 1.253333rem;
      background-color: @color-background;
      border-top: 1px solid @color-background-d;
      padding: 0 0.533333rem 0 0.266667rem;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .order-prices {
        font-size: @font-size-small-s;
        color: @color-dialog-background;
        line-height: 0.626667rem;
      }
      .order-btn {
        height: 0.64rem;
        font-size: @font-size-small;
        color: @color-sub-theme;
        line-height: 0.64rem;
        border: 1px solid @color-sub-theme;
        border-radius: 0.16rem;
        padding: 0.08rem 0.16rem;
      }
    }
    // 底部弹出框(提交确认)
    .submit-confirm {
      width: 100%;
      font-size: @font-size-medium;
      line-height: 1.333333rem;
      .confirm div:nth-child(1) {
        border-bottom: 1px solid @color-dialog-background;
      }
    }
    // 支付成功,提示弹出框
    .success-prompt {
      width: 100%;
      height: 100%;
      font-size: @font-size-large;
      line-height: 0.8rem;
      padding: 200px 0;
      box-sizing: border-box;
      position: fixed;
      .success-btn {
        margin-top: 0.533333rem;
      }
    }
  }
}
</style>


