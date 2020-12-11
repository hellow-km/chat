<template>
  <div class="search-bar">
    <div class="search">
      <img
        src="@/images/main/search/search.png"
        class="search-icon"
      >
      <input
        type="text"
        class="search-input"
        placeholder="搜索"
        v-model="text"
        @keyup="onSearchChange"
      >
      <img
        src="@/images/main/search/close.png"
        class="search-close"
        @click="clearSearch"
        v-show="showPane"
      >
    </div>
    <div
      v-show="showPane"
      class="search-pop"
    >
      <div class="pop-contain">
        <div v-show="showUserList">
          <div>
            <h4>好友</h4>
          </div>
          <div v-for="(item,index) in userList">
            <ItemPane
              :data="item"
              :box="itemBox"
            ></ItemPane>
          </div>
        </div>
        <div v-show="showGroupList">
          <div>
            <h4>群组</h4>
          </div>
          <div v-for="(item,index) in groupList">
            <ItemPane
              :data="item"
              :box="itemBox"
            ></ItemPane>
          </div>
        </div>
        <div v-show="showFindUserList">
          <div>
            <h4>查到的用户</h4>
          </div>
          <div
            v-for="(item,index) in findUserList"
            style="position:relative"
          >
            <ItemPane
              :data="item"
              :box="itemBox"
            ></ItemPane>
            <div class="pane-option">
              <i
                class="el-icon-s-custom"
                @click="handleShowUser(item.key)"
              ></i>
              <i
                class="el-icon-plus"
                @click="handleAddUser(item.key)"
              ></i>
            </div>
          </div>
        </div>
        <div v-show="showFindGroupList">
          <div>
            <h4>查到的群</h4>
          </div>
          <div
            v-for="(item,index) in findGroupList"
            style="position:relative"
          >
            <ItemPane
              :data="item"
              :box="itemBox"
            ></ItemPane>
            <div class="pane-option">
              <i
                class="el-icon-s-order"
                @click="handleShowGroup(item.key)"
              ></i>
              <i
                class="el-icon-plus"
                @click="handleJoinGroup(item.key)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <addUser ref="addUser">
    </addUser>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import ItemData from "@/views/common/list/ItemData";
import ItemPane from "@/views/common/list/ItemPane.vue";
import ItemBox from "@/views/common/list/ItemBox";
import addUser from "@/views/find/AddUser.vue";
import DataBackAction from "@/app/base/net/DataBackAction";
import DataUtil from "@/app/lib/util/DataUtil";
import FindController from "@/app/com/main/controller/FindController";
import App from "@/app/App";

@Component({
  components: {
    ItemPane,
    addUser
  }
})
export default class SearchBar extends Vue {
  private text: string = "";
  private showPane: boolean = false;
  private showUserList: boolean = true;
  private showGroupList: boolean = true;
  private showFindUserList: boolean = true;
  private showFindGroupList: boolean = true;
  private userList: ItemData[] = [];
  private groupList: ItemData[] = [];
  private findUserList: ItemData[] = [];
  private findGroupList: ItemData[] = [];
  private itemBox: ItemBox = new ItemBox();

  private onSearchChange(): void {
    const text = this.text;
    if (text) {
      this.showPane = true;
      this.querySearchUser();
    } else {
      this.showPane = false;
    }
  }

  private clearSearch(): void {
    this.text = "";
    this.showPane = false;
  }

  private querySearchUser() {
    const text = this.text;
    const userId = this.$store.state.userId;
    const back: DataBackAction = {
      back: (data: any) => {
        if (DataUtil.isSuccess(data)) {
          const body = DataUtil.getBody(data);
          this.findUserList = body;
        }
      }
    };
    const fdu: FindController = App.appContext.getMaterial(FindController);
    fdu.searchUser(userId, text, back);
  }

  private handleShowUser(): void {}

  private handleAddUser(userId: string): void {
    const addUser: any = this.$refs.addUser;
    addUser.openDia();
    addUser.setUserId(userId);
  }
  private handleShowGroup(): void {}
  private handleJoinGroup(): void {}
}
</script>

<style>
</style>
