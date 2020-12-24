<template>
  <div>
    <div v-if="showPage=='user_chat'">
      <UserChatPane :sendUserId="userId"></UserChatPane>
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

@Component({
  components: {
    UserChatPane
  }
})
export default class MessagePane extends Vue {
  private showPage: string = "no";
  private userId: string = "";

  public setPage(page: string) {
    this.showPage = page;
  }

  public setUserId(userId: string) {
    this.userId = userId;
  }
}
</script>

<style>
</style>
