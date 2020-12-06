import User from '@/app/com/bean/User';
export default class ChangePasswordData extends User {
  public password: string = ""
  public newPassword: string = ""
  public rePassword: string = ""
}