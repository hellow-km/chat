<template>
  <div>
    <el-menu
      background-color="#515a6e"
      text-color="rgba(255, 255, 255, 0.7)"
      active-text-color="rgba(255, 255, 255, 0.7)"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="icon-duoren"></i>
          <span>联系人</span>
        </template>
        <el-menu-item index="1-1">添加联系人</el-menu-item>
        <el-menu-item index="1-2">加入群</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>消息通知</span>
        </template>
        <el-menu-item index="2-1">查看通知</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ModuleMenu extends Vue {}
</script>

<style>
</style>
