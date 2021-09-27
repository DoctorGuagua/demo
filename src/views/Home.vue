<template>
  <div class="home">
    <div class="box">
      <div>
        <div class="title">归属部门</div>
        <el-cascader
          clearable
          :props="props"
          v-model="value"
          :options="datas"
          
        ></el-cascader>
        <div>{{ clickResult }}</div>
      </div>
      <div>
        <div class="tranferbox">
          <div class="conbox">
            <div class="titbox">
              <el-input
                size="mini"
                placeholder="搜索角色"
                suffix-icon="el-icon-search"
                v-model="filterText"
              ></el-input>
            </div>
            <div class="wordbox">
              <el-tree
                @check="getDatas"
                show-checkbox
                class="filter-tree"
                node-key="id"
                :data="tree"
                :props="defaultProps"
                :filter-node-method="filterNode"
                ref="tree"
              ></el-tree>
            </div>
          </div>
          &emsp;
          <i class="el-icon-arrow-right"></i>&emsp;
          <div class="conbox">
            <div class="titbox">
              <h3>已选择角色（{{ keyarr.length }}）</h3>
            </div>
            <div class="wordbox">
              <ul style="list-style-type:none">
                <li v-for="(item, index) in keyarr" :key="index">
                  <div class="inli">
                    <i class="el-icon-check" style="color:blue"></i>
                    <span>{{ item.prodname }}</span>
                    
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- <el-tree
          :data="tree"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          @check-change="click"
        ></el-tree> -->
      </div>
    </div>
    <div class="box"></div>
  </div>
</template>

<script>
import { getdata } from "@/network/request";
export default {
  name: "Home",

  data() {
    return {
      clickResult: "",
      props: { label: "name", value: "name" },
      value: [],
      datas: [],
      tree: [
        // {
        //   id: 1,
        //   children: [{ prodname: "组织管理" }],
        //   name: "部门管理",
        //   description: "可以对团队的部门进行管理设置",
        //   prodid: 1,
        //   prodname: "中控系统",
        // },
      ],
      defaultProps: {
        children: "grouping",
        label: "prodname",
      },
      checkList: [],
      keyarr:[],
      filterText: "",
    };
  },
  created() {
    this.getdataMethods();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    
    //获取数据
    getdataMethods() {
      getdata("member/mod", null).then((res) => {
        if (res.status == 0) {
          this.datas = res.depttree;
          this.tree = res.rolerows;
          for (var i = 0; i < this.tree.length; i++) {
            var obj = this.tree[i];
            // console.log(obj);
            obj.grouping = [
              { prodname: obj.grouping,id:obj.id,grouping: [{ prodname: obj.name }] },
            ];
          }
          

         
        }
      });
    },

    //关键词搜索
    filterNode(value, data) {
      if (!value) return true;
      return data.prodname.indexOf(value) !== -1;
    },
    //选中之后的处理
    getDatas() {
      this.keyarr = [];
      this.checkList = this.$refs.tree.getCheckedNodes();
      console.log(this.checkList);
      if (this.checkList.length != 0) {
        for (var i = 0; i < this.checkList.length; i++) {
          if (!this.checkList[i].grouping) {
            this.keyarr.push(this.checkList[i]);
            console.log(this.checkList[i]);
          }
        }
      } else {
        this.keyarr = [];
      }
    },
    setCheckedNodes(arr) {
      this.$refs.tree.setCheckedNodes(arr);
    },





    //移除选中的数据，备用
    removeData(data) {
      let checklist = this.keyarr;
      console.log(this.keyarr);
      for (var i = 0; i < checklist.length; i++) {
        if (checklist[i].label === data.label) {
          checklist.splice(i, 1);
        }
      }
      console.log(this.keyarr);
      this.keyarr = checklist;
      this.setCheckedNodes(this.keyarr);
    },
  },
};
</script>
<style scoped>
.box {
  margin: 0 auto;
  width: 700px;
  display: flex;
  justify-content: space-between;
}
</style>
