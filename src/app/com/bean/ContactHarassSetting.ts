import ContactOnlyQuestion from "@/app/com/data/ContactOnlyQuestion";
export default class ContactHarassSetting {
  /*** 1：允许任何人添加 **/
  public static VERIFY_TYPE_ANY: number = 1;
  /*** 2：需要验证 **/
  public static VERIFY_TYPE_AUTH: number = 2;
  /*** 3：需要回答正确的问题 **/
  public static VERIFY_TYPE_ANSWER: number = 3;
  /*** 4：需要回答问题并由我确认 **/
  public static VERIFY_TYPE_CONFIRM: number = 4;

  public userId: string = '';
  /**
   * 1：允许任何人添加 <br>
   * 2：需要验证 <br>
   * 3：需要回答正确的问题 <br>
   * 4：需要回答问题并由我确认 <br>
   */
  public verifyType: number = 2;
  public question: string = '';
  public answer: string = '';
  public onlyQuestions: ContactOnlyQuestion[] = new Array<ContactOnlyQuestion>()
}
