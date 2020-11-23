
export default class User {

  public id: string = '';
  public account: string = ''; // 帐号
  public email: string = ''; // 电子信箱
  public mobile: string = ''; // 手机
  public password: string = ''; // 密码

  // /基本信息
  public head: string = ''; // 照片
  public avatar: string = ''; // 自定义照片，（当用户选择系统头像时为空）
  public nickname: string = ''; // 昵称
  public gender: string = '3'; // 性别 1:男 2：女 3：保密 4:男->女过程中 5：女->男过程中
  public introduce: string = ""
}