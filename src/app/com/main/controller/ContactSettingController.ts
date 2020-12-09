import AbstractMaterial from '@/app/base/AbstractMaterial';
import ContactHarassSetting from '@/app/com/bean/ContactHarassSetting';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';

export default class ContactSettingController extends AbstractMaterial {
  public updateSetting(setting: ContactHarassSetting, back: DataBackAction) {
    const m = Message.build('post', '/menu/updateSetting')
    m.body = setting
    this.appContext.netServer.request(m, back)
  }

  public getSetting(userId: string, back: DataBackAction) {
    const m: any = Message.build('get', '/menu/getSetting')
    m.params = {
      userId: userId
    }
    this.appContext.netServer.request(m, back)
  }
}