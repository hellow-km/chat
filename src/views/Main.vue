<template>
  <div class="main">
    <SideBar
      :tabsData="sideTabInfos"
      :box="sideTabBox"
      @on-button-click="handleSetting"
    ></SideBar>
    <div class="main-page">
      <div class="panel left">
        <div class="panel-head clearfix">
          <div class="panel-user">
            <el-avatar
              :src="PersonalData.avatar"
              class="user-avatar"
            >
            </el-avatar>
            <span class="user-name">{{PersonalData.name}}</span>
          </div>
          <div class="user-add">
            <MainMenu></MainMenu>
          </div>
        </div>
        <SearchBar></SearchBar>
        <div style="border:0;height:1px;background-color:#777"></div>
        <div v-show="currentTab=='user_tab'">
          <UserListPane
            @on-node-context-menu='onUserNodeContextMenu'
            @on-item-selected="onUserSelected"
            @on-item-context-menu='onUserItemContextMenu'
          ></UserListPane>
        </div>
        <div v-show="currentTab=='group_tab'">
          <GroupListPane
            @on-node-context-menu='onGroupNodeContextMenu'
            @on-item-selected="onGroupSelected"
            @on-item-context-menu='onGroupItemContextMenu'
          ></GroupListPane>
        </div>
        <div v-show="currentTab=='module_tab'">
          <ModuleMenu></ModuleMenu>
        </div>
      </div>
      <div
        class="left"
        style="flex:7"
      >
        <div v-if="currentTab=='user_tab'">
          <UserInfoPane ref="userInfoPane"></UserInfoPane>
        </div>
        <div
          class="box"
          v-if="currentTab=='module_tab'"
        >
          <router-view></router-view>
        </div>
      </div>
    </div>
    <SoundHandlerPane ref="mainSound"></SoundHandlerPane>
    <SettingPane ref="settingPane"></SettingPane>
  </div>
</template>

<script lang="ts">
import "../styles/layout.css";
import "../styles/main.css";

import { Component, Vue, Watch } from "vue-property-decorator";

import SoundHandlerPane from "@/views/main/SoundHandlerPane.vue";
import SideBar from "@/views/main/SideBar.vue";
import SearchBar from "@/views/main/SearchBar.vue";
import UserListPane from "./main/list/UserListPane.vue";
import GroupListPane from "./main/list/GroupListPane.vue";
import ModuleMenu from "@/views/main/ModuleMenu.vue";
import MainMenu from "@/views/main/MainMenu.vue";
import SettingPane from "@/views/main/setting/SettingPane.vue";
import UserInfoPane from "./main/pane/UserInfoPane.vue";

import SoundType from "@/app/com/main/component/SoundType";
import SideTabData from "@/views/main/SideTabData";
import SideTabBox from "@/views/main/SideTabBox";
import ItemData from "@/views/common/list/ItemData";
import NodeData from "@/views/common/list/NodeData";
import PersonalBox from "@/app/com/main/box/PersonalBox";

import App from "@/app/App";
import PersonalData from "@/views/common/data/PersonalData";
import personalDataBox from "@/impl/PersonalDataBox";
import InitializeData from "@/impl/initialize/InitializeData";
import User from "@/app/com/bean/User";

@Component({
  components: {
    SoundHandlerPane,
    SideBar,
    SearchBar,
    UserListPane,
    GroupListPane,
    ModuleMenu,
    MainMenu,
    SettingPane,
    UserInfoPane
  }
})
export default class Main extends Vue {
  private sideTabInfos: SideTabData[] = new Array<SideTabData>();
  private sideTabBox: SideTabBox = new SideTabBox();
  private currentTab: string = "";
  private PersonalData: PersonalData = personalDataBox.personalData;
  public mounted() {
    this.init();
  }

  private init(): void {
    this.initTabs();
  }

  @Watch("currentTab")
  private currentChange(newVal: string, oldVal: string) {
    if (newVal == "user_tab" || newVal == "group_tab") {
      this.updateList();
    }
  }

  private updateList() {
    const addBack = () => {
      const _this: any = this;
      const bus: any = _this.$bus;
      bus.$emit("addContactCategory");
    };
    const id = this.$store.state.userId;
    InitializeData.setListData(id, addBack);
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
    data.normalImage = "/assets/images/main/tab/message_normal.png";
    data.selectedImage = "/assets/images/main/tab/message_selected.png";
    data.prompt = "消息列表";
    data.selected = true;
    // data.red = true;
    // data.redCount = 22;
    data.setOnSelected(onTabSelected);
    this.sideTabInfos.push(data);

    data = new SideTabData();
    data.key = "user_tab";
    data.normalImage = "/assets/images/main/tab/user_normal.png";
    data.selectedImage = "/assets/images/main/tab/user_selected.png";
    data.image = data.normalImage;
    data.prompt = "联系人";
    data.setOnSelected(onTabSelected);
    this.sideTabInfos.push(data);

    data = new SideTabData();
    data.key = "group_tab";
    data.normalImage = "/assets/images/main/tab/group_normal.png";
    data.selectedImage = "/assets/images/main/tab/group_selected.png";
    data.image = data.normalImage;
    data.prompt = "组群";
    data.setOnSelected(onTabSelected);
    this.sideTabInfos.push(data);

    data = new SideTabData();
    data.key = "module_tab";
    data.normalImage = "/assets/images/main/tab/app_normal.png";
    data.selectedImage = "/assets/images/main/tab/app_selected.png";
    data.image = data.normalImage;
    data.prompt = "更多";
    data.setOnSelected(onTabSelected);
    this.sideTabInfos.push(data);
    const db: PersonalBox = App.appContext.getMaterial(PersonalBox);
  }

  private onTabSelected(key: string): void {
    this.currentTab = key;
  }

  private onUserItemContextMenu(e: MouseEvent, data: ItemData) {
    // if (data) {
    //   const userId = data.key;
    //   const menuName = "userContextMenu";
    //   const menu: any = this.$refs[menuName];
    //   menu.show(e, userId);
    // }
  }

  private onUserSelected(data: User) {
    if (data) {
      const userInfoPane: any = this.$refs.userInfoPane;
      userInfoPane.setUser(data);
    }
  }

  private onUserNodeContextMenu(e: MouseEvent, data: ItemData) {
    // if (data) {
    //   const id = data.key;
    //   const menuName = "userNodeContextMenu";
    //   const menu: any = this.$refs[menuName];
    //   menu.show(e, id);
    // }
  }
  private onGroupItemContextMenu(e: MouseEvent, data: ItemData) {
    // if (data) {
    //   const groupId = data.key;
    //   const groupContextMenuName = "groupContextMenu";
    //   const groupContextMenu: any = this.$refs[groupContextMenuName];
    //   groupContextMenu.show(e, groupId);
    // }
  }
  private onGroupSelected(data: ItemData) {
    // if (data) {
    //   const groupId = data.key;
    //   const groupInfoPaneName = "groupInfoPane";
    //   const groupInfoPane: any = this.$refs[groupInfoPaneName];
    //   groupInfoPane.setGroupId(groupId);
    //   const groupMemberListController: GroupMemberListController = app.appContext.getMaterial(
    //     GroupMemberListController
    //   );
    //   groupMemberListController.loadMemberListByGroupId(groupId);
    // }
  }
  private onGroupNodeContextMenu(e: MouseEvent, data: NodeData) {
    // if (data) {
    //   const id = data.key;
    //   const menuName = "groupNodeContextMenu";
    //   const menu: any = this.$refs[menuName];
    //   menu.show(e, id);
    // }
  }

  private handleSetting() {
    const settingPane: any = this.$refs.settingPane;
    settingPane.setShow(true);
  }
}
</script>

<style>
</style>
