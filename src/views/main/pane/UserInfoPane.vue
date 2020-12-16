<template>
  <div>
    <div class="user-info-pane">
      <div class="head">
        <span>详细信息</span>
      </div>
      <div
        class="page"
        v-if="user.id"
      >
        <div>
          <div class="avatar">
            <el-avatar
              shape="square"
              :size="100"
              :src="user.avatar"
            ></el-avatar>
          </div>
          <div class="nickName">
            <span>{{user.nickName}}</span>
          </div>
        </div>
        <div class="signature">
          <p>{{user.signature}}</p>
        </div>
        <div class="message">
          <el-row>
            <el-col :span="12">
              <span>备注：</span>
            </el-col>
            <el-col :span="12">
              <span>{{user.remark}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span>账号：</span>
            </el-col>
            <el-col :span="12">
              <span>{{user.account}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span>邮箱：</span>
            </el-col>
            <el-col :span="12">
              <span>{{user.email}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span>地区：</span>
            </el-col>
            <el-col :span="12">
              <span>{{user.locationAddress}}</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-button
            type="success"
            style="width:70%"
          >发消息</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import User from "@/app/com/bean/User";
@Component
export default class UserInfoPane extends Vue {
  private user: User = new User();

  public setUser(user: User) {
    this.user = user;
  }
}
</script>

<style>
</style>
