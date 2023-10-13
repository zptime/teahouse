// pages/index/index.js
import {
  getNavList,
  getNewsList
} from "../../service/api"
import {
  formatNum,
  formatTime
} from "../../utils/util"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      '/static/images/banner0.jpg',
      '/static/images/banner1.jpg',
      '/static/images/banner2.jpg',
      '/static/images/banner3.jpg'
    ],
    navList: [],
    newList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getNavData();
    this.getNewsData();
  },

  getNavData() {
    getNavList().then(res => {
      this.setData({
        navList: res.data
      })
    })
  },

  getNewsData() {
    getNewsList({
      limit: 3,
      size: 0
    }).then(res => {
      this.setData({
        newList: res.data.map(o => {
          o.view_count = formatNum(o.view_count)
          o.publish_date = formatTime(o.publish_date, 5)
          return o
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})