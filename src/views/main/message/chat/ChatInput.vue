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
      <span class="caret_pos_helper"></span>
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

@Component
export default class ChatInput extends Vue {
  private onKeyPress(e: KeyboardEvent) {
    const inputArea: any = this.$refs.inputArea;
    this.keyPress(e, inputArea);
    if (e.ctrlKey && e.keyCode == 10) {
      this.send();
    }
  }
  private onKeyup() {}
  private iptFocus() {
    const inputArea: any = this.$refs.inputArea;
    inputArea.focus();
  }
  private send() {
    const inputArea: any = this.$refs.inputArea;
    this.onSend(inputArea as Element);
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
