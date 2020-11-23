<template>
  <div class="resetPassword">
    <div class="reset-head">
      <el-page-header
        @back="back"
        content="重置密码"
      >
      </el-page-header>
    </div>
    <div class="reset-body">
      <div class="reset-step">
        <el-steps
          :active="active"
          finish-status="success"
        >
          <el-step
            title="步骤 1"
            description="登录账号"
          ></el-step>
          <el-step
            title="步骤 2"
            description="回答密保问题改密"
          ></el-step>
        </el-steps>
      </div>
      <div class="reset-form">
        <div
          class="step-one"
          v-if="active==0"
        >
          <el-form
            :model="accountForm"
            ref="accountForm"
            label-width="100px"
            class="account-form"
          >
            <el-form-item
              label="账号"
              prop="account"
              :rules="[
                { required: true, message: '账号不能为空',trigger:'blur'},
              ]"
            >
              <el-input
                type="text"
                v-model="accountForm.account"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
              :rules="[
                { required: true, message: '密码不能为空',trigger:'blur'},
              ]"
            >
              <el-input
                type="password"
                v-model="accountForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="nextStep"
                size="small"
              >下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div
          class="step-two"
          v-if="active==1"
        >
          2
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "../styles/resetPassword.css";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import RegisterData from "@/app/com/bean/RegisterData";
import app from "@/app/App";
import BaseUtil from "@/app/lib/util/BaseUtil";
import QuestionData from "@/app/com/data/QuestionData";
import SecurityQuestion from "@/app/com/bean/SecurityQuestion";
import AccountController from "@/app/com/main/controller/AccountController";

@Component
export default class ResetPassword extends Vue {
  private accountForm: RegisterData = new RegisterData();
  private active: number = 0;
  private questionData: QuestionData = new QuestionData();

  private validatePassword = (
    rule: any,
    value: string,
    callback: (data?: any) => any
  ): void => {
    if (BaseUtil.isEmpty(value)) {
      return callback(new Error("密码不能为空"));
    } else {
      callback();
    }
  };
  private validateRePassword = (
    rule: any,
    value: string,
    callback: (data?: any) => any
  ): void => {
    const password = this.accountForm.password;
    if (value !== password) {
      return callback(new Error("两次密码输入不一致"));
    } else {
      callback();
    }
  };
  private nextStep(): void {
    const accountForm: any = this.$refs.accountForm;
    const { account, password } = this.accountForm;
    const lg: AccountController = app.appContext.getMaterial(AccountController);
    const back = (success: boolean, message?: string | undefined): void => {
      if (success) {
        this.active = 1;
      }
    };
    lg.get(account, password, back);
    accountForm.validate((valid: boolean) => {
      if (valid) {
      }
    });
  }
}
</script>

<style>
</style>
