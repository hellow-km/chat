<template>
  <div style="width: 100%">
    <el-card class="box-card">
      <div style="margin-bottom:5px">
        <el-input
          size="small"
          v-model="searchText"
          style="width:50%;margin-right:10px;"
          placeholder="输入昵称或账号搜索"
          @keyup.native.enter="search"
        >
        </el-input>
        <el-button
          type="primary"
          size="small"
          @click="search"
        >搜索</el-button>
      </div>
      <el-table
        :data="list"
        border
        style="width: 100%"
      >
        <el-table-column
          label="昵称"
          width="180"
        >
          <template slot-scope="scope">
            <el-avatar
              size="small"
              style="vertical-align: middle"
              :src="scope.row.avatar"
            ></el-avatar>
            <span style="margin:4px 0 0 4px">{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="性别"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.gender|gender }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="nativePlace"
          label="所在地"
          width="180"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="addUser(scope.row.id)"
            >添加好友</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <addUser ref="addUser"></addUser>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import addUser from "@/views/find/AddUser.vue";

import User from "@/app/com/bean/User";
import DataUtil from "@/app/lib/util/DataUtil";
import DataBackAction from "@/app/base/net/DataBackAction";
import FindController from "@/app/com/main/controller/FindController";
import App from "@/app/App";
@Component({
  components: {
    addUser
  }
})
export default class FindUser extends Vue {
  private searchText: string = "";
  private list: User[] = [];

  private search() {
    const text = this.searchText;
    const userId = this.$store.state.userId;
    if (text.trim() == "") {
      this.list = [];
    }
    const back: DataBackAction = {
      back: (data: any) => {
        if (DataUtil.isSuccess(data)) {
          const body = DataUtil.getBody(data);
          this.list = body;
        }
      }
    };
    const fdu: FindController = App.appContext.getMaterial(FindController);
    fdu.searchUser(userId, text, back);
  }

  private addUser(id: string) {
    const addUser: any = this.$refs.addUser;
    addUser.openDia();
    addUser.setUserId(id);
  }
}
</script>

<style>
</style>
