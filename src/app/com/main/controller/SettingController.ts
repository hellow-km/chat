import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';

export default class SettingController extends AbstractMaterial {
  public getSettingByUserId(userId: string, back: DataBackAction) {
    const m: any = Message.build('get', '/setting/getAddUserSetting')
    m.params = {
      userId: userId
    }
    this.appContext.netServer.request(m, back)
  }
}