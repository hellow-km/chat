<template>
  <div class="chat-pane">
    <div class="chat-pane-head">
      <div class="chat-head-name">
        <span>{{chatData.name}}</span>
      </div>
    </div>
    <div class="chat-message-box">
      <div class="chat-box">

      </div>
    </div>
    <FacePane
      ref="facePane"
      @blur.native="closeFace"
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
          v-model="cacheData.data.html"
          @on-send="onInputSend"
          @on-key-press="onKeyPress"
        ></ChatInput>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UserChatMenu from "./UserChatMenu.vue";
import FacePane from "./FacePane.vue";
import ChatInput from "./ChatInput.vue";
import UserChatViewModel from "@/impl/data/UserChatViewModel";

@Component({
  components: {
    UserChatMenu,
    ChatInput,
    FacePane
  }
})
export default class UserChatPane extends Vue {
  private chatData = UserChatViewModel.chatData;
  private messageInfo = UserChatViewModel.messageInfo;
  private cacheData = UserChatViewModel.cacheData;
  private faceShow: boolean = false;

  private onToggleFace() {
    this.faceShow = !this.faceShow;
    const facePane: any = this.$refs.facePane;
    facePane.setPaneShow(this.faceShow);
  }

  private onOpenFile() {}

  private onOpenPicture() {}

  private onKeyPress(e: KeyboardEvent, input: Element) {
    this.cacheData.data.html = input.innerHTML;
  }

  private onInputSend() {
    console.log(this.cacheData.data.html);
  }
}
</script>

<style>
</style>
