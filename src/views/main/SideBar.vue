<template>
  <div class="sidebar">
    <div class="sidebar-menu">
      <ul>
        <li v-for="(item,index) in tabsData">
          <SideTab
            :tabData="item"
            :box="box"
          ></SideTab>
        </li>
      </ul>
    </div>
    <div class="sidebar-more">
      <img
        class="sidebar-more-icon"
        src="/assets/images/main/tab/button_menu.png"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import SideTab from "./SideTab.vue";
import SideTabData from "@/views/main/SideTabData";
import SideTabBox from "@/views/main/SideTabBox";
@Component({
  components: {
    SideTab
  }
})
export default class sideBar extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: () => {
      new Array<SideTabData>();
    }
  })
  private tabsData!: SideTabData[];

  @Prop({
    type: SideTabBox,
    required: false,
    default: () => new SideTabBox()
  })
  private box!: SideTabBox;

  public mounted() {
    //
  }

  private selectedTab(key: string) {
    this.onTabSelected(key);
  }

  @Emit("on-tab-selected")
  private onTabSelected(key: string) {
    // 选中
  }

  @Emit("on-button-click")
  private onMenuClick() {
    // 选中
  }
}
</script>

<style>
</style>
