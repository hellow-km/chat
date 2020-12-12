import Group from '@/app/com/bean/Group';

export default class NodeData {
  public key: string = '';
  public name: string = '';
  public rank: number = 0;
  public countText: string = '[0/0]';
  public items: Group[] = new Array<Group>();
  public isOpen: boolean = false;
  public red: boolean = false;
  public redCount: number = 0;
}
