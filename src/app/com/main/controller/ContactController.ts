import AbstractMaterial from '@/app/base/AbstractMaterial';
import ContactSender from '@/app/com/main/sender/ContactSender';
import DataBackAction from '@/app/base/net/DataBackAction';

export default class ContactController extends AbstractMaterial {
  public getContactAddVerifySetting(userId: string, back?: DataBackAction, parallel?: boolean): void {
    const contactSender: ContactSender = this.appContext.getMaterial(ContactSender);
    contactSender.getContactAddVerifySetting(userId, back, parallel);
  }
}