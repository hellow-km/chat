import AbstractMaterial from '@/app/base/AbstractMaterial';
import serverClient from '@/app/com/main/http/api/ServerClient';

export default class ServerService extends AbstractMaterial {

  public loadServerAddress(back: (success: boolean, message?: string) => void): void {
    const addressBack = (data: any) => {
      let success = false;
      let message = ''
      if (data && data.info) {
        const info = data.info;
        if (info.message) {
          message = info.message
        }
        if (info.success && data.body) {
          //todo
          success = true;
        }
      }
      back(success, message);
    };
    serverClient.getAddressList(addressBack);
  }

}
