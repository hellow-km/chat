<template>
  <div>
    <el-dialog
      style="z-index:9999"
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :show-close="false"
    >
      <el-input
        placeholder="名称"
        v-model="text"
      ></el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class OneItemForm extends Vue {
  @Prop({
    type: String,
    required: false,
    default: "标题"
  })
  private title!: String;

  private dialogVisible: boolean = false;
  private text: string = "";

  public openDia(): void {
    this.dialogVisible = true;
  }

  @Emit("on-submit")
  private submit() {
    this.dialogVisible = false;
    return this.text || "";
  }

  @Emit("on-cancel")
  private handleClose() {
    this.text = "";
    this.dialogVisible = false;
  }
}
</script>

<style>
</style>
