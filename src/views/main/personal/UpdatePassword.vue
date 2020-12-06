<template>
  <div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        :model="rePasswordForm"
        label-width="100px"
        :rules="rePasswrodRules"
        ref="rePasswordForm"
      >
        <el-form-item
          prop="password"
          label="密码"
        >
          <el-input
            type="password"
            v-model="rePasswordForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="newPassword"
          label="新密码"
        >
          <el-input
            type="password"
            v-model="rePasswordForm.newPassword"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="rePassword"
          label="确认密码"
        >
          <el-input
            type="password"
            v-model="rePasswordForm.rePassword"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChangePasswordData from "@/app/com/bean/ChangePasswordData";

import App from "@/app/App";
import Prompt from "@/components/common/Prompt";
import PersonalController from "@/app/com/main/controller/PersonalController";
import PersonalBox from "@/app/com/main/box/PersonalBox";

@Component
export default class UpdatePassword extends Vue {
  private dialogVisible: boolean = false;
  private rePasswordForm: ChangePasswordData = new ChangePasswordData();
  private rePasswrodRules: object = {
    password: [{ required: true, message: "密码不能为空", target: "blur" }],
    newPassword: [{ required: true, message: "密码不能为空", target: "blur" }],
    rePassword: [{ validator: this.validRePassword, target: "blur" }]
  };

  private validRePassword(
    rule: any,
    value: string,
    callback: (data?: any) => any
  ) {
    const newPassword: string = this.rePasswordForm.newPassword;
    if (value !== newPassword) {
      callback(new Error("两次密码输入不一致"));
    } else {
      callback();
    }
  }

  public openDia(): void {
    this.dialogVisible = true;
  }

  private submit(): void {
    const rePasswordForm: any = this.$refs.rePasswordForm;
    const back = {
      back: (success: boolean) => {
        if (success) {
          Prompt.notice("修改成功", "成功", "success");
        } else {
          Prompt.notice("修改失败", "警告", "warn");
        }
      }
    };

    const pc: PersonalController = App.appContext.getMaterial(
      PersonalController
    );
    rePasswordForm.validate((valid: boolean) => {
      if (valid) {
        const pb: PersonalBox = App.appContext.getMaterial(PersonalBox);
        const user = pb.getUser();
        const id = user.id;
        if (id) {
          const password = this.rePasswordForm.password;
          const newPassword = this.rePasswordForm.newPassword;
          const params = {
            id: id,
            password: password,
            newPassword: newPassword
          };
          pc.loginChangePassword(params, back);
        }
      }
    });
  }

  private cancel(): void {
    const rePasswordForm: any = this.$refs.rePasswordForm;
    rePasswordForm.resetFields();
    this.dialogVisible = false;
  }
}
</script>

<style>
</style>
