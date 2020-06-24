// pages/index/uprecord/uprecord.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cordList:[{
      fileID:'',
      file_name:'高等数学',
      downloadCount:0
    },
    {
      fileID:'',
      file_name:'高等数学',
      downloadCount:0
    }
  ]
  },
  deleteCrod:function(item){
    var cord = item.currentTarget.dataset.item
    console.log(item)
    var that = this;
    wx.request({
      url: app.globalData.serviceURL+'/file/delete?fileID=' + cord.fileID,
      method:"DELETE",
      success(res){
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        that.getUpcrod();
      }
    })
  },
  getUpcrod:function(){
    var that = this;
    wx.request({
      url: app.globalData.serviceURL+'/file/getCrodList?openid=' + app.globalData.openid,
      success(res){
        console.log("yes crod")
        that.setData({
          cordList:res.data.result
        })
        console.log(that.data.cordList)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUpcrod();
    console.log(this.data.cordList)
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