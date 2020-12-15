import ItemData from '@/views/common/list/ItemData';
import User from '@/app/com/bean/User';

export default class ItemBox {

  // @ts-ignore
  private itemData: User = null;

  public select(itemData: User): void {
    console.log(itemData);

    if (this.itemData) {
      this.itemData.active = false;
    }
    this.itemData = itemData;
    if (itemData) {
      itemData.active = true;
    }
  }
}
