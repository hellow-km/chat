import auth from '@/app/common/auth/Auth';
import AppContext from '@/app/base/AppContext';
import Prompt from '@/components/common/Prompt';
import PromptHandler from '@/app/base/net/PromptHandler';

class App {
  public appContext: AppContext = new AppContext()
  public logout(): void {
    auth.setLogin(false)
    auth.setToken('')
    this.appContext.netServer.closeNetSocket();
    this.appContext = new AppContext();
    this.initialize()
  }

  private initialize(): void {
    /* 不用设置了，用不上
    this.appContext.setPromptHandler({
      prompt(message: string, title?: string, type?: string): void {
        Prompt.notice(message, title, type);
      },
    } as PromptHandler);
    */
  }
}

export default new App();
