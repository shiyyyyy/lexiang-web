<template>
  <div class="address">
    <headerui title="福励云积分-编辑地址" :back="true"></headerui>
    <!-- 主要内容 -->
    <mt-field label="联系人" v-model="userInfo.name"></mt-field>
    <mt-field label="手机号" v-model="userInfo.mobile" type="number" @change.native="mobileBlur" :state="stateType"></mt-field>
    <mt-cell title="所在区域" is-link class="area" @click.native="popupVisible = true">
      <span style="color: green" v-show="currentArea.length">
        {{currentArea[0] + '-'}}{{currentArea[1] + '-'}}{{currentArea[2]}}
      </span>
    </mt-cell>
    <mt-field label="详细地址" placeholder="详细地址" type="textarea" rows="2" v-model="userInfo.detailAddress" class="textarea"></mt-field>

    <!-- 保存地址 -->
    <div class="keep-btn">
      <mt-button class="keep-button" type="primary" @click="keepAddress">保存</mt-button>
    </div>
    <!-- 底部保存并使用 -->
    <!-- <footer-pay title="保存并使用" @click.native="keepAddress"></footer-pay> -->
    <!-- 省市县 三级联动 -->
    <mt-popup v-model="popupVisible" position="bottom" class="popup">
      <div class="operating">
        <div @click="popupVisible = false">取消</div>
        <div @click="currentArea = selectArea; popupVisible = false;">确定</div>
      </div>
      <mt-picker :slots="slots" value-key="label" @change="onValuesChange" class="cascade"></mt-picker>
    </mt-popup>

  </div>
</template>

<script>
import { CityInfo } from 'common/cityInfo/cityInfo'
import headerui from 'components/headerui/headerui'
import footerPay from 'components/footer-pay/footer-pay'
import { request, requestGet } from 'common/js/request'
import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { mobileValidation } from 'common/js/mobileValidation'

export default {
  props: ['currentAddress'],
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
      selectArea: [],
      // 手机号状态(验证通过没)
      stateType: '',
      // 判断是更改还是新增(edit, add) / 当前更改地址的key
      type: '',
      currentKey: ''
    }
  },
  methods: {
    // 手机验证
    mobileBlur() {
      console.log('手机号失焦')
      var mobileValid = mobileValidation(this.userInfo.mobile)
      if (mobileValid.flag) {
        this.stateType = 'success'
        return true
      } else {
        this.stateType = 'error'
        Toast({
          message: mobileValid.prompt,
          duration: 3000
        })
        return false
      }
    },

    // 级联选择器
    onValuesChange(picker, values) {
      console.log('级联选择器')
      console.log(picker)
      console.log(values)
      if (values[0]) {
        picker.setSlotValues(1, values[0].children)
        if (values[1]) {
          picker.setSlotValues(2, values[1].children)
        }
      }
      // 当前选择数组,只有城市名,没有children之类的属性
      if (values[0] && values[1] && values[2])
        this.selectArea = [values[0].label, values[1].label, values[2].label]
    },
    // 保存并使用
    keepAddress() {
      console.log('保存并使用')
      if (!this.userInfo.name) {
        Toast('请填写姓名')
        return
      }
      if (!this.userInfo.mobile) {
        Toast('请填写电话号')
        return
      } else {
        if (!this.mobileBlur()) return
      }
      console.log(this.currentArea)
      if (this.currentArea.length !== 3) {
        Toast('请填写所在区域')
        return
      }
      if (!this.userInfo.detailAddress) {
        Toast('请填写具体地址')
        return
      }
      // 判断是更改还是新增
      if (this.type === 'add') {
        var url = '/wel/Shop/add_address'
        var data = Object.assign({}, this.userInfo)
        data.currentArea = this.currentArea
        request(url, data).then(res => {
          if (res.success) {
            Toast('保存成功')
            this.$router.go(-1)
            this.$emit('refrash', 'refrash')
          }
        })
      } else {
        // 更改地址的逻辑
        var url = '/wel/Shop/edit_address'
        var data = Object.assign({}, this.userInfo)
        data.currentArea = this.currentArea
        data.id = this.addressKey
        request(url, data).then(res => {
          if (res.success) {
            Toast('保存成功')
            this.$router.go(-1)
            this.$emit('refrash', 'refrash')
          }
        })
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.slots[0].values = CityInfo
    })

    // 不过双保险,又有sessionStorage来确定是更改还是添加
    var ses = sessionStorage.getItem('editAddress')
    if (ses === 'add') {
      this.type = 'add'
    } else {
      this.type = 'edit'
      this.addressKey = sessionStorage.getItem('addressKey')
      // 接收 父组件传过来的值(如果有的话,有就是更改,没有就是添加)
      this.userInfo = this.currentAddress
      this.currentArea = this.currentAddress.currentArea
    }
    console.log(this.userInfo)
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
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 1111;
}
.textarea /deep/ .mint-cell-wrapper {
  align-items: baseline;
}
// 保存按钮
.keep-btn {
  margin-top: 100px;
  text-align: center;
  .keep-button {
    width: 100px;
    display: inline-block;
  }
}
// 底部弹出 级联选择器样式
.popup {
  width: 100%;
  // margin-bottom: 1.333333rem;
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
