<template>
  <div
    class="pane"
    @click="onClick"
    @contextmenu='contextMenu'
  >
    <div
      class="pane-item clearfix"
      :class="data.active?'pane-active':''"
    >
      <div class="pane-avatar left">
        <img
          :src="data.avatar"
          :class="data.gray?'img gray':'img'"
          width="32"
          height="32"
        >
      </div>
      <div class="pane-name left">
        <h4>{{data.name}}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import ItemData from "@/views/common/list/ItemData";
import ItemBox from "@/views/common/list/ItemBox";
@Component
export default class ItemPane extends Vue {
  @Prop({
    type: ItemData,
    required: false,
    default: new ItemData()
  })
  private data!: ItemData;

  @Prop({
    type: ItemBox,
    required: false,
    default: new ItemBox()
  })
  private box!: ItemBox;

  public onClick() {
    if (this.box && this.data) {
      this.box.select(this.data);
    }
    if (this.data) {
      this.selected(this.data);
    }
  }

  public contextMenu(e: MouseEvent) {
    if (this.data) {
      this.onContextMenu(e, this.data);
    }
  }

  @Emit("on-selected")
  private selected(data: ItemData) {
    // 选中
  }

  @Emit("on-context-menu")
  private onContextMenu(e: MouseEvent, data: ItemData) {
    // 菜单
  }
}
</script>

<style>
</style>
