<template>
  <div
    class="sidebar-tab"
    @click="onClick"
  >
    <img
      :src="tabData.image"
      :alt="tabData.prompt"
      class="sidebar-tab-icon"
      height="32"
      width="32"
    >
    <div>
      <span class="sidebar-tab-prompt">{{tabData.prompt}}</span>
      <span :class="tabData.red?'sidebar-tab-notice':''">
        {{tabData.redCount>0?tabData.redCount:''}}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Emit, Prop } from "vue-property-decorator";
import SideTabData from "./SideTabData";
import SideTabBox from "./SideTabBox";
@Component
export default class SideTab extends Vue {
  @Prop({
    type: SideTabData,
    required: false,
    default: () => new SideTabData()
  })
  private tabData!: SideTabData;

  @Prop({
    type: SideTabBox,
    required: false,
    default: () => new SideTabBox()
  })
  private box!: SideTabBox;

  public mounted() {
    if (this.tabData && this.tabData.selected) {
      this.onClick();
    }
  }

  public onClick() {
    if (this.box) {
      this.box.select(this.tabData);
      // this.selectedWatch();
    }
  }

  private selectedWatch() {
    if (this.tabData && this.tabData.selected) {
      // this.$emit('on-selected','122');
      this.selected(this.tabData.key);
    }
  }

  @Emit("on-selected")
  private selected(key: string) {
    // 选中
  }
}
</script>

<style>
</style>
