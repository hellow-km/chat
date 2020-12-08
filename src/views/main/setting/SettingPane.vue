<template>
  <div>
    <el-dialog
      title="设置"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="clearfix">
        <div class="left">
          <el-radio-group v-model="tab">
            <el-radio :label="1">好有添加验证</el-radio>
          </el-radio-group>
        </div>
        <div
          class="left"
          style="margin-left:20px;"
        >
          <div v-show="tab==1">
            <ContactHarassSettingPane></ContactHarassSettingPane>
          </div>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="cancel"
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="submit"
          size="small"
        >保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import ContactHarassSettingPane from "@/views/module/contact/ContactHarassSettingPane.vue";

import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {
    ContactHarassSettingPane
  }
})
export default class SettingPane extends Vue {
  private dialogVisible: boolean = false;
  private tab: number = 1;
  public setShow(is: boolean) {
    this.dialogVisible = is;
  }

  private handleClose() {}

  private submit() {
    this.dialogVisible = false;
  }

  private cancel() {
    this.dialogVisible = false;
  }
}
</script>

<style>
</style>
