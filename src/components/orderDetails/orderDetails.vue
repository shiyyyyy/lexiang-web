<template>
    <div class="order-details">
        <headerui title="乐享积分-订单详情" :back="true"></headerui>
        <!-- 地址 -->
        <div class="address">
            <div class="user-name">王尼玛</div>
            <div class="user-mobile">18877776666</div>
            <div class="user-address">北京市北京市朝阳区潘家园大厦3层北区营销中心屋里信息部-北京市北京市朝阳区潘家园大厦3层北区营销中心屋里信息部</div>
        </div>
        <!-- 订单信息 -->
        <div class="order-info">
            <div class="order-num">订单编号：2018042116310000</div>
            <div class="order-integral">合计积分：666 积分</div>
            <div class="order-type">订单状态：待确认</div>
        </div>
        <!-- 商品列表 -->
        <div class="commodity" v-for="(value, index) in commodityList">
            <div class="commodity-img">
                <img src="../../assets/swiper3.jpg" alt="">
            </div>
            <div class="commodity-info">
                <div class="commodity-name">厕纸斜挎包-青青草原版遮阳帽-屎味巧克力-皇帝的新装同款内衣裤-变态死大头头套</div>
                <div class="commodity-num">x 20</div>
            </div>
        </div>
    </div>
</template>

<script>
import headerui from 'components/headerui/headerui'

export default {
  data() {
    return {
      commodityList: [1, 2, 3, 4, 5, 6, 7]
    }
  },
  components: {
    headerui
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');

.order-details {
  font-size: @font-size-small;
  background-color: @color-background-d;
  overflow: auto;
  position: fixed;
  top: 1.333333rem;
  bottom: 1.333333rem;
  left: 0;
  right: 0;
  .address {
    background-color: @color-background;
    padding: 0.4rem 0.266667rem;
    margin-bottom: 0.266667rem;
    .user-name {
    }
    .user-mobile {
      line-height: 1.066667rem;
    }
    .user-address {
      line-height: 0.533333rem;
      //多于两行隐藏,并显示省略号
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //将元素设为盒子伸缩模型显示
      -webkit-box-orient: vertical; //伸缩方向设为垂直方向
      -webkit-line-clamp: 2; //超出3行隐藏，并显示省略号
    }
  }

  .order-info {
    min-height: 2.666667rem;
    background-color: @color-background;
    line-height: 0.8rem;
    padding: 0.4rem 0.266667rem;
    margin-bottom: 0.5rem;
  }

  .commodity {
    background-color: @color-background;
    padding: 0.4rem 0.266667rem;
    margin-bottom: 0.053333rem;
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
    }
  }
}
</style>


