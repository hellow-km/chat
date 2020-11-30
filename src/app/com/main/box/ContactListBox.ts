import BaseUtil from '@/app/lib/util/BaseUtil';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import ContactCategory from '@/app/com/bean/ContactCategory';
import ContactRelation from '@/app/com/bean/ContactRelation';

export default class ContactListBox extends AbstractMaterial {
  /*** 所有分组*/
  private allCategoryMap: Map<string, ContactCategory> = new Map<string, ContactCategory>();
  /*** 分组中的成员列表<categoryId,Map<userId, ContactRelation>>*/
  private categoryMemberListMap: Map<string, Map<string, ContactRelation>> = new Map<string, Map<string, ContactRelation>>();
  /*** 用户所在的分组<userId,Map<categoryId, ContactRelation>>*/
  private contactInCategoryMap: Map<string, Map<string, ContactRelation>> = new Map<string, Map<string, ContactRelation>>();

  public getCategoryList(): ContactCategory[] {
    const values = this.allCategoryMap.values();
    const list: ContactCategory[] = [];
    for (const category of values) {
      list.push(category);
    }
    return list;
  }
}