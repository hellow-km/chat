<template>
  <div class="input-pane">
    <div
      class="content"
      @click="iptFocus"
    >
      <pre
        ref='inputArea'
        @keypress="onKeyPress"
        @keyup="onKeyup"
        class="flex edit_area"
        contenteditable="true"
      ></pre>
    </div>
    <div class="input-opt">
      <span class="opt-tip">按ctrl+enter发送&nbsp;</span>
      <el-button
        @click="send"
        size="mini"
      >发送</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import DocumentUtil from "@/app/common/util/DocumentUtil";
import EmojiImageBox from "@/views/main/message/chat/EmojiImageBox";

@Component
export default class ChatInput extends Vue {
  private onKeyPress(e: KeyboardEvent) {
    const inputArea: any = this.getInputRef();
    this.keyPress(e, inputArea);
    if (e.ctrlKey && e.keyCode == 10) {
      this.send();
    }
  }
  private onKeyup() {}
  private iptFocus() {
    const inputArea: any = this.getInputRef();
    inputArea.focus();
  }
  private send() {
    const inputArea: any = this.getInputRef();
    this.onSend(inputArea as Element);
  }

  private getInputRef() {
    const inputArea: any = this.$refs.inputArea;
    return inputArea;
  }

  public faceSelect(categoryId: string, value: string) {
    const inputArea = this.getInputRef();
    if (categoryId == "classical") {
      const html = `<img src="/assets/images/common/face/classical/gif/${value}.gif" value="${categoryId},${value}" name="face"/>`;
      DocumentUtil.inserNode(inputArea, html);
    } else if (categoryId == "emoji") {
      const p = EmojiImageBox.getPictureByKey(value);
      if (p) {
        const html = `<img src="/assets/images/common/face/${categoryId}/${p}" value="${categoryId},${value}" name="face" />`;
        DocumentUtil.inserNode(inputArea, html);
      } else {
        DocumentUtil.inserNode(inputArea, value);
      }
    }
  }

  private insertHtml(html: string) {
    const inputArea: any = this.$refs.inputArea;
    DocumentUtil.inserNode(inputArea, html);
  }

  @Emit("on-send")
  private onSend(e: Element, files?: File[]) {
    // no
  }

  @Emit("on-key-press")
  private keyPress(evt: KeyboardEvent, e: Element) {
    // no
  }

  @Emit("on-key-up")
  private keyup(evt: KeyboardEvent, e: Element) {
    // no
  }
}
</script>

<style>
</style>
