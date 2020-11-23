import BaseUtil from '@/app/lib/util/BaseUtil';
import StringUtil from '@/app/common/util/StringUtil';

export default class RegisterRules {

  public nickName: Array<any> = [
    { required: true, message: '请输入昵称', trigger: 'blur' }
  ]

  public account: Array<any> = [
    { required: true, message: '请输入账号', trigger: 'blur' }
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


}