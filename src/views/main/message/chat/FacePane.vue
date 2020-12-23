<template>
  <div
    class="face-pane"
    v-show="showPane"
    onmousedown="return false;"
    unselectable="on"
  >
    <div class="face-tab">
      <div class="bar">
        <div
          class="left tab-item"
          :class="{'active':currentTab=='face'}"
          @click="setTabShow('face')"
          name="face-tab"
        >表情</div>
        <div
          class="left tab-item"
          :class="{'active':currentTab=='strFace'}"
          @click="setTabShow('strFace')"
          name="face-tab"
        >字符表情</div>
      </div>
    </div>
    <div>
      <div
        class="face-page"
        v-show="currentTab=='face'"
      >
        <div>
          <a
            v-for="item of faceList"
            :title="item.text"
            @click="onFace(item)"
          >
            <img
              :src="'/assets/images/common/face/classical/png/'+item.key+'.png'"
              name="face-item"
            />
          </a>
        </div>
      </div>
      <div
        class="face-page"
        v-show="currentTab=='strFace'"
      >
        <a
          v-for="item of list"
          :title="item.key"
          @click="onClick(item)"
        >
          <img
            :src="'assets/images/common/face/emoji/'+item.picture"
            name="face-item"
          />
        </a>
      </div>
      <div class="face-arrow"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import FaceValue from "@/app/com/data/chat/content/item/FaceValue";
import FaceBox from "./FaceBox";
import EmojiImageBox from "./EmojiImageBox";
import App from "@/app/App";
@Component
export default class FacePane extends Vue {
  private showPane: boolean = false;
  private currentTab: string = "face";
  private faceList: FaceValue[] = [];
  private list: Array<{ code: string; key: string; picture: string }> = [];

  private mounted() {
    this.init();
  }

  private init() {
    const faceBox: FaceBox = App.appContext.getMaterial(FaceBox);
    this.faceList = faceBox.getList("classical");
    this.list = EmojiImageBox.getList();
  }

  private setTabShow(tab: string) {
    this.currentTab = tab;
  }

  private setPaneShow(is: boolean) {
    this.showPane = is;
  }

  private onClick(value: { code: string; key: string; picture: string }) {
    this.selected("emoji", value.key);
  }

  private onFace(value: FaceValue) {
    this.selected(value.categoryId, value.key);
  }

  private onPaneBlur() {
    this.setPaneShow(false);
  }

  @Emit("on-selected")
  private selected(categoryId: string, value: string) {
    // 选中
  }
}
</script>

<style>
</style>
