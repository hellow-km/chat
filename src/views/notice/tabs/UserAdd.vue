<template>
  <div>
    <div>
      <el-card class="notice-user">
        <div class="notice-user-head">
          <span><i class="el-icon-s-order"></i>请求列表</span>
          <el-button
            size="mini"
            style="float:right"
            @click="refresh"
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
        :current-page="page.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="page.pageSize"
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
import Page from "@/app/com/data/Page";
import store from "@/store";
import NoticeController from "@/app/com/main/controller/NoticeController";
import App from "@/app/App";
import DataBackAction from "@/app/base/net/DataBackAction";
import DataUtil from "@/app/lib/util/DataUtil";

@Component
export default class UserAdd extends Vue {
  private list: ContactAddApplyDetail[] = [];
  private page: Page = new Page();
  private userId: string = store.state.userId;

  private mounted() {
    this.getList();
  }

  private handleSizeChange(val: string) {
    this.page.pageSize = Number(val);
    this.getList();
  }
  private handleCurrentChange(val: string) {
    this.page.page = Number(val);
    this.getList();
  }

  private refresh() {
    this.getList();
  }

  private getList() {
    const back: DataBackAction = {
      back: (data: any) => {
        if (DataUtil.isSuccess(data)) {
          const body = DataUtil.getBody(data);
          this.list = body.list;
        }
      }
    };
    const ncl: NoticeController = App.appContext.getMaterial(NoticeController);
    const params = {
      userId: this.userId,
      page: this.page
    };
    ncl.getAddUserNotice(params, back);
  }
}
</script>

<style>
</style>
