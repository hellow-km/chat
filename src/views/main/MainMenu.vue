<template>
  <div>
    <el-dropdown
      placement="bottom-start"
      trigger="click"
    >
      <a
        class="opt"
        href="javascript:;"
      ><i class="el-icon-s-unfold"></i></a>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in menu"
          @click.native="item.click"
          :key="item.text"
        >{{item.text}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <OneItemForm
      ref="contactCategory"
      title="新建联系人分组"
      @on-submit="addContactCategory"
    ></OneItemForm>

    <OneItemForm
      ref="groupCategory"
      title="新建群分组"
      @on-submit="addGroupCategory"
    ></OneItemForm>
    <AddGroup ref="addGroup"></AddGroup>
    <UpdateUser ref="updateUser"></UpdateUser>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DataBackAction from "@/app/base/net/DataBackAction";
import Prompt from "@/components/common/Prompt";
import App from "@/app/App";
import ContactCategoryController from "@/app/com/main/controller/ContactCategoryController";
import Group from "@/app/com/bean/Group";

import OneItemForm from "@/views/common/form/OneItemForm.vue";
import AddGroup from "@/views/module/AddGroup.vue";
import UpdateUser from "@/views/main/personal/UpdateUser.vue";

@Component({
  components: {
    OneItemForm,
    AddGroup,
    UpdateUser
  }
})
export default class MainMenu extends Vue {
  private menu: Array<any> = [
    {
      text: "新建联系人分组",
      click: () => {
        const contactCategory: any = this.$refs.contactCategory;
        contactCategory.openDia();
      }
    },
    {
      text: "新建群分组",
      click: () => {
        const groupCategory: any = this.$refs.groupCategory;
        groupCategory.openDia();
      }
    },
    {
      text: "新建群",
      click: () => {
        const addGroup: any = this.$refs.addGroup;
        addGroup.openDia();
      }
    },
    {
      text: "修改资料",
      click: () => {
        const updateUser: any = this.$refs.updateUser;
        updateUser.openDia();
      }
    },
    {
      text: "修改密码",
      click: () => {}
    },
    {
      text: "退出",
      click: () => {}
    }
  ];

  private addContactCategory(value: string): void {
    const back: DataBackAction = {
      back: (data: any) => {
        if (data && data.info) {
          const info = data.info;
          if (info && info.success) {
            Prompt.notice("创建成功", "成功", "success");
          }
        }
      }
    };
    const ac: ContactCategoryController = App.appContext.getMaterial(
      ContactCategoryController
    );
    if (value) {
      ac.addContactCategory(value, back);
    }
  }

  private addGroupCategory(value: string): void {
    const back: DataBackAction = {
      back: (data: any) => {
        if (data && data.info) {
          const info = data.info;
          if (info && info.success) {
            Prompt.notice("创建成功", "成功", "success");
          }
        }
      }
    };
    const ac: ContactCategoryController = App.appContext.getMaterial(
      ContactCategoryController
    );
    if (value) {
      ac.addGroupCategory(value, back);
    }
  }
}
</script>

<style>
</style>
