<template>
  <div>
    <el-dialog
      title="修改信息"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-form
        :model="user"
        :rules="userRules"
        label-width="100px"
        ref="userForm"
      >
        <el-form-item prop="avatar">
          <div>
            <div
              @click="openChangeHead"
              style="cursor:pointer"
            >
              <el-avatar
                :src="user.avatar"
                style="vertical-align: middle;margin-right:5px;"
              ></el-avatar>
              <a href="javascript:;">修改头像</a>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          prop="nickName"
          label="昵称"
        >
          <el-input
            @input="i"
            v-model="user.nickName"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="account"
          label="账号"
        >
          <span>{{user.account}}</span>
        </el-form-item>
        <el-form-item
          prop="signature"
          label="签名"
        >
          <el-input v-model="user.signature"></el-input>
        </el-form-item>
        <el-form-item
          prop="mobile"
          label="手机"
        >
          <el-input v-model="user.mobile"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
        >
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          label="姓名"
        >
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item
          prop="gender"
          label="性别"
        >
          <el-radio-group v-model="user.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
            <el-radio label="3">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="birthDate"
          label="出生日期"
        >
          <el-date-picker
            v-model="user.birthDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          prop="homeAddress"
          label="家庭地址"
        >
          <el-input v-model="user.homeAddress"></el-input>
        </el-form-item>
        <el-form-item
          prop="locationAddress"
          label="所在地址"
        >
          <el-input v-model="user.locationAddress"></el-input>
        </el-form-item>
        <el-form-item
          prop="introduce"
          label="介绍"
        >
          <el-input
            type="textarea"
            :autosize="{minRows:2,maxRows:4}"
            resize="none"
            v-model="user.introduce"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
      </span>
    </el-dialog>
    <UpdateHead
      @get-url="getUrl"
      ref="updateHead"
    ></UpdateHead>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UpdateHead from "./UpdateHead.vue";

import User from "@/app/com/bean/User";
import RegisterRules from "@/app/com/bean/RegisterRules";
import PersonalBox from "@/app/com/main/box/PersonalBox";
import App from "@/app/App";
import PersonalController from "@/app/com/main/controller/PersonalController";
import Prompt from "@/components/common/Prompt";
import PersonalViewImpl from "@/impl/view/PersonalViewImpl";
import DataUtil from "@/app/lib/util/DataUtil";
@Component({
  components: {
    UpdateHead
  }
})
export default class UpdateUser extends Vue {
  private user: User = new User();
  private rules: RegisterRules = new RegisterRules();
  private userRules: object = {};
  private dialogVisible: boolean = false;

  public openDia(): void {
    this.dialogVisible = true;
    this.loadUser();
  }

  public created(): void {
    const rules = this.rules;
    this.userRules = {
      nickName: rules.nickName,
      mobile: rules.mobile,
      email: rules.email
    };
  }

  private i() {}

  private loadUser(): void {
    const ub: PersonalBox = App.appContext.getMaterial(PersonalBox);
    const user: User = ub.getUser();
    this.user = user;
  }

  private submit(): void {
    const userForm: any = this.$refs.userForm;
    const pc: PersonalController = App.appContext.getMaterial(
      PersonalController
    );
    const back = {
      back: (data: any) => {
        if (data && data.info) {
          const info = data.info;
          Prompt.message(info, "修改成功", "");
          this.setData();
          //userForm.resetFields();
          this.dialogVisible = false;
        }
      }
    };
    userForm.validate((valid: boolean) => {
      if (valid) {
        pc.updateUser(this.user, back);
      }
    });
  }

  private setData() {
    PersonalViewImpl.setUser(this.user);
    const ub: PersonalBox = App.appContext.getMaterial(PersonalBox);
    ub.setUser(this.user);
  }

  private openChangeHead(): void {
    const updateHead: any = this.$refs.updateHead;
    updateHead.openDia();
  }

  private getUrl(url: string) {
    this.user.avatar = url;
  }
}
</script>

<style>
</style>
