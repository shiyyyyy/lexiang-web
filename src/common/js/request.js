import axios from 'axios'

export function request(url, data) {
  var domain = '/po-back'
  var url = domain + url
  var data = Object.assign({}, data, {

  })

  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
    http_response => {
        console.log('resolve')
        console.log(http_response)
        var res = http_response.data;
        if (res.success) {
          // console.log("正确")
          return resolve && resolve(res)
        }
        if (res.message == -1) {
          console.log("未登录,跳转登录页")
          //跳转至login
          window.location = './#/login'
        } else {
          // console.log("错误")                
          if (reject) {
            console.log("自己验证")
            reject && reject(res.message)
          } else {
            console.log("后台验证")
            alert(res.message)
          }
        }
      },
      http_response => {
        console.log('reject')
        console.log(http_response)
        // ajax_failure(http_response.data,reject);
      }
    );
  })
}

export function requestGet(url, data) {
  // var domain = 'localhost/'
  // var domain = "/po-back/api/"
  // var domain = "/proxy"
  var domain = '/po-back'
  
  var url = domain + url

  // return axios.get(url, {
  //     params: data
  //   })
  //   .then((res) => {
  //     return Promise.resolve(res.data.data)
  //   })
  //   .catch((err) => {
  //     return console.log(err + "requestJS 17 error")
  //   })
  console.log(data)
  return new Promise((resolve, reject) => {
    axios.get(url,{
      params: data
    }).then(
    http_response => {
        console.log('resolve')
        console.log(http_response)
        var res = http_response.data;
        if (res.success) {
          console.log("正确")
          return resolve && resolve(res)
        }
        if (res.message == -1) {
          console.log("未登录,跳转登录页")
          //跳转至login
          window.location = './#/login'
        } else {
          console.log("错误")                
          if (reject) {
            console.log("自己验证")
            reject && reject(res.message)
          } else {
            console.log("后台验证")
            alert(res.message)
          }
        }
      },
      http_response => {
        console.log('reject')
        console.log(http_response)
        // ajax_failure(http_response.data,reject);
      }
    );
  })
}
