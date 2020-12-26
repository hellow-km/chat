<template>
  <div>
    <el-dialog
      title="添加到联系人"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="apply">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item>
              <el-input
                type="text"
                v-model="apply.acceptRemark"
                placeholder="备注名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-select
                v-model="apply.acceptKey"
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
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import ContactCategory from "@/app/com/bean/ContactCategory";
import DataBackAction from "@/app/base/net/DataBackAction";
import DataUtil from "@/app/lib/util/DataUtil";
import SelectController from "@/app/com/main/controller/SelectController";
import App from "@/app/App";
import store from "@/store";
import AcceptAddUser from "@/app/com/data/AcceptAddUser";
import NoticeController from "@/app/com/main/controller/NoticeController";
import Prompt from "@/components/common/Prompt";
import InitializeData from "@/impl/initialize/InitializeData";
import ContactAddApply from "@/app/com/bean/ContactAddApply";
@Component
export default class AcceptUserAdd extends Vue {
  private dialogVisible: boolean = false;
  private categoryList: ContactCategory[] = [];
  private acceptUserId: string = store.state.userId;
  private apply: AcceptAddUser = new AcceptAddUser();

  public openDia() {
    this.dialogVisible = true;
    this.getCategoryList();
  }

  public setSend(apply: ContactAddApply) {
    this.apply.sendUserId = apply.sendUserId;
    this.apply.sendRemark = apply.remark;
    this.apply.sendKey = apply.categoryId;
    this.apply.noticeId = apply.id;
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
    scl.getUserCategory(this.acceptUserId, back);
  }

  private submit() {
    const back: DataBackAction = {
      back: (data: any) => {
        data.info && Prompt.message(data.info, "", "");
        this.handleUpdate();
        this.dialogVisible = false;
      }
    };
    this.apply.acceptUserId = this.acceptUserId;
    const ncl: NoticeController = App.appContext.getMaterial(NoticeController);
    ncl.acceptUser(this.apply, back);
  }

  @Emit("handleUpdate")
  private handleUpdate() {}
}
</script>

<style>
</style>
