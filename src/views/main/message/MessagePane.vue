<template>
  <div>
    <div v-if="showPage=='user_chat'">
      <UserChatPane :data="data"></UserChatPane>
    </div>
    <div
      v-if="showPage=='no'"
      class="message-pane-empty"
    >
      <img
        src="@/images/main/pane/no.png"
        height="128"
        width="128"
      />
      <p class="">未选择聊天</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UserChatPane from "./chat/UserChatPane.vue";
import IconItemData from "@/views/common/list/IconItemData";

@Component({
  components: {
    UserChatPane
  }
})
export default class MessagePane extends Vue {
  private showPage: string = "no";
  private data: any = {};

  public setPage(page: string) {
    this.showPage = page;
  }

  public setData(data: any) {
    this.data = data;
  }
}
</script>

<style>
</style>
