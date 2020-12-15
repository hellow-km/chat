
export default class User {

  public id: string = '';
  public account: string = ''; // 帐号
  public email: string = ''; // 电子信箱
  public mobile: string = ''; // 手机
  public password: string = ''; // 密码

  // /基本信息
  public head: string = ''; // 照片
  public avatar: string = '/assets/images/main/pane/no-user.png'; // 自定义照片，（当用户选择系统头像时为空）
  public nickName: string = ''; // 昵称
  public gender: string = '3'; // 性别 1:男 2：女 3：保密 4:男->女过程中 5：女->男过程中
  public introduce: string = "" // 介绍
  public QQ: string = ''; // qq
  public nation: string = ''; // 民族
  public birthDate: string = ''; // 出生日期
  public age: string = ''; // 年龄
  public identityCard: string = ''; // 身份证号码
  public politicsStatus: string = ''; // 政治面貌
  public maritalStatus: string = ''; // 婚姻状况
  public school: string = ''; // 毕业学校
  public education: string = ''; // 学历
  public graduationDate: string = ''; // 毕业时间
  public workDate: string = ''; // 参加工作时间
  public professional: string = ''; // 专业
  public nativePlace: string = ''; // 籍贯
  public zipCode: string = ''; // 邮政编码
  public homeAddress: string = ''; // 家庭地址
  public locationAddress: string = ''; // 所在地址
  public remark: string = ''; // 备注
  public constellation: string = ''; // 星座
  public blood: string = ''; // 血型
  public signature: string = ""; // 签名
  public name: string = ""; // 姓名
  public active: boolean = false;
  public gray: boolean = true; //离线
  public red: boolean = false; //消息
  public redCount: number = 0; //消息个数
}