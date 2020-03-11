import relationship from "../../utils/relationship.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getValue(e){
    this.setData({
      show:false,
      val:e.detail.value
    });
  },
  getRelation(){
    if(this.data.val){
      let obj={
        text:this.data.val,
        sex:-1,
        type:"chain"
      };
      let result=relationship(obj);
      this.setData({
        show:true,
        relation:result.length==0?"无结果":result
      });
      let logObj = {
        search: this.data.val,
        result: result.length==0?"无结果":result,
        time: new Date().getTime()
      }
      let records = [];
      if (wx.getStorageSync("records")) {
        records = wx.getStorageSync("records");
        records.push(logObj);
      } else {
        records.push(logObj);
      }
      wx.setStorageSync("records", records);
    }

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage(){
    return {
      title:"来看看你和Ta是什么关系吧！",
      path:"/pages/index/index",
      imageUrl:"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1580611197&di=fff27a320a46ea2571b320c3cc9e9897&src=http://5b0988e595225.cdn.sohucs.com/images/20180928/cb03fae9c9314aaf8cbe20293769411b.jpeg"
    };
  }
})