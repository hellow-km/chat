<template>
  <div>
    <el-radio-group v-model="setting.verifyType">
      <div>
        <el-radio :label="setting.VERIFY_TYPE_ANY">允许任何人添加</el-radio>
      </div>
      <div>
        <el-radio :label="setting.VERIFY_TYPE_AUTH">需要验证</el-radio>
      </div>
      <div>
        <div>
          <el-radio :label="setting.VERIFY_TYPE_ANSWER">需要回答正确的问题</el-radio>
        </div>
        <div v-show="setting.verifyType==setting.VERIFY_TYPE_ANSWER">
          <div class="setting-ipt">
            <el-input
              placeholder="问题"
              v-model="setting.question"
              size="mini"
            ></el-input>
          </div>
          <div class="setting-ipt">
            <el-input
              placeholder="答案"
              size="mini"
              v-model="setting.answer"
            ></el-input>
          </div>
        </div>
      </div>
      <div>
        <div>
          <el-radio :label="setting.VERIFY_TYPE_CONFIRM">需要回答问题并由我确认</el-radio>
        </div>
        <div v-show="setting.verifyType==setting.VERIFY_TYPE_CONFIRM">
          <div v-for="(item,index) in setting.onlyQuestions">
            <div style="margin-top:5px">
              <el-input
                style="width:70%;margin-right:5px;"
                v-model="item.question"
                size="mini"
                placeholder="问题"
              ></el-input>
              <el-button
                @click="remove(index)"
                size="mini"
              >删除</el-button>
            </div>
          </div>
          <el-button
            style="margin-top:5px;border:1px dashed #DCDFE6"
            @click="addQuestion"
          >+ 新建问题</el-button>
        </div>
      </div>
    </el-radio-group>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ContactHarassSetting from "@/app/com/bean/ContactHarassSetting";
import ContactOnlyQuestion from "@/app/com/data/ContactOnlyQuestion";
import ContactSettingController from "@/app/com/main/controller/ContactSettingController";
import App from "@/app/App";
import Prompt from "@/components/common/Prompt";
import DataUtil from "@/app/lib/util/DataUtil";

@Component
export default class ContactHarassSettingPane extends Vue {
  private setting: ContactHarassSetting = new ContactHarassSetting();

  private mounted() {
    this.loadSetting();
  }

  private addQuestion(): void {
    const id = this.setting.onlyQuestions.length;
    if (id < 3) {
      let question = new ContactOnlyQuestion();
      question.id = id.toString();
      this.setting.onlyQuestions.push(question);
    }
  }

  private remove(index: number) {
    this.setting.onlyQuestions.splice(index, 1);
  }

  public getSetting(): ContactHarassSetting {
    return this.setting;
  }

  public loadSetting() {
    const back = {
      back: (data: any) => {
        if (DataUtil.isSuccess(data)) {
          const body = data.body;
          if (body && body.setting) {
            this.setting = body.setting;
          }
        }
      }
    };
    const sc: ContactSettingController = App.appContext.getMaterial(
      ContactSettingController
    );
    const userId = this.$store.state.userId;
    sc.getSetting(userId, back);
  }
}
</script>

<style>
</style>
