<template>
  <div>
    <el-dialog
      title="新建群"
      :visible.sync="dialogVisible"
      width="50%"
      :show-close="false"
    >
      <el-card>
        <el-form
          :model="group"
          label-width="50px"
          ref="groupForm"
        >
          <el-form-item
            label="名称"
            prop="name"
            :rules="{required:true,message:'名称不能为空',target:'blur'}"
          >
            <el-input
              v-model="group.name"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="介绍"
            prop="introduce"
          >
            <el-input
              style="resize:none"
              type="textarea"
              v-model="group.introduce"
              resize="none"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入..."
            ></el-input>
          </el-form-item>
        </el-form>
      </el-card>
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
import Group from "@/app/com/bean/Group";
import { Component, Vue, Emit } from "vue-property-decorator";
import App from "@/app/App";
import GroupInfoController from "@/app/com/main/controller/GroupInfoController";
import DataBackAction from "@/app/base/net/DataBackAction";
import Prompt from "@/components/common/Prompt";
@Component
export default class AddGroup extends Vue {
  private group: Group = new Group();
  private dialogVisible: boolean = false;

  public openDia(): void {
    this.dialogVisible = true;
  }

  private cancel(): void {
    this.dialogVisible = false;
    const groupForm: any = this.$refs.groupForm;
    groupForm.resetFields();
  }

  private submit(): void {
    const back: DataBackAction = {
      back: (data: any) => {
        if (data && data.info) {
          const info = data.info;
          Prompt.message(info, "添加成功", "");
        }
      }
    };
    const groupForm: any = this.$refs.groupForm;
    const ag: GroupInfoController = App.appContext.getMaterial(
      GroupInfoController
    );
    groupForm.validate((valid: boolean) => {
      if (valid) {
        ag.addGroup(this.group, back);
      }
    });
  }
}
</script>

<style>
</style>
