<template>
  <div>
    <el-dialog
      title="添加联系人"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-card class="box-card">
        <el-form :model="apply">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item>
                <el-input
                  type="text"
                  v-model="apply.remark"
                  placeholder="备注名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-select
                  v-model="apply.categoryId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submit"
          size="small"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import app from "@/app/App";
import ContactVerifyAnswer from "@/app/com/data/ContactVerifyAnswer";
import ContactAddApplyData from "@/app/com/data/ContactAddApplyData";
import ContactCategory from "@/app/com/bean/ContactCategory";
import ContactListBox from "@/app/com/main/box/ContactListBox";
import DataBackAction from "@/app/base/net/DataBackAction";
import Prompt from "@/components/common/Prompt";
import ContactVerifyQuestion from "@/app/com/data/ContactVerifyQuestion";
import ContactAddVerifySetting from "@/app/com/data/ContactAddVerifySetting";
import ContactController from "@/app/com/main/controller/ContactController";

@Component
export default class Adduser extends Vue {
  private dialogVisible: boolean = false;
  private apply: ContactAddApplyData = new ContactAddApplyData();
  private categoryList: ContactCategory[] = [];
  private answerList: ContactVerifyAnswer[] = [];
  private verifyType: string = "0";
  private userId: string = "";
  private isBlocked: boolean = false;

  public openDia(): void {
    this.dialogVisible = true;
  }

  public setUserId(userId: string) {
    this.userId = userId;
  }
}
</script>

<style>
</style>
