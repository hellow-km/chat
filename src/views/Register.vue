<template>
  <div class="register">
    <el-page-header
      @back="back"
      content="注册"
    >
    </el-page-header>
    <div class="register-form">
      <el-form
        :model="registerForm"
        ref="registerForm"
        :rules="registerRules"
      >
        <el-form-item
          prop="nickName"
          label="昵称"
          label-width="100px"
        >
          <el-input
            type="text"
            v-model="registerForm.nickName"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="account"
          label="账号"
          label-width="100px"
        >
          <el-input
            type="text"
            v-model="registerForm.account"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          label-width="100px"
        >
          <el-input
            type="password"
            v-model="registerForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="rePassword"
          label="确认密码"
          label-width="100px"
          :rules="[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator:this.isPasswordSame, message: '两次密码不一致', trigger: 'blur' }
          ]"
        >
          <el-input
            type="password"
            v-model="registerForm.rePassword"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="mobile"
          label="手机"
          label-width="100px"
        >
          <el-input
            type="text"
            v-model="registerForm.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
          label-width="100px"
        >
          <el-input
            type="text"
            v-model="registerForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          label="昵称"
          label-width="100px"
        >
          <el-input
            type="text"
            v-model="registerForm.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          label-width="100px"
        >
          <el-radio-group v-model="registerForm.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
            <el-radio label="3">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="介绍"
          label-width="100px"
        >
          <el-input
            class="reg-introduce"
            placeholder="请输入介绍"
            type="textarea"
            autosize
            v-model="registerForm.introduce"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :model="questionData"
        ref="questionForm"
        label-width="100px"
      >
        <el-row
          :gutter="20"
          v-for="(item,index) in questionData.questions"
        >
          <el-col :span="20">
            <el-form-item
              :label="'问题'+(index+1)"
              :rules="[{ required: true, message: '请输入问题', trigger: 'blur' }]"
            >
              <el-input
                type="text"
                v-model="item.qustion"
                placeholder="请输入问题"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="'答案'+(index+1)"
              :rules="[{ required: true, message: '请输入答案', trigger: 'blur' }]"
            >
              <el-input
                type="text"
                v-model="item.answer"
                placeholder="请输入答案"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              size="mini"
              @click="removeQuestion(index)"
            >删除</el-button>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button
            plain
            @click="addQuestion"
          >添加密保问题+</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
          >注册</el-button>
          <el-button
            size="mini"
            @click="reset"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import "../styles/register.css";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import app from "@/app/App";
import RegisterRules from "@/app/com/bean/RegisterRules";
import QuestionData from "@/app/com/data/QuestionData";
import SecurityQuestion from "@/app/com/bean/SecurityQuestion";
import RegisterData from "@/app/com/bean/RegisterData";

@Component
export default class Register extends Vue {
  private registerForm: RegisterData = new RegisterData();
  private registerRules: RegisterRules = new RegisterRules();
  private questionData: QuestionData = new QuestionData();
  private register() {}

  private back(): void {
    this.toLogin();
  }

  private toLogin(): void {
    this.$router.push({
      path: "/login"
    });
  }

  private addQuestion(): void {
    const length = this.questionData.questions.length;
    if (length >= 3) return;
    this.questionData.questions.push(new SecurityQuestion());
  }

  private removeQuestion(index: number): void {
    this.questionData.questions.splice(index, 1);
  }

  private reset(): void {
    const registerForm: any = this.$refs.registerForm;
    registerForm.resetFields();
    this.questionData.questions = [];
  }

  private isPasswordSame(
    rule: any,
    value: string,
    callback: (data?: any) => any
  ): void {
    if (this.registerForm.password !== this.registerForm.rePassword) {
      callback(new Error("两次密码不一致"));
    } else {
      callback();
    }
  }
}
</script>

<style>
</style>
