import Message from '@/app/base/message/Message';
import AccountClient from '@/app/com/main/http/main/AccountClient';
import AppContext from '@/app/base/AppContext';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';
import BaseUtil from '@/app/lib/util/BaseUtil';

export default class AccountController extends AbstractMaterial {

  public getQuestionList(account: string, back: (data: any) => void): void {
    const client: AccountClient = this.appContext.getMaterial(AccountClient)
    client.getQustionList(account, back)
  }

  public submitAnswer(account: string, list: SecurityQuestion[], back: (success: boolean) => void): void {
    const client: AccountClient = this.appContext.getMaterial(AccountClient)
    const submitBack = (data: any): void => {
      let s = false
      if (!BaseUtil.isEmpty(data)) {
        const info = data.info
        const success = info.success
        if (success) {
          s = true
        }
      }
      back(s)
    }
    client.submitAnswer(account, list, submitBack)
  }
}