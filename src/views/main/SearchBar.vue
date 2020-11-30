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
    <userDia ref="userDia">
    </userDia>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import ItemData from "@/views/common/list/ItemData";
import ItemPane from "@/views/common/list/ItemPane.vue";
import ItemBox from "@/views/common/list/ItemBox";
import userDia from "@/views/find/AddUser.vue";

@Component({
  components: {
    ItemPane,
    userDia
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

  public mounted() {
    const a: ItemData = new ItemData();
    a.active = false; 
    a.name = "123";
    const u: ItemData = new ItemData();
    u.active = false;
    u.name = "123";
    const u1: ItemData = new ItemData();
    u1.active = false;
    u1.name = "123";
    const u2: ItemData = new ItemData();
    u2.active = false;
    u2.name = "123";

    this.userList.push(a);
    this.groupList.push(u);
    this.findUserList.push(u1);
    this.findUserList.push(u1);
    this.findGroupList.push(u2);
    this.findGroupList.push(u2);
  }

  private onSearchChange(): void {
    const text = this.text;
    if (text) {
      this.showPane = true;
    } else {
      this.showPane = false;
    }
  }

  private clearSearch(): void {
    this.text = "";
    this.showPane = false;
  }

  private handleShowUser(): void {}
  private handleAddUser(userId: string): void {
    const userDia: any = this.$refs.userDia;
    userDia.openDia(true);
    userDia.setUserId(userId);
  }
  private handleShowGroup(): void {}
  private handleJoinGroup(): void {}
}
</script>

<style>
</style>
