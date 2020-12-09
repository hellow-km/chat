import PersonalViewImpl from '@/impl/view/PersonalViewImpl'
import User from '@/app/com/bean/User';
import PersonalListData from '@/app/com/main/sender/PersonalListData'
import App from '@/app/App';
class InitializeData {
  public setPersonalData(user: User) {
    PersonalViewImpl.setUser(user)
  }

  public setListData(user: User) {
    const userId = user.id
    const pd: PersonalListData = App.appContext.getMaterial(PersonalListData)
    pd.getListData(userId)
  }
}

export default new InitializeData()