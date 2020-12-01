import AbstractMaterial from '@/app/base/AbstractMaterial';
import http from '@/app/lib/http/HttpClient';
import Message from '@/app/base/message/Message';

export default class ContactClient extends AbstractMaterial {
  /**
   * name
   */
  public getContactAddVerifySetting(userId: string, back?: (data: any) => void, prompt?: boolean): void {
    const body = {
      userId: userId
    }
    const m = Message.build('get', '/setting/contactAddVerifySetting')
    m.body = body
    this.$http(m, back, true)
  }

  private $http(m: any, back?: (data: any) => void, prompt?: boolean): void {
    const method = m.head.method
    const name = m.head.name
    if (method == 'get') {
      http.get(name, m, back, prompt);
    } else if (method == 'post') {
      http.post(name, m, back, prompt);
    }
  }
}