import AbstractMaterial from './AbstractMaterial'

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

}

export default AppContext