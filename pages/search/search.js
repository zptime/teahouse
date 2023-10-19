// pages/search/search.js
import {
  getProductList
} from "../../service/api"

const HISTORY_NAME = 'historyList';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    historyList: [],
    productList: [],
    isEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let list = wx.getStorageSync(HISTORY_NAME) || [];
    console.log(list);
    if (list && list.length) {
      this.setData({
        historyList: list
      })
    }
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    console.log('onSearch：' + this.data.value);
    let list = this.data.historyList || [];
    list.unshift(this.data.value);
    list = [...new Set(list)];
    this.setData({
      historyList: list
    })
    wx.setStorageSync(HISTORY_NAME, list)
    this.getData()
  },
  onClear() {
    this.setData({
      value: '',
      productList: [],
      isEmpty: false
    })
  },

  handleRemove() {
    this.setData({
      value: [],
      historyList: []
    })
    wx.setStorageSync(HISTORY_NAME, [])
  },

  handleHisItem(evt) {
    console.log(evt);
    this.setData({
      value: evt.currentTarget.dataset.value
    });
    this.getData();
  },

  getData() {
    if (!this.data.value) return;

    getProductList({
      limit: 10,
      "keyword": this.data.value
    }).then(res => {
      this.setData({
        isEmpty: res.data.length === 0,
        productList: res.data
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