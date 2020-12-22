<template>
  <div class="chat-user-menu">
    <div class="menu-box">
      <ul>
        <li>
          <a
            href="javascript:;"
            class="chat-face"
            @click.prevent="openFace"
          >
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            class="chat-file"
            @click.prevent="openFile"
          >
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            style="color:rgb(95,95,95)"
            @click.prevent="openPicture"
          >
            <i class="el-icon-picture-outline">
            </i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

@Component
export default class UserChatMenu extends Vue {
  @Emit("on-open-face")
  private openFace() {}

  @Emit("on-open-file")
  private openFile() {}

  @Emit("on-open-picture")
  private openPicture() {}
}
</script>

<style>
</style>
