import Message from '@/app/base/message/Message';
import AccountClient from '@/app/com/main/http/main/AccountClient';
import AppContext from '@/app/base/AppContext';
import AbstractMaterial from '@/app/base/AbstractMaterial';

export default class AccountController extends AbstractMaterial {
  public getQuestionList(account: string, password: string, back: (data: any) => void): void {
    const client: AccountClient = this.appContext.getMaterial(AccountClient)
    client.getQustionList(account, password, back)
  }
}