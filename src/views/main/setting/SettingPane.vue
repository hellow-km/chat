<template>
  <div>
    <el-dialog
      title="设置"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <div>
        <el-row>
          <el-col :span="8">
            <div>
              <el-radio-group v-model="tab">
                <el-radio :label="1">好有添加验证</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <div v-show="tab==1">
                <ContactHarassSettingPane ref="settingPane"></ContactHarassSettingPane>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="cancel"
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="submit"
          size="small"
        >保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import ContactHarassSettingPane from "@/views/module/contact/ContactHarassSettingPane.vue";
import ContactSettingController from "@/app/com/main/controller/ContactSettingController";
import { Vue, Component } from "vue-property-decorator";
import App from "@/app/App";
import Prompt from "@/components/common/Prompt";
import ContactHarassSetting from "@/app/com/bean/ContactHarassSetting";
@Component({
  components: {
    ContactHarassSettingPane
  }
})
export default class SettingPane extends Vue {
  private dialogVisible: boolean = false;
  private tab: number = 1;

  public setShow(is: boolean) {
    this.dialogVisible = is;
  }

  private handleClose(done: Function) {
    done();
  }

  private submit() {
    const back = {
      back: (data: any) => {
        if (data && data.info) {
          Prompt.message(data.info, "", "");
          this.dialogVisible = false;
        }
      }
    };
    const settingPane: any = this.$refs.settingPane;
    const setting: ContactHarassSetting = settingPane.getSetting();
    const userId = this.$store.state.userId;
    setting.userId = userId;
    const sc: ContactSettingController = App.appContext.getMaterial(
      ContactSettingController
    );
    const valid = this.validate(setting);
    if (valid) {
      sc.updateSetting(setting, back);
    }
  }

  private cancel() {
    const settingPane: any = this.$refs.settingPane;
    const setting = settingPane.loadSetting();
    this.dialogVisible = false;
  }

  private validate(setting: ContactHarassSetting): boolean {
    switch (setting.verifyType) {
      case 3:
        if (setting.question.trim() == "" || setting.answer == "") {
          Prompt.notice("问题和答案必填");
          return false;
        } else {
          return true;
        }
      case 4:
        const onlyQuestions = setting.onlyQuestions;
        if (onlyQuestions.length == 0) {
          Prompt.notice("请添加问题");
          return false;
        } else {
          const hasNull = onlyQuestions.some(p => p.question.trim() == "");
          if (hasNull) {
            Prompt.notice("问题不能为空");
            return false;
          } else {
            return true;
          }
        }
      default:
        return true;
    }
  }
}
</script>

<style>
</style>
