import ItemData from '@/views/common/list/ItemData';

export default class ItemBox {

  // @ts-ignore
  private itemData: any = null;

  public select(itemData: any): void {
    if (this.itemData) {
      this.itemData.active = false;
    }
    this.itemData = itemData;
    if (itemData) {
      itemData.active = true;
    }
  }
}
