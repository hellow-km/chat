import BaseUtil from '@/app/lib/util/BaseUtil';
import User from '@/app/com/bean/User';
export default class UserInfoUtil {
  public static USER_HEAD_IMAGES: string = '/assets/images/main/pane/';

  public static getShowName(user: User): string {
    let showName = '';
    if (user) {

      const nickname = user.nickName;
      const account = user.account;
      const id = user.id;

      if (BaseUtil.isEmpty(showName)) {
        showName = nickname;
      }
      if (BaseUtil.isEmpty(showName)) {
        showName = account;
      }
      if (BaseUtil.isEmpty(showName)) {
        showName = id;
      }
    }
    return showName;
  }

  public static getHeadImage(user: User): string {
    let image = UserInfoUtil.USER_HEAD_IMAGES + 'no-user.png';
    if (user) {
      const head = user.head;
      const avatar = user.avatar;

      if (BaseUtil.isEmpty(avatar)) {
        image = UserInfoUtil.USER_HEAD_IMAGES + head + '.png';
      } else {
        image = avatar;
      }
      if (BaseUtil.isEmpty(image)) {
        image = UserInfoUtil.USER_HEAD_IMAGES + 'no-user.png';
      }
    }
    return image;
  }

  public static handleAvatar(user: User): void {
    if (user) {
      const head = user.head;
      const avatar = user.avatar;
      if (BaseUtil.isEmpty(avatar)) {
        user.avatar = UserInfoUtil.USER_HEAD_IMAGES + head + '.png';
      }
    }
  }

  public static getDefaultAvatar() {
    return UserInfoUtil.USER_HEAD_IMAGES + 'no-user.png';
  }
}