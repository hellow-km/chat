export default class ContactAddApplyData {
  public sendUserId: string = ''; // 添加联系人的请求用户
  public targetUserId: string = ''; // 被添加的用户
  public question: string = ''; //
  public answer: string = ''; // 答案(当验证方式为回答问题时)
  public message: string = ''; // 附加消息
  public categoryId: string | number = 0; // 分组id
  public remark: string = ''; // 备注名
  public verifyType: number = 0
  public answerList: Array<any> = []
}
