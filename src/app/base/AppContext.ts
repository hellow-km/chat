import AbstractMaterial from './AbstractMaterial'
import View from '@/app/com/main/view/View';
type Material<T extends AbstractMaterial> = new (AppContext: AppContext) => T

class AppContext {
  private objectMap: Map<any, any> = new Map<any, any>();

  public getMaterial<T>(clazz: Material<AbstractMaterial>): T {
    // public getObjectByClass<T>(clazz: Constructor<T>): T {
    let o = this.objectMap.get(clazz);
    if (!o) {
      o = new clazz(this);
      this.objectMap.set(clazz, o);
    }
    if (o instanceof AbstractMaterial) {
      const ab = o as AbstractMaterial;
    }
    return o;
  }

  public putViewObject(view: any, value: View): void {
    this.putObject(view, value);
  }

  public putObject(key: any, value: any): void {
    this.objectMap.set(key, value);
  }

}

export default AppContext