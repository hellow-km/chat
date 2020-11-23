import ClientHead from './client/ClientHead';
import Head from '@/app/base/message/Head';


export default class Message<H extends Head> {

  public static build(method: string): Message<ClientHead> {
    const head: ClientHead = ClientHead.build(method);
    const me: Message<ClientHead> = new Message<ClientHead>();
    me.head = head;
    return me;
  }

  public head!: H;
  public body: any;
}
