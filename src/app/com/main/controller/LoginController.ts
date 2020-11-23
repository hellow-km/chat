import AbstractMaterial from '@/app/base/AbstractMaterial';
import { Md5 } from 'md5-typescript'
import Auth from '@/app/common/auth/Auth';
import ServerService from '@/app/com/main/service/ServerService';
import BaseUtil from '@/app/lib/util/BaseUtil';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import PersonalClient from '@/app/com/main/http/main/PersonalClient';
class LoginController extends AbstractMaterial {

  public login(account: string, password: string, back: (success: Boolean, message?: string) => void) {
    const own = this
    password = Md5.init(password)

    const authBack = (success: Boolean, message?: string) => {
      if (success) {
        Auth.setLogin(true)
        Auth.account = account
        Auth.password = password
      }
      back(success, message)
    }

    const connectBack = (success: boolean, message?: string) => {
      if (!success) {
        back(success, message);
      } else {
        this.auth(authBack)
      }
    };
    const loginBack = (success: boolean, message?: string) => {
      if (!success) {
        back(success, message);
      } else {
        this.connect(connectBack);
      }
    }
    const addressBack = (success: boolean, message?: string) => {
      if (!success) {
        back(success, message);
      } else {
        this.loadToken(account, password, loginBack);
      }
    };
    this.loadServerAddress(addressBack);
  }

  private loadServerAddress(back: (success: boolean, message?: string) => void) {
    const serverService: ServerService = this.appContext.getMaterial(ServerService)
    serverService.loadServerAddress(back);
  }

  private loadToken(account: string, password: string, back: (success: boolean, message?: string) => void): void {
    const loginBack = (data: any) => {
      let mark = false;
      if (!BaseUtil.isEmpty(data)) {
        const head = data.head;
        const info = data.info;
        if (info) {
          if (info.success && data.body) {
            const token = data.body.token;
            const user = data.body.user;

            mark = !BaseUtil.isEmpty(token);
            if (mark) {
              Auth.setToken(token);
            }
            const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
            pb.setUser(user);
          }
        }
      }
      back(mark);
    };
    const client: PersonalClient = this.appContext.getMaterial(PersonalClient);
    client.login(account, password, loginBack);
  }

  private connect(back: (success: boolean, message?: string) => void): void {
    back(true)
  }

  private auth(back: (success: boolean, message?: string) => void): void {
    back(true)
  }
}

export default LoginController