import AbstractMaterial from "@/app/base/AbstractMaterial";
import DataBackAction from '@/app/base/net/DataBackAction';
import HttpUtil from '@/app/lib/util/HttpUtil';

export default class MessageController extends AbstractMaterial {

  public getMessageList(userId: string, back: DataBackAction) {
    this.request('get', '/message/getList', { userId }, back, true)
  }

  public addUserMessage(userId: string, sendId: string, back: DataBackAction) {
    this.request('post', '/message/addUserMessage', { userId, sendId }, back, true)
  }

  private request(method: string, url: string, data: any, back: DataBackAction, prompt: boolean) {
    HttpUtil.request(method, url, data, back, prompt)
  }
}