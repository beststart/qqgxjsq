//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onShow() {
    let records = wx.getStorageSync('records')||[];
    for (let i = 0; i < records.length; i++) {
      let time=util.formatTime(new Date(records[i].time));
      records[i].time=time;
    }   
    this.setData({
      logs: records.reverse(),
      show:records.length==0
    })
  },
  onShareAppMessage(){
    return {
      title:"来看看你和Ta是什么关系吧！",
      path:"/pages/index/index",
      imageUrl:"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1580611197&di=fff27a320a46ea2571b320c3cc9e9897&src=http://5b0988e595225.cdn.sohucs.com/images/20180928/cb03fae9c9314aaf8cbe20293769411b.jpeg"
    };
  }
})
