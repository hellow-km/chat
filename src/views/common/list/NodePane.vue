<template>
  <div class="node-pane">
    <div
      class="contact-group-list"
      @click="openList"
    >
      <span>{{data.name}}&nbsp;</span>
      <span>{{data.countText}}&nbsp;</span>
      <i :class="data.isOpen?'el-icon-arrow-down':'el-icon-arrow-right'"></i>
    </div>
    <div
      class="contact-list"
      v-show="data.isOpen"
    >
      <div v-for="item of data.items">
        <ItemPane
          :data="item"
          :box="box"
          @on-selected="onItemSelected"
          @on-context-menu='onItemContextMenu'
        ></ItemPane>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import ItemBox from "@/views/common/list/ItemBox";
import NodeData from "@/views/common/list/NodeData";
import ItemData from "@/views/common/list/ItemData";
import ItemPane from "./ItemPane.vue";
import User from "@/app/com/bean/User";
@Component({
  components: {
    ItemPane
  }
})
export default class NodePane extends Vue {
  private isOpen: boolean = false;

  @Prop({
    type: NodeData,
    required: false,
    default: () => new NodeData()
  })
  private data!: NodeData;

  @Prop({
    type: ItemBox,
    required: false,
    default: () => new ItemBox()
  })
  private box!: ItemBox;

  public contextMenu(e: MouseEvent) {
    if (this.data) {
      this.onContextMenu(e, this.data);
    }
  }

  private openList() {
    if (this.data) {
      this.data.isOpen = !this.data.isOpen;
    }
  }

  @Emit("on-context-menu")
  private onContextMenu(e: MouseEvent, data: NodeData) {
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
}
</script>

<style>
</style>
