<template>
  <div class="main">
    <SideBar
      :tabsData="sideTabInfos"
      :box="sideTabBox"
      @on-button-click="handleSetting"
    ></SideBar>
    <div class="main-page">
      <div class="panel left">
        <div class="">
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
        </div>
        <div class="panel-list">
          <div>
            <div v-show="currentTab=='message_tab'">
              <MessageListPane
                @on-item-deleted="removeMessage"
                @on-item-selected="selectItemMessage"
              ></MessageListPane>
            </div>
            <div v-show="currentTab=='user_tab'">
              <UserListPane
                @on-node-context-menu='onUserNodeContextMenu'
                @on-item-selected="onUserSelected"
                @on-item-context-menu='onUserItemContextMenu'
                @on-toggle-class="onToggleClass"
              ></UserListPane>
            </div>
            <div v-show="currentTab=='group_tab'">
              <GroupListPane
                @on-node-context-menu='onGroupNodeContextMenu'
                @on-item-selected="onGroupSelected"
                @on-item-context-menu='onGroupItemContextMenu'
                @on-toggle-class="onToggleClass"
              ></GroupListPane>
            </div>
            <div v-show="currentTab=='module_tab'">
              <ModuleMenu></ModuleMenu>
            </div>
          </div>
        </div>
      </div>
      <div
        class="left"
        style="flex:7"
      >
        <div v-show="currentTab=='message_tab'">
          <MessagePane ref="messagePane"></MessagePane>
        </div>
        <div v-show="currentTab=='user_tab'">
          <UserInfoPane
            ref="userInfoPane"
            @on-send="toUserMessage"
          ></UserInfoPane>
        </div>
        <div
          class="box"
          v-show="currentTab=='module_tab'"
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
import MessageListPane from "./main/list/MessageListPane.vue";
import ModuleMenu from "@/views/main/ModuleMenu.vue";
import MainMenu from "@/views/main/MainMenu.vue";
import SettingPane from "@/views/main/setting/SettingPane.vue";
import UserInfoPane from "./main/pane/UserInfoPane.vue";
import MessagePane from "@/views/main/message/MessagePane.vue";

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
import DataUtil from "@/app/lib/util/DataUtil";
import MessageListModel from "@/impl/data/MessageListModel";
import BaseUtil from "@/app/lib/util/BaseUtil";
import MessageController from "@/app/com/main/controller/MessageController";
import store from "@/store";
import DataBackAction from "@/app/base/net/DataBackAction";
import IconItemData from "@/views/common/list/IconItemData";
import ContactCategoryController from "@/app/com/main/controller/ContactCategoryController";
import UserChatViewModel from "@/impl/data/UserChatViewModel";

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
    UserInfoPane,
    MessageListPane,
    MessagePane
  }
})
export default class Main extends Vue {
  private sideTabInfos: SideTabData[] = new Array<SideTabData>();
  private sideTabBox: SideTabBox = new SideTabBox();
  private currentTab: string = "";
  private PersonalData: PersonalData = personalDataBox.personalData;
  private userId: string = store.state.userId;
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
    } else if (newVal == "message_tab") {
      this.getMessage();
    }
  }

  private updateList() {
    const addBack = () => {
      const _this: any = this;
      const bus: any = _this.$bus;
      bus.$emit("addContactCategory");
    };
    InitializeData.setListData(this.userId, addBack);
  }

  private setMessagePage(page: string) {
    this.$nextTick(() => {
      const messagePane: any = this.$refs.messagePane;
      messagePane.setPage(page);
    });
  }

  private setMessagePageData(data: any) {
    this.$nextTick(() => {
      const messagePane: any = this.$refs.messagePane;
      messagePane.setUserId(data);
    });
  }

  private onToggleClass(data: NodeData) {
    if (data) {
      data.isOpen = !data.isOpen;
      const back: DataBackAction = {
        back: (data: any) => {}
      };
      const ccl: ContactCategoryController = App.appContext.getMaterial(
        ContactCategoryController
      );
      const userId = this.userId;
      const key = data.key;
      const isOpen = data.isOpen;
      let type = "";
      if (this.currentTab == "user_tab") {
        type = "user";
      } else if (this.currentTab == "group_tab") {
        type = "group";
      }
      const body = {
        type,
        userId,
        key,
        isOpen
      };
      ccl.toggleClass(body, back);
    }
  }

  private toUserMessage(userId: string) {
    this.selectedTab("message_tab");
    this.addUserMessage(userId);
    this.setMessagePage("user_chat");
  }

  private addUserMessage(targetUserId: string) {
    const back: DataBackAction = {
      back: (data: any) => {
        if (DataUtil.isSuccess(data)) {
          const body = DataUtil.getBody(data);
          this.getMessage(() => {
            this.selectMessage(body.type, body.key);
          });
        }
      }
    };
    const mcl: MessageController = App.appContext.getMaterial(
      MessageController
    );
    mcl.addUserMessage(this.userId, targetUserId, back);
  }

  private selectItemMessage(data: IconItemData) {}

  private selectMessage(type: string, key: string) {
    MessageListModel.selectItem(type, key);
  }

  private removeMessage(item: IconItemData) {}

  private getMessage(callback?: Function) {
    const back = {
      back: (data: any) => {
        if (DataUtil.isSuccess(data)) {
          const body = DataUtil.getBody(data)[0];
          const userMessage = body.userMessage;
          const groupMessage = body.groupMessage;
          let messageList = [...userMessage, ...groupMessage];
          messageList.sort(BaseUtil.compare("createTime", true));
          for (const value of messageList) {
            const type = value.type;
            MessageListModel.addOrUpdateItem(
              type,
              value.key,
              value.name,
              value.avatar,
              value.gray,
              (key: string) => {
                const chatTpye = type == "user" ? "user_chat" : "group_chat";
                this.setMessagePageData(value);
                this.setMessagePage(chatTpye);
                UserChatViewModel.setName(value.name);
              },
              (userId: string) => {
                const back: DataBackAction = {
                  back: (data: any) => {
                    if (DataUtil.isSuccess(data)) {
                      const isSelect = MessageListModel.isItemShowing(
                        type,
                        value.key
                      );
                      MessageListModel.removeItem(type, value.key);
                      if (isSelect) {
                        this.setMessagePage("no");
                      }
                    }
                  }
                };
                const mcl: MessageController = App.appContext.getMaterial(
                  MessageController
                );
                mcl.removeMessage(this.userId, type, value.key, back);
              }
            );
          }
          const _this: any = this;
          _this.$bus.$emit("setMessageList");
          callback && callback();
        }
      }
    };
    const userId = this.userId;
    const mcl: MessageController = App.appContext.getMaterial(
      MessageController
    );
    mcl.getMessageList(userId, back);
  }

  private selectedTab(key: string): void {
    if (this.currentTab === key) {
      return;
    }
    for (const data of this.sideTabInfos) {
      if (data.key === key) {
        this.sideTabBox.select(data);
        break;
      }
    }
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

  private onUserItemContextMenu(e: MouseEvent, data: ItemData) {}

  private onUserSelected(data: User) {
    if (data) {
      const userInfoPane: any = this.$refs.userInfoPane;
      userInfoPane.setUser(data);
    }
  }

  private onUserNodeContextMenu(e: MouseEvent, data: ItemData) {}
  private onGroupItemContextMenu(e: MouseEvent, data: ItemData) {}
  private onGroupSelected(data: ItemData) {}
  private onGroupNodeContextMenu(e: MouseEvent, data: NodeData) {}

  private handleSetting() {
    const settingPane: any = this.$refs.settingPane;
    settingPane.setShow(true);
  }
}
</script>

<style>
</style>
