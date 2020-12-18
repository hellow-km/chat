<template>
  <div>
    <IconListPane
      :items="items"
      :box="box"
      @on-item-selected="onItemSelected"
      @on-deleted="itemDeleted"
    ></IconListPane>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import IconListPane from "../../common/list/IconListPane.vue";
import IconItemData from "../../common/list/IconItemData";
import messageListModel from "@/impl/data/MessageListModel";
import IconItemBox from "@/views/common/list/IconItemBox";
@Component({
  components: {
    IconListPane
  }
})
export default class MessageListPane extends Vue {
  private items: IconItemData[] = messageListModel.list;
  private box: IconItemBox = messageListModel.box;

  public mounted() {
    const _this: any = this;
    const bus: any = _this.$bus;
    bus.$on("setMessageList", () => {
      this.items = messageListModel.list;
    });
  }

  public onItemSelected(data: IconItemData) {
    // TODO
  }

  private itemDeleted(data: IconItemData) {
    messageListModel.removeItem("user", data.key);
  }
}
</script>

<style>
</style>
