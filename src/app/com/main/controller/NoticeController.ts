import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';

export default class NoticeController extends AbstractMaterial {
  public addUserNotice(body: any, back: DataBackAction) {
    const m = Message.build('post', '/notice/sendAddUser')
    m.body = body
    this.appContext.netServer.request(m, back)
  }
}