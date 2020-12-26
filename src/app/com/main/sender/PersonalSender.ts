import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';

export default class PersonalSender extends AbstractMaterial {
  public getUser() {
    const m=Message.build('get','')
  }
}