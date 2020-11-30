import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import DataBackAction from '@/app/base/net/DataBackAction';

export default class ContactSender extends AbstractMaterial {
  public getContactAddVerifySetting(userId: string, back?: DataBackAction, parallel?: boolean): void {
    const m = Message.build('', '1.1.0006');
    m.body = {};
    m.body.userId = userId;
    this.appContext.netServer.send(m, back, parallel);
  }
}