import AbstractMaterial from '@/app/base/AbstractMaterial';
import HttpUtil from '@/app/lib/util/HttpUtil';
import DataBackAction from '@/app/base/net/DataBackAction';

export default class ChatController {
  public static sendMessage(data: any, back: DataBackAction) {
    HttpUtil.request('post', '/chat/sendMessage', data, back, false)
  }

  public static getMessage(data: any, back: DataBackAction) {
    HttpUtil.request('get', '/chat/getMessage', data, back, false)
  }
}