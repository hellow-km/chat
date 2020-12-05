import NodeData from '@/views/common/list/NodeData';
import ItemData from '@/views/common/list/ItemData';

class ListData {
  public static userNodes: NodeData[] = [{
    key: "",
    name: "nnn",
    rank: 0,
    countText: "[0/0]",
    items: [
      {
        active: false,
        key: "",
        name: "123",
        avatar: "/assets/images/common/head/user/1.png",
        gray: true,
        red: false,
        redCount: 0
      },
      {
        active: false,
        key: "",
        name: "1234",
        avatar: "/assets/images/common/head/user/1.png",
        gray: true,
        red: false,
        redCount: 0
      }
    ],
    isOpen: false,
    red: false,
    redCount: 1
  }, {
    key: "",
    name: "nnn2",
    rank: 0,
    countText: "[0/0]",
    items: [
      {
        active: false,
        key: "",
        name: "123",
        avatar: "/assets/images/common/head/user/1.png",
        gray: true,
        red: false,
        redCount: 0
      },
      {
        active: false,
        key: "",
        name: "1234",
        avatar: "/assets/images/common/head/user/1.png",
        gray: true,
        red: false,
        redCount: 0
      }
    ],
    isOpen: false,
    red: false,
    redCount: 1
  }];
  public static groupNodes: NodeData[] = [{
    key: "",
    name: "g1",
    rank: 0,
    countText: "[0/0]",
    items: [
      {
        active: false,
        key: "",
        name: "123",
        avatar: "/assets/images/common/head/user/1.png",
        gray: true,
        red: false,
        redCount: 0
      },
      {
        active: false,
        key: "",
        name: "456",
        avatar: "/assets/images/common/head/user/1.png",
        gray: true,
        red: false,
        redCount: 0
      }
    ],
    isOpen: false,
    red: false,
    redCount: 1
  }, {
    key: "",
    name: "g2",
    rank: 0,
    countText: "[0/0]",
    items: [
      {
        active: false,
        key: "",
        name: "423",
        avatar: "/assets/images/common/head/user/1.png",
        gray: true,
        red: false,
        redCount: 0
      },
      {
        active: false,
        key: "",
        name: "524",
        avatar: "/assets/images/common/head/user/1.png",
        gray: true,
        red: false,
        redCount: 0
      }
    ],
    isOpen: false,
    red: false,
    redCount: 1
  }];
}

export default ListData;
