<template>
  <div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="联系人验证"
        name="userAdd"
      >
        <UserAdd></UserAdd>
      </el-tab-pane>
      <el-tab-pane
        label="群加入验证"
        name="groupAdd"
      >群加入验证</el-tab-pane>
      <el-tab-pane
        label="群邀请加入验证"
        name="groupAddUser"
      >群邀请加入验证</el-tab-pane>
      <el-tab-pane
        label="被邀请加入群处理"
        name="addGroup"
      >被邀请加入群处理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UserAdd from "./tabs/UserAdd.vue";

@Component({
  components: {
    UserAdd
  }
})
export default class ApplyHandleNotice extends Vue {
  private activeName: string = "userAdd";

  private handleClick() {}
}
</script>

<style>
</style>
