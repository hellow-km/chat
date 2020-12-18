import AbstractMaterial from "@/app/base/AbstractMaterial";
import DataBackAction from '@/app/base/net/DataBackAction';
import HttpUtil from '@/app/lib/util/HttpUtil';

export default class MessageController extends AbstractMaterial {

  public getMessageList(userId: string, back: DataBackAction) {
    this.request('get', '/message/getList', { userId }, back)
  }

  private request(method: string, url: string, data: any, back: DataBackAction) {
    HttpUtil.request(method, url, data, back)
  }
}