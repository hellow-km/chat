import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import DataUtil from '@/app/lib/util/DataUtil';
import ListData from '@/impl/data/ListData';

export default class PersonalListData extends AbstractMaterial {
  public getListData(userId: string) {
    const back = {
      back: (data: any) => {
        if (DataUtil.isSuccess(data)) {
          if (data.body) {
            const body = data.body
            ListData.userNodes = body.userList
            ListData.groupNodes = body.groupList
          }
        }
      }
    }
    const params = {
      userId: userId
    }
    const m: any = Message.build('get', '/user/getUserList')
    m.params = params
    this.appContext.netServer.request(m, back)
  }
}