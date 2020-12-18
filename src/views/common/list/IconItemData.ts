export default class IconItemData {
  public active: boolean = false;
  public key: string = '';
  public name: string = '';
  public avatar: string = '/assets/images/main/pane/no-user.png';
  public gray: boolean = true;
  public red: boolean = false;
  public redCount: number = 0;
  public text: string = '';
  public time: number = new Date().getTime();
  public onSelect: any;
  public onDelete: any;
  private data: any;

  public setData(data: any) {
    this.data = data;
  }

  public getData(): any {
    return this.data;
  }
}
