import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';

export default class SelectController extends AbstractMaterial {
  public getUserCategory(userId: string, back: DataBackAction) {
    const m: any = Message.build('get', '/getSelect/getUserCategory')
    m.params = {
      userId
    }
    this.appContext.netServer.request(m, back)
  }

  public getGroupCategory(userId: string, back: DataBackAction) {
    const m: any = Message.build('get', '/getSelect/getGroupCategory')
    m.params = {
      userId
    }
    this.appContext.netServer.request(m, back)
  }
}