import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import ServerBox from '@/app/com/main/box/ServerBox';
import http from '@/app/lib/http/HttpClient';

export default class PersonalClient extends AbstractMaterial {
  private method: string = 'post'
  private loginUrl: string = "/client/login"
  private registerUrl: String = "/client/register"
  public login(account: string, password: string, back: (data: any) => void) {
    const body: object = {
      account: account,
      password: password,
      name: this.loginUrl
    }
    const m = Message.build(this.method)
    m.body = body
    this.post(m, back, true)
  }

  public register(account: string, password: string, back: (data: any) => void) {
    const body: object = {
      account: account,
      password: password,
      name: this.register
    }
    const m = Message.build(this.method)
    m.body = body
    this.post(m, back, true)
  }

  private post(m: any, back: (data: any) => void, prompt?: boolean | null) {
    const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
    http.post(m.body.name, m, back, true);
  }
}