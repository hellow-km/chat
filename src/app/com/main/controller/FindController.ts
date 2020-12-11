import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import DataBackAction from '@/app/base/net/DataBackAction';

export default class FindController extends AbstractMaterial {
  public searchUser(userId: string, text: string, back: DataBackAction) {
    const m = Message.build('post', '/find/searchUser')
    m.body = {
      userId: userId,
      text: text
    }
    this.appContext.netServer.request(m, back)
  }
}