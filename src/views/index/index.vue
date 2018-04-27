<template>
  <div class="index">

    <headerui :title="title"></headerui>
    <!-- 中间主体内容 -->
    <div class="main" ref="main">
      <!-- 中间顶部轮播图 -->
      <div class="swiper">
        <mt-swipe :show-indicators="false" :auto="0" @change="swiperChange">
          <mt-swipe-item>
            <a href="#"><img class="swiper-img" src="../../assets/swiper1.jpg" alt=""></a>
          </mt-swipe-item>
          <mt-swipe-item><img class="swiper-img" src="../../assets/swiper2.jpg" alt=""></mt-swipe-item>
          <mt-swipe-item><img class="swiper-img" src="../../assets/swiper3.jpg" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- nav栏 && 商品栏-->
      <div class="nav" :class="{isFixed: Fixed}" ref="nav">
        <mt-navbar v-model="selected" :class="{'nav-box': true, 'an-nav-box': allNav}" @click.native="clickNav">
          <mt-tab-item v-for="(item, index) in data.category" :id="item" class="nav-item" :key="index">
            {{item}}
          </mt-tab-item>
        </mt-navbar>
        <!-- 展开icon 大于5时显示,否则隐藏 class是展开/隐藏时候icon要旋转180°-->
        <div class="an-icon" v-if="navN > 5" @click="anNav">
          <i :class="{'an-icon-origin': allNav}" class="iconfont icon-xia"></i>
        </div>
      </div>
      <!-- 商品栏 -->
      <div class="goods" :class="{'goods-Ceiling': Fixed}">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="true" :bottomDistance='50' ref="loadmore">
          <mt-tab-container v-model="selected" class="item-box">
            <mt-tab-container-item v-for="(item, index) in data.goods" :id="index" class="item" :key="index">
              <div class="item-main" v-for="(ite,i) in item" @click="goodsDetails(ite,index)" :key="i">
                <div class="goods-img">
                  <img :src="'http://tlink.cc/po-back/' + ite.pic" alt="">
                </div>
                <div class='goods-info'>
                  <span class="goods-name"> {{ite.name}} </span>
                  <span class="goods-prices"> {{ite.point}} 积分</span>
                </div>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
        </mt-loadmore>
      </div>
    </div>

    <footer-bar></footer-bar>

  </div>
</template>

<script>
// 组件
import headerui from 'components/headerui/headerui'
import footerBar from 'components/footer-bar/footer-bar'
// 请求
import { request, requestGet } from 'common/js/request'
import bus from 'common/js/bus'

export default {
  data() {
    return {
      // 头部标题
      title: '乐享积分-首页',
      // nav 选中标签的id '1'/'2'/'3'
      selected: '话费卡',
      // nav 数组
      navList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      // 商品数组
      goodsList: [9, 8, 7, 6, 5, 4, 3, 2, 1],
      // nav是否吸顶
      Fixed: false,
      // 刚开始未吸顶时候,offsetTop的高度
      offsetTop: 0,
      // nav 是否在展开状态
      allNav: false,
      // 返回数据
      data: {},
      // n nav数量
      navN: 0
    }
  },
  methods: {
    // 轮播图切换事件
    swiperChange(index) {
      console.log('轮播图切换')
      console.log(index)
      console.log(this)
    },
    // 监听页面滚动事件  nav吸顶
    handleScroll() {
      var scrollTop =
        this.$refs.main.pageYOffset ||
        this.$refs.main.scrollTop ||
        this.$refs.main.scrollTop
      // 不能用注释这个,因为当他吸顶之后,offsetTop就变了,会出问题
      // var offsetTop = this.$refs.nav.offsetTop
      if (!this.offsetTop) {
        console.log('设置offsetTop')
        this.offsetTop = this.$refs.nav.offsetTop
        console.log(this)
      }
      var offsetTop = this.offsetTop
      console.log(scrollTop, offsetTop)
      if (scrollTop >= offsetTop) {
        this.Fixed = true
      } else {
        this.Fixed = false
      }
    },
    // 切换 nav(主要展开按钮)
    clickNav(e) {
      console.log('切换 nav ')
      console.log(e)
    },
    // nav 展开按钮
    anNav() {
      console.log('展开nav')
      this.allNav = !this.allNav
    },
    // 点击商品 进入商品详情页
    goodsDetails(item, index) {
      console.log('点击商品 进入商品详情页')
      console.log(item, index)
      this.$router.push({ name: 'goodsDetails', params: { id: item.id } })
    },
    // 下拉刷新
    loadTop() {
      console.log('下拉刷新')
      var that = this
      setTimeout(function() {
        that.$refs.loadmoreMain.onTopLoaded()
      }, 3000)
    },
    // 上拉加载
    loadBottom() {
      console.log('上拉加载')
      var that = this
      // setTimeout(function() {
        that.goodsList.push(1, 2, 3)
        // 重新定位 (mint-ui自带)
        that.$refs.loadmore.onBottomLoaded()
      // }, 3000)
    }
  },
  mounted() {
    console.log(this.$refs)
    // 添加一个监听滚动事件 叫handleScroll 写在methods里
    this.$refs.main.addEventListener('scroll', this.handleScroll)
    // 请求
    var url = '/wel/Shop/portal'
    requestGet(url, {}).then(res => {
      this.data = res.data
      console.log(this)
      // 没办法,只能通过这种笨办法来判断nav是不是大于5个了
      var n = 0
      for(var k in res.goods){
        ++n
      }
      this.navN = n
    })
  },
  components: {
    footerBar,
    headerui
  },
  // 离开页面要清除handleScroll事件
  beforeDestroy() {
    console.log('销毁 滚动事件')
    this.$refs.main.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');

.main {
  position: absolute;
  top: 1.333333rem;
  left: 0;
  right: 0;
  bottom: 1.333333rem;
  overflow: auto;

  // 轮播图
  .swiper {
    height: 3.733333rem;
    .swiper-img {
      width: 100%;
      height: 100%;
    }
  }
  // nav 吸顶
  .isFixed {
    position: fixed !important;
    top: 1.333333rem;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .goods-Ceiling {
    margin-top: 1.333333rem;
  }
  //   nav
  .nav {
    // 导航栏
    position: relative;
    .nav-box {
      height: 46px;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;

      .nav-item {
        flex-grow: 0;
        flex-basis: 20%;
      }
      // mint-ui item 默认样式修改
      .is-selected {
        border-bottom: none;
        margin-bottom: 0;
      }
    }
    // nav 展开样式
    .an-nav-box {
      height: auto;
    }
    // 大于5个 展开按钮样式
    .an-icon {
      width: 20%;
      height: 46px;
      background-color: #fff;
      text-align: center;
      position: absolute;
      right: 0;
      top: 0;
      & i {
        font-size: @font-size-medium-x;
        line-height: 46px;
        display: inline-block;
        vertical-align: bottom;
        animation: myCSS 1s;
        animation-fill-mode: forwards;
      }
    }
    // 展开/隐藏时候icon要旋转180°
    .an-icon-origin {
      transform: rotate(180deg);
    }
  }

  //   商品栏
  .goods {
    box-sizing: border-box;
    padding: 0.266667rem;
    background-color: @color-background-d;
    .item-box {
      .item {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item-main {
          width: 4.586667rem;
          //   height: 3.466667rem;
          font-size: @font-size-small;
          background-color: @color-background;
          margin-bottom: 0.266667rem;
          // 图片
          .goods-img {
            & img {
              width: 100%;
              height: 2.666667rem;
            }
          }
          // 商品信息(名称和积分)
          .goods-info {
            text-align: left;
            padding-left: 0.266667rem;
            padding-right: 0.266667rem;
            .goods-name {
              //多于两行隐藏,并显示省略号
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box; //将元素设为盒子伸缩模型显示
              -webkit-box-orient: vertical; //伸缩方向设为垂直方向
              -webkit-line-clamp: 2; //超出3行隐藏，并显示省略号
            }
            .goods-prices {
              font-size: @font-size-small-s;
              color: @color-dialog-background;
              line-height: 0.533333rem;
            }
          }
        }
      }
    }
  }
}
// 加载提示的样式
// 下拉刷新
.index /deep/ .mint-loadmore > div {
  // transform: translate3d(0px, 30px, 0px);
  .mint-loadmore-top {
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-top: -50px;
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

// 上拉加载
.goods /deep/ .mint-loadmore > div {
  .mint-loadmore-bottom {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-bottom: -30px;
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
</style>
