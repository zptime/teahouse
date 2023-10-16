import {
  request
} from "./request"
import navList from "../mock/navList.js"
import newsList from "../mock/newsList.js"
import productList from "../mock/productList.js"

const isMock = false;

// 获取首页导航
export function getNavList() {
  if (isMock) {
    return Promise.resolve(navList)
  }
  return request({
    url: "/nav/get"
  })
}

// 获取新闻数据
export function getNewsList(data) {
  if (isMock) {
    return Promise.resolve(newsList)
  }
  return request({
    url: "/news/get",
    data
  })
}

// 获取产品数据
export function getProductList(data) {
  if (isMock) {
    return Promise.resolve(productList)
  }
  return request({
    url: "/product/getlist",
    data
  })
}