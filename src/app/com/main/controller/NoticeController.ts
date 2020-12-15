import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';

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
    if (method == "get") {
      const m: any = Message.build(method, url)
      m.params = data
      this.appContext.netServer.request(m, back)
    } else if (method == "post") {
      const m: any = Message.build(method, url)
      m.body = data
      this.appContext.netServer.request(m, back)
    }
  }
}