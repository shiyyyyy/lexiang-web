export function mobileValidation(mobile) {
  const reg = /(?:^1[3456789]|^9[28])\d{9}$/
  if (mobile === '') {
    return {
      flag: false,
      prompt: '手机号不能为空'
    }
  } else if (reg.test(mobile)) {
    return {
      flag: true,
      prompt: ''
    }
  } else {
    return {
      flag: false,
      prompt: '请输入正确手机号'
    }
  }
}