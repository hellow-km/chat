<template>
  <div>
    <el-dialog
      title="上传头像"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="beforeClose"
      :close-on-click-modal="false"
    >

    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class UpdateHead extends Vue {
  private dialogVisible: boolean = false;

  public openDia() {
    this.dialogVisible = true;
  }

  private beforeClose(done: Function) {
    done();
  }
}
</script>

<style>
</style>
