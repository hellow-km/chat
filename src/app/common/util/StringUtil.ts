export default class StringUtil {

  public static REGEX_MOBILE: RegExp = /^1[3456789]\d{9}$/;
  //public static REGEX_ACCOUNT: RegExp = /^[\\u4E00-\\u9FA5|a-zA-Z][\w\\u4E00-\\u9FA5|0-9a-zA-Z]*$/;
  public static REGEX_ACCOUNT = /^[a-zA-Z0-9_]{3,16}$/
  public static isMobile(value: string): boolean {
    let is = true;
    if (value) {
      is = StringUtil.REGEX_MOBILE.test(value);
    } else {
      is = false;
    }
    return is;
  }

  public static isAccount(value: string): boolean {
    let is = true;
    if (value) {
      is = StringUtil.REGEX_ACCOUNT.test(value);
    } else {
      is = false;
    }
    return is;
  }
}
