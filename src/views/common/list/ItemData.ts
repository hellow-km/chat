export default class ItemData {
  public active: boolean = false;
  public id: string = ''; //要加的用户id
  public name: string = ''; //用户名
  public avatar: string = '/assets/images/common/head/user/1.png'; //用户头像
  public gray: boolean = true; //离线
  public red: boolean = false; //消息
  public redCount: number = 0; //消息个数
}
