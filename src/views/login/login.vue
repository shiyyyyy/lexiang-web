<template>
  <div class="login">
    <headerui></headerui>
    <div class="login-box">
      <div class="title">员工登录</div>
      <div class="input-box">
        <input class="input" placeholder="手机号码" v-model="mobile" @blur="mobileBlur" />
        <div class="prompt">{{mobileVal.prompt}}</div>
        <div class="input">
          <input type="number" placeholder="短信验证码" v-model="captcha" @blur="captchaBlur" />
          <button :class="{'val-button': true, 'disabled': disabled}" :disabled="disabled" @click.stop="obtainCaptcha">{{time.buttonName}}</button>
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
      },
      time: {
        // 60S倒计时
        interval: 60,
        // 倒计时字段
        buttonName: '获取验证码'
      },
      disabled: false
    }
  },
  methods: {
    // 登录按钮
    login() {
      console.log('login')
      if (this.mobileVal.flag && this.captchaVal.flag) {
        var code = this.captcha
        // 请求函数
        var url = '/api/WelPub/login/' + code
        request(url, {}).then(res => {
          console.log(res)
          if (res.success) {
            this.$router.push({ name: 'index' })
          }
        })
      }
    },
    // 手机号 失焦 验证
    mobileBlur() {
      console.log('手机号失焦验证')
      this.mobileVal.flag = mobileValidation(this.mobile).flag
      this.mobileVal.prompt = mobileValidation(this.mobile).prompt
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
      this.mobileBlur()
      if(!this.mobileVal.flag) return
      this.disabled = true
      console.log('获取验证码')
      this.sendMsg()
      var url = '/api/WelPub/send_sms/' + this.mobile
      request(url, {}).then(res => {
        console.log(res)
      })
    },
    // 发送信息后的间隔时间 事件
    sendMsg() {
      let that = this
      let interval = setInterval(function() {
        that.time.buttonName = '（' + that.time.interval + '秒）后重新发送'
        --that.time.interval
        if (that.time.interval < 0) {
          that.time.buttonName = '重新发送'
          that.time.interval = 60
          that.disabled = false
          console.log(that.disabled)
          clearInterval(interval)
        }
      }, 1000)
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
        width: 100px;
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
        border: none;
        position: absolute;
        top: 0.346667rem;
        left: 0.266667rem;
      }
      & .val-button {
        font-size: @font-size-small;
        color: @color-dialog-background;
        background-color: #fff;
        line-height: 0.533333rem;
        border: none;
        border-left: 1px solid @color-background-d;
        padding-left: 0.106667rem;
        outline: none;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
      }
      .disabled {
        background-color: @color-highlight-background;
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


