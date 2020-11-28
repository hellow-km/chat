<template>
  <div class="main">
    <SideBar
      :tabsData="sideTabInfos"
      :box="sideTabBox"
    ></SideBar>
    <div class="panel">
      <div class="panel-head clearfix">
        <div class="panel-user">
          <img
            :src="PersonalData.avatar"
            class="user-avatar"
          >
          <span class="user-name">{{PersonalData.name}}</span>
        </div>
        <div class="user-add">
          <a
            @click="onDownMenu($event,$root)"
            class="opt"
            href="javascript:;"
          ><i class="el-icon-s-unfold"></i></a>
        </div>
      </div>
      <SearchBar></SearchBar>
      <hr style="border:0;border-bottom:1px solid #777;margin:10px 0">
    </div>
    <SoundHandlerPane ref="mainSound"></SoundHandlerPane>

  </div>
</template>

<script lang="ts">
import "../styles/layout.css";
import "../styles/main.css";

import Vue from "vue";
import { Component } from "vue-property-decorator";

import SoundHandlerPane from "@/views/main/SoundHandlerPane.vue";
import SearchBar from "@/views/main/SearchBar.vue";

import SoundType from "@/app/com/main/component/SoundType";
import SideBar from "@/views/main/SideBar.vue";
import SideTabData from "@/views/main/SideTabData";
import SideTabBox from "@/views/main/SideTabBox";
import PersonalDataBox from "@/impl/PersonalDataBox";
import PersonalData from "@/views/common/data/PersonalData";

@Component({
  components: {
    SoundHandlerPane,
    SideBar,
    SearchBar
  }
})
export default class Main extends Vue {
  private sideTabInfos: SideTabData[] = new Array<SideTabData>();
  private sideTabBox: SideTabBox = new SideTabBox();
  private currentTab: string = "";
  private PersonalData: PersonalData = PersonalDataBox.personalData;
  public mounted() {
    this.init();
  }

  private init(): void {
    this.initTabs();
  }

  private initTabs(): void {
    const onTabSelected: (data: SideTabData) => void = (d: SideTabData) => {
      if (d) {
        const key = d.key;
        this.onTabSelected(key);
      }
    };

    let data: SideTabData = new SideTabData();
    data.key = "message_tab";
    data.normalImage = "assets/images/main/tab/message_normal.png";
    data.selectedImage = "assets/images/main/tab/message_selected.png";
    data.prompt = "消息列表";
    data.selected = true;
    // data.red = true;
    // data.redCount = 22;
    data.setOnSelected(onTabSelected);
    this.sideTabInfos.push(data);

    data = new SideTabData();
    data.key = "user_tab";
    data.normalImage = "assets/images/main/tab/user_normal.png";
    data.selectedImage = "assets/images/main/tab/user_selected.png";
    data.image = data.normalImage;
    data.prompt = "联系人";
    data.setOnSelected(onTabSelected);
    this.sideTabInfos.push(data);

    data = new SideTabData();
    data.key = "group_tab";
    data.normalImage = "assets/images/main/tab/group_normal.png";
    data.selectedImage = "assets/images/main/tab/group_selected.png";
    data.image = data.normalImage;
    data.prompt = "组群";
    data.setOnSelected(onTabSelected);
    this.sideTabInfos.push(data);

    data = new SideTabData();
    data.key = "module_tab";
    data.normalImage = "assets/images/main/tab/app_normal.png";
    data.selectedImage = "assets/images/main/tab/app_selected.png";
    data.image = data.normalImage;
    data.prompt = "更多";
    data.setOnSelected(onTabSelected);
    this.sideTabInfos.push(data);
  }

  private onTabSelected(key: string): void {
    this.currentTab = key;
  }
}
</script>

<style>
</style>
