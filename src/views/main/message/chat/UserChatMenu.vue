<template>
  <div class="chat-user-menu">
    <div class="menu-box">
      <ul>
        <li>
          <a
            href="javascript:;"
            class="chat-face"
            @click="openFace"
          >
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            class="chat-file"
            @click="openFile"
          >
          </a>
        </li>
        <li>
          <el-upload
            class="upload-demo"
            action="http://localhost:3000/menu/uploadImage"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            accept="image/*"
          >
            <a
              href="javascript:;"
              style="color:rgb(95,95,95)"
            >
              <i class="el-icon-picture-outline">
              </i>
            </a>
          </el-upload>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

@Component
export default class UserChatMenu extends Vue {
  private beforeAvatarUpload(file: File) {
    const isJPNG = file.type.includes("image");
    if (!isJPNG) {
      this.$message.error("上传图片只能为图片格式");
    }
    return isJPNG;
  }

  private handleAvatarSuccess(res: any, file: any) {
    if (res.info) {
      const info = res.info;
      if (info.success) {
        const url: string = res.body.url;
        const html = `<img src="${url}" width="150" height="150"/>`;
        this.openPicture(html);
      }
    }
  }

  @Emit("on-open-face")
  private openFace() {}

  @Emit("on-open-file")
  private openFile() {}

  @Emit("on-open-picture")
  private openPicture(html: string) {}
}
</script>

<style>
</style>
