import BaseUtil from '@/app/lib/util/BaseUtil';
import NetSocket from './NetSocket';
import ConnectHandler from '@/app/base/net/ConnectHandler';
import Handler from '@/app/base/net/Handler';
import PromptHandler from '@/app/base/net/PromptHandler';
import LogHandler from '@/app/base/log/LogHandler';
import http from '@/app/lib/http/HttpClient';
import DataBackAction from '@/app/base/net/DataBackAction';
import MessageHandler from '@/app/base/net/MessageHandler';

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
  private messageHandler = new MessageHandler();
  private messageKeyCount = 0;

  constructor() {
    const own = this;
    const handler = {
      onOpen(): void {
        own.onOpen()
      },
      onMessage(data: any): void {
        try {
          own.onMessage(data)
        } catch (e) {
          // console.log(e);
        }
      },
      onClose(e: CloseEvent): void {
        own.onClose(e)
      },
      onError(): void {
        own.onError()
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

  public closeNetSocket(): void {
    if (this.netSocket) {
      this.netSocket.closeWebSocket();
    }
  }

  public onMessage(value: any): void {
    console.log(value);
  }

  private onOpen(): void {
    this.netSocket.send('open', '')
  }

  private onClose(e: CloseEvent): void {

  }

  private onError(): void {

  }

  private prompt(message: string): void {
    if (typeof (this.promptMessage) === 'function') {
      this.promptMessage(message);
    }
  }

  private promptMessage(message: string): void {
    this.promptHandler.prompt(message);
  }

  public setPromptHandler(promptHandler: PromptHandler): void {
    this.promptHandler = promptHandler;
  }

  public setConnectHandler(connectHandler: ConnectHandler): void {
    this.connectHandler = connectHandler;
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

  public request(data: any, back?: DataBackAction, prompt?: boolean): void {
    if (data && data.head) {
      const head = data.head;
      if (0 === head.timestamp || BaseUtil.isEmpty(head.timestamp) || BaseUtil.isEmpty(head.key)) {
        const timestamp = new Date().getTime();
        if (0 === head.timestamp || BaseUtil.isEmpty(head.timestamp)) {
          head.timestamp = timestamp;
        }
        if (BaseUtil.isEmpty(head.key)) {
          this.messageKeyCount++;
          head.key = (this.messageKeyCount + timestamp) + '';
        }
      }
      const requestBack = (res: any): void => {
        this.messageHandler.putHandleData(head.key, res, head.timestamp, back);
        //因为不是用的webSocket，不用根据key来调用，所以我也不知道存进去干嘛，也不用搞lost和timeout，我直接用了
        this.requestBack(res, back)
      }
      this.$http(data, requestBack, prompt)
    }
  }

  private requestBack(data: any, back?: DataBackAction): void {
    //http那边有处理了
    if (back && typeof back.back == 'function') {
      back.back(data)
    }
  }

  private $http(m: any, back: (data: any) => void, prompt?: boolean | null) {
    const method = m.head.method
    const name = m.head.name
    if (method == 'get') {
      http.get(name, m, back, prompt);
    } else if (method == 'post') {
      http.post(name, m, back, prompt);
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
