<template>
  <div style="width: 100%">
    <el-card class="box-card">
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
          prop="gender"
          label="性别"
          width="180"
        >
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
            >添加好友</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import User from "@/app/com/bean/User";
@Component
export default class FindUser extends Vue {
  private list: User[] = [
    {
      id: "1",
      gender: "男",
      nickName: "423",
      avatar: "/assets/images/common/head/user/1.png",
      nativePlace: "广西"
    } as User
  ];
}
</script>

<style>
</style>
