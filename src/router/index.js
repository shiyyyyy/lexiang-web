import Vue from 'vue'
import Router from 'vue-router'

// 引入 登录页面
import login from 'views/login/login'
// 首页
import index from 'views/index/index'
// 商品详情
import goodsDetails from 'views/goodsDetails/goodsDetails'
import pay from 'components/pay/pay'

// 购物车
import shopCart from 'views/shopCart/shopCart'

// 我的
import my from 'views/my/my'
import myOrder from 'components/my-order/my-order'
import orderDetails from 'components/orderDetails/orderDetails'

import myIntegral from 'components/my-integral/my-integral'

import myAddressList from 'components/my-address-list/my-address-list'
import address from 'components/address/address'



Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: {
        name: 'index'
      }
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'index',
      path: '/index',
      component: index
    },
    {
      name: 'goodsDetails',
      path: '/goodsDetails/:id',
      component: goodsDetails,
      children: [{
        name: 'pay',
        path: '/goodsDetails/:id/pay',
        component: pay
      }]
    },
    {
      name: 'shopCart',
      path: '/shopCart',
      component: shopCart
    },
    {
      name: 'my',
      path: '/my',
      component: my,
      children: [{
          name: 'myOrder',
          path: '/my/myOrder',
          component: myOrder,
          children: [{
            name: 'orderDetails',
            path: '/my/myOrder/orderDetails',
            component: orderDetails
          }]
        },
        {
          name: 'myIntegral',
          path: '/my/myIntegral',
          component: myIntegral
        },
        {
          name: 'myAddressList',
          path: '/my/myAddressList',
          component: myAddressList,
          children: [{
            name: 'address',
            path: '/my/myAddressList/address',
            component: address
          }]
        }
      ]
    }
  ]
})
