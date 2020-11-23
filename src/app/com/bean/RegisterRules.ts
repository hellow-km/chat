import BaseUtil from '@/app/lib/util/BaseUtil';
import StringUtil from '@/app/common/util/StringUtil';
import AccountClient from '@/app/com/main/http/main/AccountClient';
import app from "@/app/App";

export default class RegisterRules {

  public nickName: Array<any> = [
    { required: true, message: '请输入昵称', trigger: 'blur' }
  ]

  public account: Array<any> = [
    { required: true, validator: this.isExistAccount, trigger: 'blur' }
  ]

  public password: Array<any> = [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]

  public mobile: Array<any> = [
    { validator: this.isExistMobile, message: '请输入正确的手机号', trigger: 'blur' },
    { required: false, message: '请输入手机号', trigger: 'blur' },
  ]

  public email: Array<any> = [
    { required: false, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ]

  public name: Array<any> = [
    { required: false, message: '请输入姓名', trigger: 'blur' }
  ]

  private isExistMobile(rule: any, value: string, callback: (data?: any) => any): void {
    if (!BaseUtil.isEmpty(value)) {
      if (!StringUtil.isMobile(value)) {
        callback(new Error('手机格式不正确！'));
        return;
      }
    } else {
      callback();
    }
  }

  private isExistAccount(rule: any, value: string, callback: (data?: any) => any): void {
    if (!StringUtil.isAccount(value)) {
      callback(new Error('用户名仅支持3到16位字母、数字、下划线'));
      return;
    }
    const client: AccountClient = app.appContext.getMaterial(AccountClient);
    client.isExistAccount(value, (exist: boolean) => {
      if (exist) {
        callback(new Error('用户名已存在'))
      } else {
        callback()
      }
    })
  }
}