// 个人中心
import wxRequest from '@/config/wxRequest'
import { API_PATH } from '@/config/env'

// 用户登录
export const weixinlogin = (ajaxParams) => wxRequest(API_PATH + '/auth/login', ajaxParams, 'GET')

//用户信息
export const apiUserInfo = (ajaxParams) => wxRequest(API_PATH + '/auth/show', ajaxParams, 'GET')

//保存用户信息
export const apiSaveUserInfo = (ajaxParams) => wxRequest(API_PATH + '/auth/save', ajaxParams, 'POST')

//发送验证码
export const apiSendCode = (ajaxParams) => wxRequest(API_PATH + '/sms/send-sms-code', ajaxParams, 'POST')

//房源列表
export const apiHouseList = (ajaxParams) => wxRequest(API_PATH + '/house/list/1', ajaxParams, 'GET')

//房源详细信息
export const apiHouseDetail = (ajaxParams) => wxRequest(API_PATH + `/house/show/${ajaxParams.id}`, ajaxParams, 'GET')

//收藏房源
export const apiHouseCollect = (ajaxParams) => wxRequest(API_PATH + '/house/collect', ajaxParams, 'POST')

//我的收藏
export const apiCollectList = (ajaxParams) => wxRequest(API_PATH + `/house/my-collection/1`, ajaxParams, 'GET')

//我的订单
export const apiOrderList = (ajaxParams) => wxRequest(API_PATH + '/order/list/1', ajaxParams, 'GET')

//订单支付
export const apiOrderPay = (ajaxParams) => wxRequest(API_PATH + '/order/pay', ajaxParams, 'POST')
