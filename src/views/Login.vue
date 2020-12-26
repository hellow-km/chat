<template>
  <div class="Login">
    <div class="login-body">
      <div>
        <h2 class="login-title">用户登录</h2>
      </div>
      <div class="login-from">
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
        >
          <el-form-item prop="account">
            <el-input
              prefix-icon="el-icon-user"
              type="text"
              v-model="loginForm.account"
              autocomplete="off"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
              autocomplete="off"
              @keyup.native.enter="login"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="login()"
              class="login-submit-button"
              :loading="submitLoading"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-control">
        <span
          class="control-register"
          @click="register"
        >立即注册</span>
        <span
          class="control-repassword"
          @click="toResetPassword"
        >忘记密码</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "../styles/login.css";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import BaseUtil from "@/app/lib/util/BaseUtil";
import app from "@/app/App";
import LoginController from "@/app/com/main/controller/LoginController";

@Component({})
export default class Login extends Vue {
  private loginForm = {
    account: "admin",
    password: "123456"
  };
  private loginRules = {
    account: [
      {
        required: true,
        message: "请输入用户名、手机、邮箱",
        trigger: ["blur", "change"]
      }
    ],
    password: [
      {
        message: "请输入密码",
        trigger: ["blur", "change"],
        required: true
      }
    ]
  };
  private submitLoading: Boolean = false;

  private login(): void {
    const loginForm: any = this.$refs.loginForm;
    let canPass = true;
    loginForm.validate((valid: Boolean) => {
      if (!valid) {
        canPass = false;
      }
    });
    if (!canPass) {
      return;
    }
    const account: string = this.loginForm.account;
    const password: string = this.loginForm.password;
    const back = (success: Boolean, message?: string): void => {
      if (message) {
        this.$notify({
          title: "警告",
          type: "warning",
          message: message,
          duration: 3000
        });
      }
      if (success) {
        this.toMain();
      }
    };
    const lc: LoginController = app.appContext.getMaterial(LoginController);
    lc.login(account, password, back);
  }

  private toMain() {
    this.$router.push({ path: "/main" });
  }
  private register() {
    this.$router.push({ path: "/register" });
  }
  private toResetPassword() {
    this.$router.push({
      path: "/resetPassword"
    });
  }
}
</script>

<style>
</style>
