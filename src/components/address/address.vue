<template>
  <div class="address">
    <headerui title="乐享积分-收货地址" :back="true"></headerui>
    <!-- 主要内容 -->
    <mt-field label="联系人" v-model="userInfo.name"></mt-field>
    <mt-field label="手机号" v-model="userInfo.mobile" type="number"></mt-field>
    <mt-cell title="所在区域" is-link class="area" @click.native="popupShow">
      <span style="color: green" v-show="currentArea.length">
        {{currentArea[0] + '-'}}{{currentArea[1] + '-'}}{{currentArea[2]}}
      </span>
    </mt-cell>
    <mt-field label="详细地址" v-model="userInfo.detailAddress"></mt-field>

    <!-- 底部保存并使用 -->
    <footer-pay title="保存并使用" @click.native="saveAndUse"></footer-pay>
    <!-- 省市县 三级联动 -->
    <mt-popup v-model="popupVisible" position="bottom" class="popup">
      <div class="operating">
        <div @click="clickCancel">取消</div>
        <div @click="clickDefine">确定</div>
      </div>
      <mt-picker :slots="slots" value-key="label" @change="onValuesChange" class="cascade"></mt-picker>
    </mt-popup>

  </div>
</template>

<script>
import { CityInfo } from 'common/cityInfo/cityInfo'
import headerui from 'components/headerui/headerui'
import footerPay from 'components/footer-pay/footer-pay'

export default {
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot2'
        },
        {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot2'
        },
        {
          flex: 1,
          values: [],
          className: 'slot4',
          textAlign: 'center'
        }
      ],
      userInfo: {
        name: '',
        mobile: '',
        detailAddress: ''
      },
      // 三级联动 显示/隐藏
      popupVisible: false,
      // 三级联动 当前地区(用户选择地区之后,点击却定,才是当前地区)
      currentArea: [],
      // 三级联动 选择地区(选择不是显示在info主页面的,因为可以取消)
      selectArea: []
    }
  },
  methods: {
    // 显示 级联选择器
    popupShow() {
      console.log('点击 所在区域 弹出级联选择器')
      this.popupVisible = true
    },
    // 级联选择器
    onValuesChange(picker, values) {
      console.log('级联选择器')
      console.log(picker)
      console.log(values)
      if (values[0]) {
        picker.setSlotValues(1, values[0].children)
        picker.setSlotValues(2, values[1].children)
      }
      // 当前选择数组,只有城市名,没有children之类的属性
      if(values[0] && values[1] && values[2])
      this.selectArea = [values[0].label, values[1].label, values[2].label]
    },
    // 三级联动 确认 取消
    clickDefine(e) {
      console.log('三级联动 确认')
      this.currentArea = this.selectArea
      this.popupVisible = false
    },
    clickCancel() {
      console.log('三级联动 取消')
      this.popupVisible = false
    },
    // 保存并使用
    saveAndUse() {
      console.log('保存并使用')
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.slots[0].values = CityInfo
    })
  },
  components: {
    footerPay,
    headerui
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');
.address {
  text-align: left;
  position: fixed;
  top: 1.333333rem;
  bottom: 1.333333rem;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 1111;
}

// 底部弹出 级联选择器样式
.popup {
  width: 100%;
  margin-bottom: 1.333333rem;
  .operating {
    font-size: @font-size-medium-x;
    line-height: 1.066667rem;
    border-bottom: 1px solid @color-background-d;
    display: flex;
    justify-content: space-between;
    & div {
      width: 25%;
      text-align: center;
    }
    & div:nth-child(2) {
      color: @color-theme;
    }
  }
  .cascade {
    width: 100%;
    height: 40%;
  }
}
</style>
