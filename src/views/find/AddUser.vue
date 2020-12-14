<template>
  <div>
    <el-dialog
      title="添加联系人"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-card class="box-card">
        <div v-if="!isBlocked">
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
          <div v-if="verifyType==3">
            <el-row>
              <el-col :span="16">
                <div style="padding-left:5px;">
                  <label>问题：{{apply.question}}</label>
                </div>
                <div>
                  <el-input
                    placeholder="答案"
                    v-model="apply.answer"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
          <div v-if="verifyType==4">
            <el-row>
              <el-col :span="16">
                <div
                  v-for="item in answerList"
                  style="margin-bottom:5px"
                >
                  <div style="padding-left:5px;">
                    <label>问题：{{item.question}}</label>
                  </div>
                  <div>
                    <el-input
                      placeholder="答案"
                      v-model="item.answer"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-else>
          <p style="text-align:center;font-size:16px;">你被此用户屏蔽</p>
        </div>
      </el-card>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          v-if="!isBlocked"
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

import ContactVerifyAnswer from "@/app/com/data/ContactVerifyAnswer";
import ContactAddApplyData from "@/app/com/data/ContactAddApplyData";
import ContactCategory from "@/app/com/bean/ContactCategory";
import ContactListBox from "@/app/com/main/box/ContactListBox";
import DataBackAction from "@/app/base/net/DataBackAction";
import Prompt from "@/components/common/Prompt";
import ContactVerifyQuestion from "@/app/com/data/ContactVerifyQuestion";
import ContactAddVerifySetting from "@/app/com/data/ContactAddVerifySetting";
import ContactController from "@/app/com/main/controller/ContactController";
import SelectController from "@/app/com/main/controller/SelectController";
import SettingController from "@/app/com/main/controller/SettingController";
import NoticeController from "@/app/com/main/controller/NoticeController";
import App from "@/app/App";
import DataUtil from "@/app/lib/util/DataUtil";
import store from "@/store";
@Component
export default class Adduser extends Vue {
  private dialogVisible: boolean = false;
  private apply: ContactAddApplyData = new ContactAddApplyData();
  private categoryList: ContactCategory[] = [];
  private answerList: ContactVerifyAnswer[] = [];
  private verifyType: number = 0;
  private addUserId: string = "";
  private userId: string = store.state.userId;
  private isBlocked: boolean = false;

  public openDia(): void {
    this.dialogVisible = true;
  }

  public setUserId(addUserId: string) {
    this.addUserId = addUserId;
    this.getCategoryList();
    this.getAddUserSetting();
  }

  private getCategoryList() {
    const back: DataBackAction = {
      back: (data: any) => {
        if (DataUtil.isSuccess(data)) {
          this.categoryList = DataUtil.getBody(data);
        }
      }
    };
    const scl: SelectController = App.appContext.getMaterial(SelectController);
    scl.getUserCategory(this.userId, back);
  }

  private getAddUserSetting() {
    const back: DataBackAction = {
      back: (data: any) => {
        if (DataUtil.isSuccess(data)) {
          const body = DataUtil.getBody(data);
          this.verifyType = body.verifyType;
          this.answerList = body.onlyQuestions;
          this.apply.question = body.question;
        }
      }
    };
    const sc: SettingController = App.appContext.getMaterial(SettingController);
    sc.getSettingByUserId(this.addUserId, back);
  }

  private submit() {
    if (this.isBlocked) return (this.dialogVisible = false);
    if (this.apply.remark.trim() == "") return Prompt.notice("备注名不能为空");
    const back: DataBackAction = {
      back: (data: any) => {
        if (data && data.info) {
          const info = data.info;
          Prompt.message(info, "", "");
        }
      }
    };
    this.apply.verifyType = this.verifyType;
    this.apply.answerList = this.answerList;
    this.apply.sendUserId = this.userId;
    this.apply.targetUserId = this.addUserId;
    const ntl: NoticeController = App.appContext.getMaterial(NoticeController);
    ntl.addUserNotice(this.apply, back);
  }
}
</script>

<style>
</style>
