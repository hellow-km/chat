import PersonalViewImpl from '@/impl/view/PersonalViewImpl'
import User from '@/app/com/bean/User';
import PersonalListData from '@/app/com/main/sender/PersonalListData'
import App from '@/app/App';
import messageListModel from '@/impl/data/MessageListModel';
import MessageController from '@/app/com/main/controller/MessageController';
import DataUtil from '@/app/lib/util/DataUtil';
import BaseUtil from '@/app/lib/util/BaseUtil';
class InitializeData {

  public setPersonalData(user: User) {
    PersonalViewImpl.setUser(user)
  }

  public setListData(userId: string, addBack?: () => void) {
    const pd: PersonalListData = App.appContext.getMaterial(PersonalListData)
    pd.getListData(userId, addBack)
  }

  public setMessageList(userId: string) {

  }
}

export default new InitializeData()