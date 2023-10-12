import {
  request
} from "./request"
import navList from "../mock/navList.js"

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