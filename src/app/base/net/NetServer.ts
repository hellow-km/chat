import BaseUtil from '@/app/lib/util/BaseUtil';
import NetSocket from './NetSocket';
import ConnectHandler from '@/app/base/net/ConnectHandler';
import Handler from '@/app/base/net/Handler';
import PromptHandler from '@/app/base/net/PromptHandler';
import LogHandler from '@/app/base/log/LogHandler';

export default class NetServer {
  private activeTimestamp = 0;
  private readonly netSocket: NetSocket;
  private connectHandler: ConnectHandler = {} as ConnectHandler;
  private connectedTemp = false;
  private intervalTime: number = 0;
  private codeSuccess: string = '1';
  private promptHandler: PromptHandler = {} as PromptHandler;
  private connecting = false;
  private doConnected = false;

  constructor() {
    const own = this;
    const handler = {
      onOpen(): void {
        console.log('open');

      },
      onMessage(data: any): void {
        try {
        } catch (e) {
          // console.log(e);
        }
      },
      onClose(e: CloseEvent): void {
        console.log(e);

      },
      onError(): void {

      },
    } as Handler;
    this.netSocket = new NetSocket(handler);
    const h = () => {

    };
    own.intervalTime = window.setInterval(h, 1000);
    this.initialize();
  }

  private initialize(): void {
    // TODO
  }

  public onMessage(value: any): void {
    console.log(value);
  }

  private prompt(message: string): void {
    if (typeof (this.promptMessage) === 'function') {
      this.promptMessage(message);
    }
  }

  private promptMessage(message: string): void {
    this.promptHandler.prompt(message);
  }

  private showErrorMessage(data: any): void {
    if (data && data.head) {
      const head = data.head;
      const info = data.info;
      if (head && head.result) {
        const result = head.result;
        const code: string = result.code;
        const message: string = result.message;
        if ('1' !== code) {
          this.prompt(message);
        }
      }
    }
  }

  public isConnected(): boolean {
    let isConnected = true;
    if (this.netSocket) {
      isConnected = this.netSocket.isConnected();
    } else {
      isConnected = false;
    }
    return isConnected;
  }

  public connect(host: string, onOpen?: () => void): boolean {
    this.connecting = true;
    const mark = this.netSocket.connect(host, onOpen);
    this.connecting = false;
    if (mark) {
      this.doConnected = true;
    }
    return mark;
  }
}
