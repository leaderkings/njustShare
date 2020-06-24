const app = getApp();
Page({
  data: {
    name: '',
    schoolNum: '',
    point:0,
    role:'学生',
    college: '',
    phone: '',
    index: 3,
    index_Role:0,
    pickerRole: ['学生', '老师'],
    picker: ['机械工程学院', '化工学院', '电子工程与光电技术学院', '计算机科学与工程学院', '经济管理学院', '能源与动力工程学院', '自动化学院', '理学院', '外国语学院', '公共事务学院', '材料科学与工程学院', '环境与生物工程学院', '设计艺术与传媒学院', '钱学森学院', '知识产权学院', '马克思主义学院', '国际教育学院', '继续教育学院', '中法工程师学院', '紫金学院', '泰州科技学院']
    
  },
  nameChange: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phoneChange: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(this.data.picker[e.detail.value]);
    this.setData({
      college: this.data.picker[e.detail.value],
      index: e.detail.value
    })
  },
  PickerChangeRole(e) {
    console.log(e);
    this.setData({
      role: this.data.pickerRole[e.detail.value],
      index_Role: e.detail.value
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal1(e) {
    this.setData({
      modalName: null
    })
  },
  hideModal2(e) {
    if (this.data.name == '') {
      wx.showToast({
        title: '姓名不能为空！',
        image: '../../images/jinggao.png',
        duration: 1500
      })
      return false;
    }
    if (this.data.schoolNum == '') {
      wx.showToast({
        title: '学号不能为空！',
        image: '../../images/jinggao.png',
        duration: 1500
      })
      return false;
    }

    if (this.data.phone == '') {
      wx.showToast({
        title: '电话不能为空！',
        image: '../../images/jinggao.png',
        duration: 1500
      })
      return false;
    } else if (this.data.phone.length != 11) {
      wx.showToast({
        title: '电话长度不正确！',
        image: '../../images/jinggao.png',
        duration: 1500
      })
      return false;
    }
    // if (!(/^[0-9a-zA-Z]$/.test(this.data.schoolNum))){
    //   wx.showToast({
    //     title: '请输入正确的学号！',
    //     icon: 'success',
    //     duration: 1500
    //   })
    //   return false;
    // }
    if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.data.phone))) {
      wx.showToast({
        title: '请输入正确手机号！',
        image: '../../images/jinggao.png',
        duration: 1500
      })
      return false;
    }
    var that = this
    this.setData({
      modalName: null
    })
    console.log(this.data.name)
    wx.request({
      url: app.globalData.serviceURL + '/user/updateInfo',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method: "POST",
      data: {
        openid: app.globalData.openid,
        name: that.data.name,
        schoolNum: that.data.schoolNum,
        college: that.data.college,
        phone: that.data.phone,
      },
      success(res) {
        console.log(res)
      }
    })
    wx.navigateBack({
      delta: 1
    });
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: app.globalData.serviceURL + '/user/myInfo?openid=' + app.globalData.openid,
      success(res) {
        that.setData({
          name: res.data.info.realName,
          schoolNum: res.data.info.schoolNum,
          college: res.data.info.college,
          phone: res.data.info.phone,
          point: res.data.info.point
        })
        for (var i = 0; i < that.data.picker.length; i++) {
          if (that.data.picker[i] == res.data.info.college) {
            that.setData({
              index: i
            })
          }
        }
        console.log(res.data.info)
      }
    })

  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});