<template>
  <div>
    <el-radio-group v-model="mode">
      <div>
        <el-radio :label="1">允许任何人添加</el-radio>
      </div>
      <div>
        <el-radio :label="2">需要验证</el-radio>
      </div>
      <div>
        <div>
          <el-radio :label="3">需要回答正确的问题</el-radio>
        </div>
        <div v-show="mode==3">
          <div class="setting-ipt">
            <el-input
              placeholder="问题"
              v-model="questionObj.question"
              size="mini"
            ></el-input>
          </div>
          <div class="setting-ipt">
            <el-input
              placeholder="答案"
              size="mini"
              v-model="questionObj.answer"
            ></el-input>
          </div>
        </div>
      </div>
      <div>
        <div>
          <el-radio :label="4">需要回答问题并由我确认</el-radio>
        </div>
        <div v-show="mode==4">
          <div v-for="(item,index) in questionList">
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

import ContactVerifyQuestion from "@/app/com/data/ContactVerifyQuestion";
import ContactOnlyQuestion from "@/app/com/data/ContactOnlyQuestion";

@Component
export default class ContactHarassSettingPane extends Vue {
  private mode: number = 1;
  private questionObj: ContactVerifyQuestion = new ContactVerifyQuestion();
  private questionList: ContactOnlyQuestion[] = new Array<
    ContactOnlyQuestion
  >();

  private addQuestion(): void {
    const id = this.questionList.length;
    if (id < 3) {
      let question = new ContactOnlyQuestion();
      question.id = id.toString();
      this.questionList.push(question);
    }
  }

  private remove(index: number) {
    this.questionList.splice(index, 1);
  }
}
</script>

<style>
</style>
