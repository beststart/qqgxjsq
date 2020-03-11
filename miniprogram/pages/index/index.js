import relationship from "../../utils/relationship.js";
let relations=[];//关系数组
Page({
  data: {//初始数据
    checked:false,//性别默认为男
    selectSex:1,//当前选择的人的性别
    mySex:1,//我的性别
    mine:"我",
    appMsg1:"Ta",
    reverse:false
  },
  changeSex(e){//更改性别
    this.reload();
    this.setData({
      checked:e.detail.value,
      selectSex:e.detail.value?0:1,
      mySex: e.detail.value ? 0 : 1
    });
  },
  calRelation(e){//点击称呼
    if(relations.length<5){//可用范围内追加关系链
      let text = e.target.dataset.text;//获取点击按钮的称呼
      let sex = e.target.dataset.sex;//获取点击按钮的性别
      let relation={//称呼和性别一起存放
        text:text,
        sex:sex
      };
      relations.push(relation);//向数组的最后一项插入内容
      this.getRelationText();//调用处理关系链的方法
      this.setData({
        appMsg3:"",
        mine:"我",
        appMsg1:relations[relations.length-1].sex==1?"他":"她",
        reverse:false
      });
    }else{//超出范围直接给出错误结果，清空之前所选。
      this.setData({
        appMsg3:"关系太远，装作不认识吧！",
        selectSex:1
      });
      relations=[];
    }
    
  },
  getRelationText(){//拆分数组组装为关系链字符串
    let aText="";
    if(relations.length>0){
      for(let i=0;i<relations.length;i++){
        if(i==0){
          aText=relations[i].text;
        }else{
          aText+="的"+relations[i].text;
        }
      }
      this.setData({
        appMsg2:aText,
        selectSex:relations[relations.length-1].sex,
        appMsg1:relations[relations.length-1].sex==1?"他":"她"
      });
    }else{
      this.reload();
    }
  },
  backRelation(){//退格方法
    if(relations.length>0){
      relations.pop();//删除数组中最后一项
      this.getRelationText();
      this.setData({
        mine:"我",
        appMsg1:relations[relations.length-1].sex==1?"他":"她",
        appMsg3:"",
        reverse:false
      });
    }
  },
  reload(){//重载方法
    relations=[];
    this.setData({
      mine:"我",
      appMsg1:"Ta",
      appMsg2:"",
      appMsg3:"",
      checked:false,
      mySex:1,
      selectSex:1,
      reverse:false
    });
  },
  getResult(){//等于号触发
    if (this.data.appMsg2){
      //封装数据
      let obj={
        text:this.data.appMsg2,
        sex:this.data.mySex,
        reverse:false
      };
      let result=relationship(obj);
      this.setData({
        appMsg3:result,
        mine:"我",
        appMsg1:relations[relations.length-1].sex==1?"他":"她",
        reverse:false
      });
      let logObj = {
        search: this.data.appMsg2,
        result: this.data.appMsg3,
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
  reverse(){//切换关系⇋
    if(this.data.appMsg3){
      if(!this.data.reverse){
        this.setData({
          appMsg1: "我",
          mine: relations[relations.length - 1].sex==1?"他":"她"
        });
      }else{
        this.setData({
          mine: "我",
          appMsg1: relations[relations.length - 1].sex == 1 ? "他" : "她"
        });
      }
      let obj = {
        text: this.data.appMsg2,
        sex: this.data.mySex,
        reverse: !this.data.reverse
      };
      let result = relationship(obj);
      this.setData({
        appMsg3: result,
        reverse:!this.data.reverse
      });

      
    }
  },
  toAbout(){//问号触发
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },
  love(){//♥触发
    /*
     *获取当前用户数据库点赞数
     */
    //初始化数据库
    const db=wx.cloud.database();
    //查询数据库中点过赞的用户
    db.collection("follow_count").doc("love_id").get().then(res=>{
      let userIds=res.data.user_id;
      //获取当前用户openid
      wx.cloud.callFunction({
        name: "login"
      }).then(res => {
        let openid=res.result.openid;
        //当前用户不在数组中点赞则有效
        if(userIds.indexOf(openid)<0){
          //追加点赞数量
          wx.cloud.callFunction({
            name: "loveCount",
            data:{
              userId: openid
            },
            success: res => {
              if(res.result.stats.updated==1){
                wx.showToast({
                  title: '谢谢支持，点赞成功！+1',
                  icon: "none"
                });
              }
            }
          });
        }else{
          wx.showToast({
            title: '您之前已经点过赞了哦',
            icon: "none"
          });
        }
      });
    });

    
    
  },
  onLoad: function () {
  },
  onShareAppMessage(){
    return {
      title:"来看看你和Ta是什么关系吧！",
      path:"/pages/index/index",
      imageUrl:"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1580611197&di=fff27a320a46ea2571b320c3cc9e9897&src=http://5b0988e595225.cdn.sohucs.com/images/20180928/cb03fae9c9314aaf8cbe20293769411b.jpeg"
    };
  }
})
