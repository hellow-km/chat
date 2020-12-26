import User from '@/app/com/bean/User';

export default class Group {
  public id: string = '';
  public number: number = 0; // 帐号
  public name: string = '';
  public head: string = ''; // 照片
  public avatar: string = '/assets/images/main/pane/no-user.png'; // 自定义照片，（当用户选择系统头像时为空）
  public remark: string = '';
  public classification: string = ''; // 分类
  public publicNotice: string = ''; // 公告
  public introduce: string = ''; // 介绍
  public position: string = '';
  public group: string | number = 0 //群分组
  public belongUserId: string = "" //群主
  public persons: User[] = [] //人
  public active: boolean = false
}
