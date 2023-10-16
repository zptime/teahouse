// pages/news/news.js
import {
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
    newsList: [],
    loading: false,
    isEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getNewsData()
  },

  getNewsData(size = 0) {
    this.setData({
      loading: true
    })
    getNewsList({
      limit: 8,
      size: size
    }).then(res => {
      const data = res.data.map(o => {
        o.view_count = formatNum(o.view_count)
        o.publish_date = formatTime(o.publish_date, 5)
        return o
      });
      let oldData = this.data.newsList;
      let newData = [...oldData, ...data];
      this.setData({
        newsList: newData,
        loading: false,
        isEmpty: newData.length === res.total ? true : false
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
    if (this.data.isEmpty) return;
    this.getNewsData(this.data.newsList.length);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})