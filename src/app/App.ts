import auth from '@/app/common/auth/Auth';
import AppContext from '@/app/base/AppContext';
import Prompt from '@/components/common/Prompt';
import PromptHandler from '@/app/base/net/PromptHandler';
import ListData from '@/impl/data/ListData';
import PersonalDataBox from '@/impl/PersonalDataBox';
import PersonalData from '@/views/common/data/PersonalData';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import User from '@/app/com/bean/User';
import NodeData from '@/views/common/list/NodeData';
import GroupNodeData from "@/views/common/list/GroupNodeData";

class App {
  public appContext: AppContext = new AppContext()
  public logout(): void {
    auth.setLogin(false)
    auth.setToken('')

    this.appContext.netServer.closeNetSocket();
    this.appContext = new AppContext();
    this.initialize()
  }

  private initialize(): void {
    const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
    const user = new User()
    pb.setUser(user)
    ListData.userNodes = new Array<NodeData>()
    ListData.groupNodes = new Array<GroupNodeData>()
  }
}

export default new App();
