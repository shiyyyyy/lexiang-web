<template>
    <div class="login">
        <headerui :back="true"></headerui>
        <div class="login-box">
            <div class="title">员工登录</div>
            <div class="input-box">
                <input class="input" placeholder="手机号码" v-model="mobile" @blur="mobileBlur" />
                <div class="prompt">{{mobileVal.prompt}}</div>
                <div class="input">
                    <input type="number" placeholder="短信验证码" v-model="captcha" @blur="captchaBlur" />
                    <span @click="obtainCaptcha">获取验证码</span>
                </div>
                <div class="prompt">{{captchaVal.prompt}}</div>
                <mt-button class="btn" size="normal" @click="login">登录</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import { request } from 'common/js/request'
import { mobileValidation } from 'common/js/mobileValidation'
import headerui from 'components/headerui/headerui.vue'

export default {
  data() {
    return {
      // input
      mobile: '',
      captcha: '',
      // 验证提示
      mobileVal: {
        flag: false,
        prompt: ''
      },
      captchaVal: {
        flag: false,
        prompt: ''
      }
    }
  },
  methods: {
    // 登录按钮
    login() {
      console.log('login')
      if (this.mobileVal.flag && this.captchaVal.flag) {
        // 请求函数
      }
    },
    // 手机号 失焦 验证
    mobileBlur() {
      console.log('手机号失焦验证')
      console.log(this.mobile)
      this.mobileVal.flag = mobileValidation(this.mobile).flag
      this.mobileVal.prompt = mobileValidation(this.mobile).prompt
      console.log(this.mobileVal)
    },
    // 验证码失焦 验证
    captchaBlur() {
      console.log('验证码失焦')
      console.log(this.captcha)
      if (this.captcha === '') {
        this.captchaVal.flag = false
        this.captchaVal.prompt = '验证码不能为空'
      } else {
        this.captchaVal.flag = true
        this.captchaVal.prompt = ''
      }
    },
    // 点击获取验证码
    obtainCaptcha() {
      console.log('获取验证码')
    }
  },
  components: {
    headerui
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/less/variable');
.login {
  width: 100%;
  height: 100vh;
  padding-top: 1px;
  background-color: @color-background-d;
}
.login-box {
  width: 9rem;
  margin: 4rem auto 0;
  background-color: #fff;

  & .prompt {
    font-size: @font-size-small-s;
    color: @color-sub-theme;
    line-height: 0.4rem;
    text-align: left;
    text-indent: 2em;
  }
  & .title {
    font-size: @font-size-medium-x;
    line-height: 1.6rem;
    border-bottom: 1px solid @color-background-d;
  }
  & .input-box {
    width: 90%;
    margin: 0.5rem auto 0;
    & .input {
      width: 80%;
      height: 0.906667rem;
      line-height: 0.906667rem;
      border: 1px solid @color-background-d;
      padding: 0.106667rem 0.266667rem;
      display: inline-block;
      position: relative;
      &:nth-child(3) {
        margin-top: 0.533333rem;
        line-height: 0.906667rem;
      }
      & input {
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
        border: none;
        position: absolute;
        top: 0.346667rem;
        left: 0.266667rem;
      }
      & span {
        font-size: @font-size-small;
        color: @color-dialog-background;
        line-height: 0.533333rem;
        border-left: 1px solid @color-background-d;
        padding-left: 0.106667rem;
        position: absolute;
        top: 0.293333rem;
        right: 0.16rem;
      }
    }
    & .btn {
      width: 40%;
      margin-top: 0.533333rem;
      margin-bottom: 1.066667rem;
    }
  }
}
</style>


