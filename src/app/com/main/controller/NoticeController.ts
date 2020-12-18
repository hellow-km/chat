import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import HttpUtil from '@/app/lib/util/HttpUtil';

export default class NoticeController extends AbstractMaterial {
  public addUserNotice(body: any, back: DataBackAction) {
    this.request('post', '/notice/sendAddUser', body, back)
  }

  public getAddUserNotice(params: any, back: DataBackAction) {
    this.request('get', '/notice/addUserNoctice', params, back)
  }

  public acceptUser(body: any, back: DataBackAction) {
    this.request("post", "/user/addUserToList", body, back)
  }

  private request(method: string, url: string, data: any, back: DataBackAction) {
    HttpUtil.request(method, url, data, back)
  }
}