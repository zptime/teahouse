import {
  request
} from "./request"
import navList from "../mock/navList.js"
import newsList from "../mock/newsList.js"
import newsDetail from "../mock/newsDetail"
import productList from "../mock/productList.js"
import productDetail from "../mock/productDetail"

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

// 获取新闻详情
export function queryNewsDetail(id) {
  if (isMock) {
    return Promise.resolve(newsDetail)
  }
  return request({
    url: "/news/detail",
    data: {
      id
    }
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

// 获取产品详情
export function queryProductDetail(id) {
  if (isMock) {
    return Promise.resolve(productDetail)
  }
  return request({
    url: "/product/detail",
    data: {
      id
    }
  })
}