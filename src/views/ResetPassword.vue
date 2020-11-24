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
            description="输入账号"
          ></el-step>
          <el-step
            title="步骤 2"
            description="回答密保问题"
          ></el-step>
          <el-step
            title="步骤 3"
            description="修改密码"
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
                @keyup.native.enter="nextStep"
              ></el-input>
            </el-form-item>
            <!-- 加个input防止enter刷新网页 -->
            <el-input style="display:none"></el-input>
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
          v-else-if="active==1"
        >
          <el-form
            :model="questionData"
            ref="questionForm"
            class="question-form"
          >
            <div v-for="(item,index) in questionData.questions">
              <el-form-item :label="'问题'+(index+1)+'：'">
                <label style="color: #606266;">{{item.question}}</label>
              </el-form-item>
              <el-form-item
                :prop="'questions.'+index+'.answer'"
                :rules="{ required: true, message: '答案不能为空',trigger:'blur'},"
              >
                <el-input
                  type="text"
                  v-model="item.answer"
                ></el-input>
              </el-form-item>
            </div>
            <div
              v-if="questionData.questions.length==0"
              class="step-nodata"
            >
              <p style="color:#909399">无密保问题</p>
            </div>
            <el-form-item class="step2-menu">
              <el-button
                type="primary"
                @click="active--"
                size="small"
              >上一步</el-button>
              <el-button
                type="primary"
                @click="toStepThree"
                size="small"
              >下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div
          class="step-three"
          v-else
        >
          <el-form
            :model="passwordForm"
            ref="passwordForm"
            class="password-form"
            label-width="100px"
          >
            <el-form-item
              label="密码"
              prop="password"
              :rules="{ required: true, validator:validatePassword,trigger:'blur'},"
            >
              <el-input
                type="password"
                v-model="passwordForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="rePassword"
              :rules="{ required: true, validator:validateRePassword,trigger:'blur'},"
            >
              <el-input
                type="password"
                v-model="passwordForm.rePassword"
              ></el-input>
            </el-form-item>
            <el-form-item class="step3-menu">
              <el-button
                type="primary"
                @click="active--"
                size="small"
              >上一步</el-button>
              <el-button
                type="primary"
                @click="changePassword"
                size="small"
              >确认修改</el-button>
            </el-form-item>
          </el-form>

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
import PersonalController from "@/app/com/main/controller/PersonalController";

@Component
export default class ResetPassword extends Vue {
  private accountForm: RegisterData = new RegisterData();
  private active: number = 0;
  private questionData: QuestionData = new QuestionData();
  private passwordForm: RegisterData = new RegisterData();

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
    const password = this.passwordForm.password;
    if (value !== password) {
      return callback(new Error("两次密码输入不一致"));
    } else {
      callback();
    }
  };

  private nextStep(): void {
    const accountForm: any = this.$refs.accountForm;
    const account = this.accountForm.account;
    const back = (data: any): void => {
      if (!BaseUtil.isEmpty(data)) {
        const info = data.info;
        const success = info.success;
        const body = data.body;
        if (success) {
          const questions = body.userQuestions;
          this.questionData.questions = questions;
          this.active = 1;
        }
      }
    };
    const lg: AccountController = app.appContext.getMaterial(AccountController);
    accountForm.validate((valid: boolean) => {
      if (valid) {
        lg.getQuestionList(account, back);
      }
    });
  }

  private toStepThree() {
    const questions = this.questionData.questions;
    const account = this.accountForm.account;
    if (BaseUtil.isEmpty(questions)) {
      return (this.active = 2);
    }
    const questionForm: any = this.$refs.questionForm;
    const qc: AccountController = app.appContext.getMaterial(AccountController);
    const back = (success: boolean): void => {
      if (success) {
        this.active = 2;
      }
    };
    questionForm.validate(
      (valid: boolean): void => {
        if (valid) {
          qc.submitAnswer(account, questions, back);
        }
      }
    );
  }

  private changePassword(): void {
    const passwordForm: any = this.$refs.passwordForm;
    const newPassword = this.passwordForm.password;
    const account = this.accountForm.account;
    const cp: PersonalController = app.appContext.getMaterial(
      PersonalController
    );
    const back = (success: boolean): void => {
      if (success) {
        this.$notify({
          title: "成功",
          type: "success",
          message: "修改成功"
        });
        this.back();
      }
    };
    passwordForm.validate(
      (valid: boolean): void => {
        if (valid) {
          cp.changePassword(account, newPassword, back);
        }
      }
    );
  }

  private back(): void {
    this.$router.push({
      path: "/login"
    });
  }
}
</script>

<style>
</style>
