import http from '@/app/lib/http/HttpClient';
import DataBack from '@/app/lib/http/DataBack';

import Message from '@/app/base/message/Message';

class ServerClient {

  public getAddressList(back: (data: any) => void): void {
    //http.post('/get_address', {}, back, true);
  }
}

export default new ServerClient();
