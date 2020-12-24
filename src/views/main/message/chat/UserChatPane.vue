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
          :data="messageInfo.list"
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
          @on-key-press="onKeyPress"
        ></ChatInput>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
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
    type: String,
    required: false,
    default: ""
  })
  private sendUserId!: string;

  private chatData = UserChatViewModel.chatData;
  private messageInfo = UserChatViewModel.messageInfo;
  private cacheData = UserChatViewModel.cacheData;
  private faceShow: boolean = false;

  public mounted() {
    this.blurFacePaneEvent();
  }

  private blurFacePaneEvent() {
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
  }

  private onKeyPress(e: KeyboardEvent, input: Element) {
    this.cacheData.data.html = input.innerHTML;
  }

  private onFaceSelect(categoryId: string, value: string) {
    const chatInput: any = this.$refs.chatInput;
    chatInput.faceSelect(categoryId, value);
  }

  private onInputSend() {
    let html = this.cacheData.data.html;
    if (html == "") {
      return;
    }

    const messageBox: any = this.$refs.messageBox;
    const back = {
      back: (data: any) => {}
    };
    const body = {
      html,
      targetId: this.sendUserId,
      id: this.$store.state.userId
    };
    ChatController.sendMessage(html, back);
  }
}
</script>

<style>
</style>
