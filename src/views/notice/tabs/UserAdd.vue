<template>
  <div>
    <div>
      <el-card class="notice-user">
        <div class="notice-user-head">
          <span><i class="el-icon-s-order"></i>请求列表</span>
          <el-button
            size="mini"
            style="float:right"
          >
            刷新
          </el-button>
        </div>
        <div class="notice-user-page">
          <div
            v-for="item in list"
            class="notice-user-add"
          >
            <div>
              <el-row>
                <el-col :span="4">
                  <div class="user-avatar">
                    <div>
                      <el-avatar
                        :size="50"
                        :src="item.user.avatar"
                      ></el-avatar>
                    </div>
                    <div>
                      <span>{{item.user.nickName}}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="user-question">
                    <div v-if="item.apply.verifyType==3">
                      <div>
                        <span>问题：{{item.apply.question}}</span>
                      </div>
                      <div>
                        <span>答案：{{item.apply.answer}}</span>
                      </div>
                    </div>
                    <div v-if="item.apply.verifyType==3">
                      <div v-for="item1 in item.answerList">
                        <div>
                          <span>问题：{{item1.question}}</span>
                        </div>
                        <div>
                          <span>答案：{{item1.answer}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="opt">
                    <div v-if="item.apply.handleType=='1'">
                      <el-button size="mini">
                        同意
                      </el-button>
                      <el-button size="mini">
                        拒绝
                      </el-button>
                    </div>
                    <div v-else-if="item.apply.handleType=='2'">
                      <div>已同意</div>
                    </div>
                    <div v-else-if="item.apply.handleType=='3'">
                      <div>已拒绝</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-card>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ContactAddApplyDetail from "@/app/com/data/ContactAddApplyDetail";

@Component
export default class UserAdd extends Vue {
  private list: ContactAddApplyDetail[] = [
    {
      apply: {
        remark: "123",
        question: "123",
        answer: 555,
        verifyType: 4,
        handleType: "1"
      },
      user: {
        nickName: "aaa"
      },
      answerList: [
        {
          question: "333",
          answer: "444"
        },
        {
          question: "333",
          answer: "444"
        },
        {
          question: "333",
          answer: "444"
        }
      ]
    },
    {
      apply: {
        remark: "123",
        question: "123",
        answer: 555,
        verifyType: 4,
        handleType: "2"
      },
      user: {
        nickName: "aaa"
      },
      answerList: [
        {
          question: "333",
          answer: "444"
        },
        {
          question: "333",
          answer: "444"
        },
        {
          question: "333",
          answer: "444"
        }
      ]
    },
    {
      apply: {
        remark: "123",
        question: "123",
        answer: 555,
        verifyType: 4,
        handleType: "3"
      },
      user: {
        nickName: "aaa"
      },
      answerList: [
        {
          question: "333",
          answer: "444"
        },
        {
          question: "333",
          answer: "444"
        },
        {
          question: "333",
          answer: "444"
        }
      ]
    }
  ] as any;

  private handleSizeChange(val: string) {
    console.log(`每页 ${val} 条`);
  }
  private handleCurrentChange(val: string) {
    console.log(`当前页: ${val}`);
  }
}
</script>

<style>
</style>
