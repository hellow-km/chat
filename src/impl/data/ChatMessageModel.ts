import User from '@/app/com/bean/User';
import ContentData from '@/views/common/chat/ContentData';
import Content from '@/app/com/data/chat/content/Content';
import ChatCacheData from '@/views/main/message/chat/ChatCacheData';
import CoreContentUtil from '@/app/com/main/util/CoreContentUtil';


export default class ChatMessageModel {

  public messageInfo = {
    key: '1',
    showPrompt: true,
    prompt: '123',
    list: [{
      key: '1',
      showName: 'aaa',
      user: {
        nickName: 'kio'
      },
      content: {
        key: '1',
        html: '123456'
      },
      status: 0,
      isOwn: false
    }] as ContentData[],
  };

  public cacheData = {
    key: '1',
    data: new ChatCacheData(),
  };

}

