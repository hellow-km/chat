import AbstractMaterial from '@/app/base/AbstractMaterial';
import ContactClient from '@/app/com/main/http/main/ContactClient';

export default class ContactController extends AbstractMaterial {
  public getContactAddVerifySetting(userId: string, back?: (data: any) => void, prompt?: boolean): void {
    const contactClient: ContactClient = this.appContext.getMaterial(ContactClient);
    contactClient.getContactAddVerifySetting(userId, back, prompt);
  }
}