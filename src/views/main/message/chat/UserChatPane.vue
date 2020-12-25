<template>
  <div class="chat-pane">
    <div class="chat-pane-head">
      <div class="chat-head-name">
        <span>{{chatData.name}}</span>
      </div>
    </div>
    <div class="chat-message-box">
      <div class="chat-box">
        <MessageBox
          ref="messageBox"
          :data="messageInfo.chatList"
        ></MessageBox>
      </div>
    </div>
    <FacePane
      ref="facePane"
      name="face-pane"
      @on-selected="onFaceSelect"
    ></FacePane>
    <div class="chat-write-box">
      <div class="chat-menu">
        <UserChatMenu
          @on-open-face="onToggleFace"
          @on-open-file="onOpenFile"
          @on-open-picture="onOpenPicture"
        ></UserChatMenu>
      </div>
      <div class="chat-write">
        <ChatInput
          ref="chatInput"
          v-model="cacheData.data.html"
          @on-send="onInputSend"
          @on-key-up="onKeyUp"
        ></ChatInput>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import UserChatMenu from "./UserChatMenu.vue";
import FacePane from "./FacePane.vue";
import ChatInput from "./ChatInput.vue";
import MessageBox from "./MessageBox.vue";

import UserChatViewModel from "@/impl/data/UserChatViewModel";
import FaceBox from "./FaceBox";
import EmojiImageBox from "./EmojiImageBox";
import FaceValue from "@/app/com/data/chat/content/item/FaceValue";
import DocumentUtil from "@/app/common/util/DocumentUtil";
import ChatController from "@/app/com/main/controller/ChatController";
import DataUtil from "@/app/lib/util/DataUtil";
import DataBackAction from "@/app/base/net/DataBackAction";

@Component({
  components: {
    UserChatMenu,
    ChatInput,
    FacePane,
    MessageBox
  }
})
export default class UserChatPane extends Vue {
  @Prop({
    type: Object,
    required: false,
    default: {}
  })
  private data!: any;

  private chatData = UserChatViewModel.chatData;
  private messageInfo = UserChatViewModel.messageInfo;
  private cacheData = UserChatViewModel.cacheData;
  private faceShow: boolean = false;

  public mounted() {
    this.init();
  }

  @Watch("data")
  private u() {
    this.getMessageInfor();
  }

  private init() {
    document.addEventListener(
      "click",
      e => {
        if (this.faceShow) {
          if (e.target instanceof Element) {
            const n = e.target as Element;
            const name = n.getAttribute("name");
            if (name !== "face-item" && name !== "face-tab") {
              this.faceShow = false;
              const facePane: any = this.$refs.facePane;
              facePane.setPaneShow(this.faceShow);
            }
          } else {
            this.faceShow = false;
            const facePane: any = this.$refs.facePane;
            facePane.setPaneShow(this.faceShow);
          }
        }
      },
      true
    );
    this.getMessageInfor();
    UserChatViewModel.setName(this.data.name);
  }

  private getMessageInfor() {
    const back: DataBackAction = {
      back: (data: any) => {
        if (DataUtil.isSuccess(data)) {
          const body = DataUtil.getBody(data);
          UserChatViewModel.messageInfo = body;
          this.messageInfo = body;
        }
      }
    };
    const data = {
      userId: this.$store.state.userId,
      key: this.data.key
    };
    ChatController.getMessage(data, back);
  }

  private onToggleFace() {
    this.faceShow = !this.faceShow;
    const facePane: any = this.$refs.facePane;
    facePane.setPaneShow(this.faceShow);
  }

  private onOpenFile() {}

  private onOpenPicture(html: string) {
    const chatInput: any = this.$refs.chatInput;
    const inputArea: any = chatInput.$refs.inputArea;
    DocumentUtil.inserNode(inputArea, html);
    this.cacheData.data.html = inputArea.innerHTML;
  }

  private onKeyUp(e: KeyboardEvent, input: Element) {
    this.cacheData.data.html = input.innerHTML;
  }
  private onFaceSelect(categoryId: string, value: string) {
    const chatInput: any = this.$refs.chatInput;
    chatInput.faceSelect(categoryId, value);
    const inputArea: any = chatInput.$refs.inputArea;
    this.cacheData.data.html = inputArea.innerHTML;
  }

  private onInputSend() {
    let html = this.cacheData.data.html;
    if (html == "") {
      return;
    }
    const messageBox: any = this.$refs.messageBox;
    const back: DataBackAction = {
      back: (data: any) => {
        if (DataUtil.isSuccess(data)) {
          this.getMessageInfor();
          this.cacheData.data.html = "";
        }
      }
    };
    const data = this.data;

    const body = {
      html,
      targetId: data.userId,
      key: data.key,
      id: this.$store.state.userId
    };
    ChatController.sendMessage(body, back);
  }
}
</script>

<style>
</style>
