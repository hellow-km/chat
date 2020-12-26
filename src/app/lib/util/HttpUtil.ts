import Message from "@/app/base/message/Message";
import DataBackAction from '@/app/base/net/DataBackAction';
import App from '@/app/App';

class HttpUtil {
  public request(method: string, url: string, data: any, back: DataBackAction, prompt?: boolean) {
    const m: any = Message.build(method, url)
    if (method == "get") {
      m.params = data
    } else if (method == "post") {
      m.body = data
    }
    App.appContext.netServer.request(m, back, prompt)
  }
}

export default new HttpUtil()