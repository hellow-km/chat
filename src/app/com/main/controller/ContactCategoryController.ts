import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';

export default class ContactCategoryController extends AbstractMaterial {
  public addContactCategory(name: string, back: DataBackAction): void {
    const body = {
      name: name
    }
    const m = Message.build('post', '/module/addContactCategory')
    m.body = body
    this.appContext.netServer.request(m, back)
  }

  public addGroupCategory(name: string, back: DataBackAction): void {
    const body = {
      name: name
    }
    const m = Message.build('post', '/module/addGroupCategory')
    m.body = body
    this.appContext.netServer.request(m, back)
  }
}