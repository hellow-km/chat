<template>
  <div>
    <div
      v-for="item in data"
      class="chat-message-box-item clearfix"
    >
      <div
        class="chat-message-box-item-context"
        :class="item.isOwn?'right':'left'"
      >
        <div :class="item.isOwn?'right':'left'">
          <el-avatar
            :size="35"
            :src="item.user.avatar"
          ></el-avatar>
        </div>
        <div :class="item.isOwn?'right':'left'">
          <span>{{item.showName}}</span>
        </div>
        <div
          class=""
          :class="item.isOwn?'right':'left'"
        >
          <div class="item-context-message">
            <div :class="item.isOwn?'right-arrow':'left-arrow'"></div>
            <div v-html="item.content.html"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import ContentData from "@/views/common/chat/ContentData";

@Component
export default class MessageBox extends Vue {
  @Prop({
    type: Array,
    required: false,
    default: () => new Array<ContentData>()
  })
  private data!: ContentData[];
}
</script>

<style>
</style>
