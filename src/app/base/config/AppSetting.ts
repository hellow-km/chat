export default class AppSetting {
  public static SERVER_URL: string = 'http://localhost:3000';

  public static setServerUrl(url: string): void {
    AppSetting.SERVER_URL = url;
  }
}
