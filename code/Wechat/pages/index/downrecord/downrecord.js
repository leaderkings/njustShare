// pages/index/downrecord/downrecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList:[{
      filePath:'',
      size:0,
      createTime:0
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSavedFileList({
      success(res){
        that.setData({
          fileList:res.fileList
        })
      }
    })
  },
  openDocument:function(item){
    var info = item.currentTarget.dataset.item;
    wx.openDocument({
      filePath: info.filePath,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})