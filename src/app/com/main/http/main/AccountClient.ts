import http from '@/app/lib/http/HttpClient';
import Message from '@/app/base/message/Message';
import User from '@/app/com/bean/User';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';
import BaseUtil from '@/app/lib/util/BaseUtil';
import AbstractMaterial from '@/app/base/AbstractMaterial';




export default class AccountClient extends AbstractMaterial {

  public getQustionList(account: string, password: string, back: (data: any) => void): void {
    const body = {
      account,
      password
    }

  }

  public isExistAccount(value: string, back: (exist: boolean) => void): void {
    if (BaseUtil.isEmpty(value)) {
      back(false);
      return;
    }
    const existBack = (data: any) => {
      let mark = true;
      if (!BaseUtil.isEmpty(data)) {
        const head = data.head;
        const info = data.info;
        if (data.body && !BaseUtil.isEmpty(data.body.exist)) {
          mark = data.body.exist;
        }
      }
      back(mark);
    };
    const body: object = {
      account: value,
    };
    const m = Message.build('post', '/client/existAccount');
    m.body = body;
    this.post(m, existBack, true);
  }

  private post(m: any, back: (data: any) => void, prompt?: boolean | null) {
    const method = m.head.method
    const name = m.head.name
    if (method == 'post') {
      http.post(name, m, back, true);
    }
  }
}

