import AbstractMaterial from '@/app/base/AbstractMaterial';
import RegisterData from '@/app/com/bean/RegisterData';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';
import PersonalClient from '@/app/com/main/http/main/PersonalClient';
import BaseUtil from '@/app/lib/util/BaseUtil';
import { Md5 } from 'md5-typescript';
import DataBackAction from '@/app/base/net/DataBackAction';
import User from '@/app/com/bean/User';
import Message from '@/app/base/message/Message';

export default class PersonalController extends AbstractMaterial {
  /**
   * u：注册数据,
   * list：问题数据,
   * back：回调,
   */
  public register(u: RegisterData, list: SecurityQuestion[], back: (success: boolean) => void): void {
    u.password = Md5.init(u.password)
    const registerBack = (data: any): void => {
      let mark = false
      if (!BaseUtil.isEmpty(data)) {
        const info = data.info
        if (info) {
          mark = info.success
        }
      }
      back(mark)
    }
    const client: PersonalClient = this.appContext.getMaterial(PersonalClient)
    client.register(u, list, registerBack)
  }

  public changePassword(account: string, newPassword: string, back: (success: boolean) => void): void {
    newPassword = Md5.init(newPassword)
    const changeBack = (data: any) => {
      if (BaseUtil.isNotEmpty(data)) {
        const info = data.info
        if (info.success) {
          back(true)
        }
        back(false)
      }
    }
    const client: PersonalClient = this.appContext.getMaterial(PersonalClient)
    client.changePassword(account, newPassword, changeBack)
  }

  public updateUser(user: User, back: DataBackAction): void {
    const m = Message.build('post', '/menu/updateUser')
    m.body = user
    this.appContext.netServer.request(m, back)
  }

  public loginChangePassword(data: any, back: DataBackAction): void {
    data.password = Md5.init(data.password)
    data.newPassword = Md5.init(data.newPassword)
    const m = Message.build('post', '/menu/changePassword')
    m.body = data
    this.appContext.netServer.request(m, back)
  }
}