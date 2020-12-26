import ItemData from './ItemData';
import User from '@/app/com/bean/User';

export default class NodeData {
  public key: string = '';
  public name: string = '';
  public rank: number = 0;
  public countText: string = '[0/0]';
  public items: User[] = new Array<User>();
  public isOpen: boolean = false;
  public red: boolean = false;
  public redCount: number = 0;
}
