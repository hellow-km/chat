<template>
  <div>
    <RootPane
      :items="nodes"
      :box="box"
      @on-node-context-menu='onNodeContextMenu'
      @on-item-selected="onItemSelected"
      @on-item-context-menu='onItemContextMenu'
    ></RootPane>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import RootPane from "../../common/list/RootPane.vue";
import ItemBox from "@/views/common/list/ItemBox";
import ItemData from "@/views/common/list/ItemData";
import NodeData from "../../common/list/NodeData";
import ListData from "@/impl/data/ListData";
@Component({
  components: {
    RootPane
  }
})
export default class GroupListPane extends Vue {
  public nodes: NodeData[] = ListData.groupNodes;
  private box: ItemBox = new ItemBox();
  @Emit("on-node-context-menu")
  private onNodeContextMenu(e: MouseEvent, data: NodeData) {
    // 菜单
  }

  @Emit("on-item-selected")
  private onItemSelected(data: ItemData) {
    // TODO
  }

  @Emit("on-item-context-menu")
  private onItemContextMenu(e: MouseEvent, data: ItemData) {
    // 选中
  }
}
</script>

<style>
</style>
