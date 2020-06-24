// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputBuffer:"",

    swiperList: [{
    id: 0,
    type: 'image',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591500506277&di=7336094349c123e20cf89f450469c089&imgtype=0&src=http%3A%2F%2Fimg1.youzy.cn%2Fcontent2%2Fthumbs%2Fp00427893.jpeg'
  }, {
    id: 1,
      type: 'image',
        url: 'https://wx4.sinaimg.cn/mw690/6fa6f4e3ly1gf1kqybaa7j24mo3341l0.jpg',
  }, {
    id: 2,
    type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591500351549&di=ef2b0b242a09ba05256a32b2a19acf26&imgtype=0&src=http%3A%2F%2Fbbs-fd.zol-img.com.cn%2Ft_s1200x5000%2Fg1%2FM09%2F0A%2F08%2FCg-4jVMxGDeIBYkUAAVpgMiPr4sAALpuwDGSPYABWmY707.jpg'
  },{
    id: 3,
    type: 'image',
        url: 'https://wx3.sinaimg.cn/mw690/6fa6f4e3ly1gfi9d3w9y3j24tc37kx74.jpg'
  }],

    fileList:[{
      fileID:'',
      file_name:'高等数学',
      creator_ID:'123',
      college:'计算机学院',
      file_type:'ppt',
      downloadCount:0
    }]
  },
  onShow:function(e){
    this.getBestList();
  },
  inputBuffer:function(e){
    this.setData({
        inputBuffer:e.detail.value
    })
  },
  search:function(e){
    var that = this
    console.log(this.data.inputBuffer)
    if (this.inputBuffer != "") {
      var temp = JSON.stringify(this.data.inputBuffer)
      wx.navigateTo({
        url: 'result/result?key=' + temp + "&name=搜索结果"
      })
    }
  },
  getBestList:function(e){
    var that = this;
    wx.request({
      url: app.globalData.serviceURL+'/file/bestList',
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
  }
})