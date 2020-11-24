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
            label-width="100px"
            class="question-form"
          >
            <div v-for="(item,index) in questionData.questions">
              <el-form-item :label="'问题'+(index+1)">
                <el-input
                  type="text"
                  v-model="item.question"
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="'答案'+(index+1)"
                :rules="{ required: true, message: '答案不能为空',trigger:'blur'},"
              >
                <el-input
                  type="text"
                  v-model="item.answer"
                ></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button
                type="primary"
                @click="toStepThree"
                size="small"
              >下一步</el-button>
              <el-button
                type="primary"
                @click="active--"
                size="small"
              >上一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div
          class="step-three"
          v-else
        >
          <el-button
            type="primary"
            @click="active--"
            size="small"
          >上一步</el-button>
          <el-button
            type="primary"
            @click=""
            size="small"
          >确认修改</el-button>
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
          qc.submitAnswer(account,questions, back);
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
