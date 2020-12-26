<template>
  <div>
    <div v-for="item in items">
      <NodePane
        :data="item"
        :box="box"
        @on-context-menu="onNodeContextMenu"
        @on-item-selected="onItemSelected"
        @on-item-context-menu='onItemContextMenu'
        @on-toggle-class="onToggleClass"
      >
      </NodePane>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import NodeData from "@/views/common/list/NodeData";
import ItemBox from "@/views/common/list/ItemBox";
import ItemData from "@/views/common/list/ItemData";
import NodePane from "./NodePane.vue";
import User from "@/app/com/bean/User";
@Component({
  components: {
    NodePane
  }
})
export default class RootPane extends Vue {
  @Prop({
    type: Array,
    required: false,
    default: () => new Array<NodeData>()
  })
  private items!: Array<NodeData>;

  @Prop({
    type: ItemBox,
    required: false,
    default: () => new ItemBox()
  })
  private box!: ItemBox;

  @Emit("on-node-context-menu")
  private onNodeContextMenu(e: MouseEvent, data: NodeData) {
    // 菜单
  }

  @Emit("on-item-selected")
  private onItemSelected(data: User) {
    // 选中
  }

  @Emit("on-item-context-menu")
  private onItemContextMenu(e: MouseEvent, data: ItemData) {
    // 选中
  }

  @Emit("on-toggle-class")
  private onToggleClass(e: MouseEvent, data: ItemData) {
    // 折叠
    return data
  }
}
</script>

<style>
</style>
