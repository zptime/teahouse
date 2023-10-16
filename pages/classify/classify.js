// pages/classify/classify.js
import {
  getNavList,
  getProductList
} from "../../service/api"

let navId = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    navId: '',
    navList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.getNavData();
    this.getProductList();
  },

  async getNavData() {
    let res = await getNavList();
    this.setData({
      navList: res.data,
      navId: res.data[0]._id
    })
    navId = res.data[0]._id
  },

  getProductList() {
    getProductList({
      // "navid": "63b9600be1a35c358c18483b", //分类ID
      navid: this.data.navList[this.data.active]._id,
      "limit": 10, // 获取多少条
      "size": 0, // 分页从多少页开始
    }).then(res => {
      console.log("产品数据：", res.data)
    })
  },

  onChange(evt) {
    console.log(evt)
    this.setData({
      active: evt.detail.index,
      navId: this.data.navList[evt.detail.index]._id
    })
    this.getProductList();
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