import AbstractMaterial from './AbstractMaterial'
import View from '@/app/com/main/view/View';
import NetServer from '@/app/base/net/NetServer';
import PromptHandler from '@/app/base/net/PromptHandler';
type Material<T extends AbstractMaterial> = new (AppContext: AppContext) => T

class AppContext {
  public readonly netServer: NetServer = new NetServer();
  private objectMap: Map<any, any> = new Map<any, any>();
  private promptHandler: PromptHandler = {
    prompt(message: string, type?: string): void {
      // do nothing
    },
  } as PromptHandler;

  constructor() {
    this.initializeNetServer();
  }
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

  public connect(socketHost: string, onOpen?: () => void): boolean {
    const mark: boolean = this.netServer.connect(socketHost, onOpen);
    return mark;
  }

  public setPromptHandler(promptHandler: PromptHandler): void {
    this.promptHandler = promptHandler;
  }

  private initializeNetServer(): void {
    const own = this;
    this.netServer.setPromptHandler({
      prompt(message: string, title?: string, type?: string): void {
        own.promptHandler.prompt(message, title, type);
      },
    } as PromptHandler);
  }

}

export default AppContext