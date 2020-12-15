import AbstractMaterial from '@/app/base/AbstractMaterial';
import Message from '@/app/base/message/Message';
import DataUtil from '@/app/lib/util/DataUtil';
import ListData from '@/impl/data/ListData';

export default class PersonalListData extends AbstractMaterial {
  public getListData(userId: string, addBack?: () => void) {
    const back = {
      back: (data: any) => {
        if (DataUtil.isSuccess(data)) {
          if (data.body) {
            const body = data.body
            const userList = body.userList
            const groupList = body.groupList
            ListData.userNodes = userList
            ListData.groupNodes = groupList
            console.log(1);

            addBack && addBack()
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