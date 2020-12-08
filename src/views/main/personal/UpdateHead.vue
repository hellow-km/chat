<template>
  <div>
    <el-dialog
      title="上传头像"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="beforeClose"
      :close-on-click-modal="false"
    >
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/menu/updateHead"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        accept="image/*"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        ></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Prompt from "@/components/common/Prompt";

@Component
export default class UpdateHead extends Vue {
  private dialogVisible: boolean = false;
  private imageUrl: string = "";
  public openDia() {
    this.dialogVisible = true;
  }

  private beforeClose(done: Function) {
    done();
  }

  private beforeAvatarUpload(file: File) {
    const isJPNG = file.type === "image/jpeg" || file.type === "image/png";
    const isLt3M = file.size / 1024 / 1024 < 3;

    if (!isJPNG) {
      this.$message.error("上传图片只能为jpg或png格式");
    }
    if (!isLt3M) {
      this.$message.error("上传头像图片大小不能超过 3MB!");
    }
    return isJPNG && isLt3M;
  }

  private handleAvatarSuccess(res: any, file: any) {
    if (res.info) {
      const info = res.info;
      Prompt.message(info, "", "");
      if (info.success) {
        const url: string = res.body.url;
        this.$emit("get-url", url);
        this.dialogVisible = false;
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
