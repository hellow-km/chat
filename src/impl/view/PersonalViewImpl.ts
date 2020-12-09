import User from '@/app/com/bean/User';
import personalDataBox from '@/impl/PersonalDataBox';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';

class PersonalViewImpl {
  public setUser(user: User): void {
    const key: string = user.id;
    const name = UserInfoUtil.getShowName(user);
    const avatar = UserInfoUtil.getHeadImage(user);
    personalDataBox.personalData.key = key;
    personalDataBox.personalData.name = name;
    personalDataBox.personalData.avatar = avatar;
  }
}

export default new PersonalViewImpl()