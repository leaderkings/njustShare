// pages/main/result/result.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buffer:"",
    fileList:[
      {
        fileID:'',
        file_name:'高等数学',
        creator_ID:'123',
        college:'计算机学院',
        file_type:'ppt',
        downloadCount:0
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  loadList:function(e){
    var that = this;
    wx.request({
      url: app.globalData.serviceURL+'/file/getListByKey',
      data:{
        data:"%"+that.data.buffer+"%"
      },
      success(res){
        that.setData({
          fileList:res.data.result
        })
      }
    })
  },
  downLoad:function(item){
    var info = item.currentTarget.dataset.item
    wx.request({
      url: app.globalData.serviceURL+'/file/checkPoint',
      data:{
        openid:app.globalData.openid
      },
      success(e){
        if(e.data.result == 'yes'){
          wx.downloadFile({
            url: app.globalData.serviceURL + '/' + info.file_name + '.' + info.file_type,
            success(res){
              console.log(res);
              var tempPath = res.tempFilePath;
              wx.saveFile({
                tempFilePath: tempPath,
                success(e){
                  var idNum = app.globalData.openid
                  wx.request({
                    url:  app.globalData.serviceURL+'/file/download?openid=' + idNum + '&fileID=' + info.fileID,
                    method:"POST",
                    success(m){
                      console.log(app.globalData.openid)
                      wx.openDocument({
                        filePath: e.savedFilePath
                      })
                      wx.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  })
                  
                }
              })
            }
          })
        }
        else{
          wx.showModal({
            title: '错误',
            content: '您当前积分不足',
            success: function (res) {
              if (res.confirm) {  
                console.log('点击确认回调')
              } else {   
                console.log('点击取消回调')
              }
            }
          })
        }
      }
    })
  },
  onLoad: function (options) {
    let temp=JSON.parse(options.key)
    this.setData({
      buffer:temp
    })
    this.loadList();
  },

  back:function(){
    wx.navigateBack({
    })
  },
  toDetail:function(e){
    var association = this.data.associations[e.currentTarget.dataset.index]
    var data = JSON.stringify(association)
    wx.navigateTo({
      url: '../detail/detail?data=' + data,
    })
  }
})