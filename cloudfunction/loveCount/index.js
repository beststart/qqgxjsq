// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database();
const command=db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const log = cloud.logger();
    try{
      return await db.collection("follow_count").doc("love_id").update({
          data:{
            love_count:command.inc(1),
            user_id: command.push(event.userId)
          }
      });
    }catch(e){
      console.error(e);
    }
}