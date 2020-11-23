import AbstractMaterial from '@/app/base/AbstractMaterial';
import RegisterData from '@/app/com/bean/RegisterData';
import SecurityQuestion from '@/app/com/bean/SecurityQuestion';
import PersonalClient from '@/app/com/main/http/main/PersonalClient';
import BaseUtil from '@/app/lib/util/BaseUtil';
import { Md5 } from 'md5-typescript';

export default class PersonalController extends AbstractMaterial {
  /**
   * u：注册数据,
   * list：问题数据,
   * back：回调,
   */
  public register(u: RegisterData, list: SecurityQuestion[], back: (success: boolean) => void) {
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
}