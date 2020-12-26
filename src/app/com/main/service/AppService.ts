import AbstractMaterial from '@/app/base/AbstractMaterial';
import serverClient from '@/app/com/main/http/api/ServerClient';
import ServerData from '@/app/com/data/ServerData';
import ServerBox from '@/app/com/main/box/ServerBox';
import PersonalSender from '@/app/com/main/sender/PersonalSender';

import User from '@/app/com/bean/User';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';

import PersonalBox from '@/app/com/main/box/PersonalBox';

export default class AppService extends AbstractMaterial {

  public initializeApp(): void {
    this.loadPersonalData();
  }
  public loadPersonalData(): void {
    const ps: PersonalSender = this.appContext.getMaterial(PersonalSender);
    ps.getUser();
  }

}
