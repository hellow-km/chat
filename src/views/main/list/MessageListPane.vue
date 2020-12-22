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
import { Vue, Component, Emit } from "vue-property-decorator";

import IconListPane from "../../common/list/IconListPane.vue";
import IconItemData from "../../common/list/IconItemData";
import messageListModel from "@/impl/data/MessageListModel";
import IconItemBox from "@/views/common/list/IconItemBox";
import MessageController from "@/app/com/main/controller/MessageController";
import App from "@/app/App";
import DataBackAction from "@/app/base/net/DataBackAction";
import DataUtil from "@/app/lib/util/DataUtil";
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
  @Emit("on-item-selected")
  public onItemSelected(data: IconItemData) {
    // TODO
    return data;
  }

  @Emit("on-item-deleted")
  private itemDeleted(data: IconItemData) {
    return data;
  }
}
</script>

<style>
</style>
