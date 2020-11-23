import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import ServerBox from '@/app/com/main/box/ServerBox';
import http from '@/app/lib/http/HttpClient';
import User from '@/app/com/bean/User';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';

export default class PersonalClient extends AbstractMaterial {
  private method: string = 'post'
  private loginUrl: string = "/client/login"
  private registerUrl: string = "/client/register"
  public login(account: string, password: string, back: (data: any) => void) {
    const body: object = {
      account: account,
      password: password
    }
    const m = Message.build(this.method, this.loginUrl)
    m.body = body
    this.post(m, back, true)
  }

  public register(u: User, list: SecurityQuestion[], back: (data: any) => void) {
    const body = {
      user: u,
      questions: list
    }
    const m = Message.build(this.method, this.registerUrl)
    m.body = body
    this.post(m, back, true)
  }

  private post(m: any, back: (data: any) => void, prompt?: boolean | null) {
    const method = m.head.method
    const name = m.head.name
    if (method == 'post') {
      http.post(name, m, back, true);
    }
  }
}