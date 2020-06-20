// pages/resource.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: [0, 0, 0, 0],
    array1: ['机械工程学院', '化工学院', '电子工程与光电技术学院', '计算机科学与工程学院', '经济管理学院',
      '能源与动力工程学院', '自动化学院', '理学院', '外国语学院', '公共事务学院', '材料科学与工程学院', '环境与生物工程学院', '设计艺术与传媒学院', '钱学森学院', '知识产权学院', '马克思主义学院', '国际教育学院', '继续教育学院', '中法工程师学院', '紫金学院', '泰州科技学院'
    ],
    array2: ['机械', '兵器'],
    array3: ['大一上', '大一下', '大二上', '大二下', '大三上', '大三上', '大四上', '大四下'],
    array4: [],
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
  classChange: function (e) {
    let temp = 'index[3]';
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
      array4: this.data.array4,
    }
    console.log(typeof data.index[0]);
    switch (this.data.index[0]) {
      case '3':
        data.array2 = ['网络工程', '人工智能', '计算机科学与技术', '软件工程'];
        switch (data.index[1]) {
          case 0:
            switch (data.index[2]) {
              case 0:
                data.array4 = ['工程制图', '高等数学Ⅰ', '线性代数'];
                break;
              case '1':
                data.array4 = ['大学物理Ⅰ', '高等数学Ⅱ', '程序基础设计Ⅰ'];
                break;
              case '2':
                data.array4 = ['离散数学', '数据结构', '电路'];
                break;
              case '3':
                data.array4 = ['模拟电子线路', '计算机网络', '算法设计与分析'];
                break;
              case '4':
                data.array4 = ['计算机组成原理', '编译原理', '软件课程设计Ⅰ'];
                break;
              case '5':
                data.array4 = ['信息安全基础及应用', '嵌入式系统', '操作系统'];
                break;
              case '6':
                data.array4 = ['硬件设计Ⅰ', '计算机网络综合实验', '软件课程设计Ⅲ'];
                break;
              case '7':
                data.array4 = ['毕业设计'];
                break;
            }
            break;
        }
        break;
    }
    this.setData(data);
  }
})