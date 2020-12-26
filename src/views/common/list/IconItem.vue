<template>
  <div
    @click="onClick"
    @contextmenu='contextMenu'
    style="height:75px"
  >
    <div
      class="message-item"
      :class="data.active?'message-item-active':''"
    >
      <div class="message-item-avatar">
        <el-avatar
          :class="data.gray?'gray':''"
          :size="39"
          :src="data.avatar"
        ></el-avatar>
      </div>
      <div class="message-item-mes">
        <div class="message-item-name">
          <span :class="data.gray?'color-gray':''">{{data.name}}</span>
        </div>
        <div class="message-item-text"><span>{{data.text}}</span></div>
      </div>
      <div class="message-item-time">{{data.time|dateFormat}}</div>
      <div class="message-item-close">
        <i
          class="el-icon-circle-close"
          @click.prevent="onDelete"
        ></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import IconItemData from "@/views/common/list/IconItemData";
import IconItemBox from "@/views/common/list/IconItemBox";
import moment from "moment";
import BaseUtil from "@/app/lib/util/BaseUtil";

@Component({
  filters: {
    dateFormat(val: number) {
      return BaseUtil.dateFormat(val);
    }
  }
})
export default class IconItem extends Vue {
  @Prop({
    type: IconItemData,
    required: false,
    default: () => new IconItemData()
  })
  private data!: IconItemData;

  @Prop({
    type: IconItemBox,
    required: false,
    default: () => new IconItemBox()
  })
  private box!: IconItemBox;

  public onClick() {
    if (this.box && this.data) {
      this.box.select(this.data);
    }
    if (this.data) {
      this.selected(this.data);
      if (typeof this.data.onSelect === "function") {
        this.data.onSelect(this.data.key);
      }
    }
  }

  private onDelete() {
    if (this.data) {
      this.deleted(this.data);
      if (typeof this.data.onDelete === "function") {
        this.data.onDelete(this.data.key);
      }
    }
  }

  private contextMenu() {
    if (this.data) {
      this.onContextMenu(this.data);
    }
  }

  @Emit("on-selected")
  private selected(data: IconItemData) {
    // 选中
    return data;
  }

  @Emit("on-deleted")
  private deleted(data: IconItemData) {
    return data;
  }

  @Emit("on-context-menu")
  private onContextMenu(data: IconItemData) {
    // 菜单
  }
}
</script>

<style scoped>
</style>
