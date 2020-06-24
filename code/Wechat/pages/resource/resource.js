// pages/resource.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: [0, 0, 0],
    array1: ['机械工程学院', '化工学院', '电子工程与光电技术学院', '计算机科学与工程学院', '经济管理学院',
      '能源与动力工程学院', '自动化学院', '理学院', '外国语学院', '公共事务学院', '材料科学与工程学院', '环境与生物工程学院', '设计艺术与传媒学院', '钱学森学院', '知识产权学院', '马克思主义学院', '国际教育学院', '继续教育学院', '中法工程师学院', '紫金学院', '泰州科技学院'
    ],
    array2: ['机械', '兵器'],
    array3: ['大一上', '大一下', '大二上', '大二下', '大三上', '大三上', '大四上', '大四下'],
    file_list:[{
      fileID:'',
      file_name:'高等数学',
      creator_ID:'123',
      college:'计算机学院',
      file_type:'ppt',
      downloadCount:0
    },
    {
      fileID:'',
      file_name:'高等数学',
      creator_ID:'123',
      college:'计算机学院',
      file_type:'ppt',
      downloadCount:0
    }]
  },
  onLoad: function () {
    console.log(typeof this.data.index[1])
  },
  collageChange: function (e) {
    let temp = 'index[0]';
    this.setData({
      [temp]: e.detail.value
    })
    this.changeArray();
  },
  majorChange: function (e) {
    let temp = 'index[1]';
    this.setData({
      [temp]: e.detail.value
    })
    this.changeArray();
  },
  gradeChange: function (e) {
    console.log(typeof e.detail.value)
    let temp = 'index[2]';
    this.setData({
      [temp]: e.detail.value
    })
    this.changeArray();
  },
  changeArray: function () {
    var data = {
      index: this.data.index,
      array1: this.data.array1,
      array2: this.data.array2,
      array3: this.data.array3,
    }
    console.log(typeof data.index[0]);
    switch (this.data.index[0]) {
      case '3':
        data.array2 = ['网络工程', '人工智能', '计算机科学与技术', '软件工程'];
        break;
    }
    this.setData(data);
    this.getFileList();
  },
  getFileList:function(){
    var that = this;
    wx.request({
      url: app.globalData.serviceURL+'/file/fileList',
      method:'GET',
      data:{
        college:that.data.array1[that.data.index[0]],
        major:that.data.array2[that.data.index[1]],
        grade:that.data.array3[that.data.index[2]],
      },
      success(res) {
        that.setData({
          file_list: res.data.result
        })
        console.log(res)
      }
    })
  },
  onShow:function(e){
    this.getFileList();
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