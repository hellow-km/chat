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
import { Vue, Component, Emit, Watch } from "vue-property-decorator";
import RootPane from "../../common/list/RootPane.vue";
import ItemBox from "@/views/common/list/ItemBox";
import ItemData from "@/views/common/list/ItemData";
import GroupNodeData from "../../common/list/GroupNodeData";
import ListData from "@/impl/data/ListData";
@Component({
  components: {
    RootPane
  }
})
export default class GroupListPane extends Vue {
  public nodes: GroupNodeData[] = ListData.groupNodes;
  private box: ItemBox = new ItemBox();

  mounted() {
    const _this: any = this;
    const bus: any = _this.$bus;
    bus.$on("addGroupCategory", () => {
      this.nodes = ListData.groupNodes;
      //bus.$off("addGroupCategory");
    });
  }

  @Emit("on-node-context-menu")
  private onNodeContextMenu(e: MouseEvent, data: any) {
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
