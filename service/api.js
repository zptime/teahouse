import {
  request
} from "./request"
import navList from "../mock/navList.js"
import newsList from "../mock/newsList.js"

const isMock = true;

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