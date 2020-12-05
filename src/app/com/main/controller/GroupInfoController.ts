import AbstractMaterial from '@/app/base/AbstractMaterial';
import Group from '@/app/com/bean/Group';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';

export default class GroupInfoController extends AbstractMaterial {
  public addGroup(group: Group, back: DataBackAction) {
    const m = Message.build('post', '/module/addGroup')
    m.body = group
    this.appContext.netServer.request(m, back)
  }
}