<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    text-align: center;
  }
</style>
<template>
  <div>
    <el-container>
      <el-header>
        2018俄罗斯世界杯射手榜
      </el-header>
      <el-main>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'score', order: 'descending'}"
        >
          <el-table-column
            label="序号"
            prop="index">
          </el-table-column>
          <el-table-column
            label="日期"
            prop="date"
            width="180">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="180">
          </el-table-column>
          <el-table-column
            label="国家"
            prop="country">
          </el-table-column>
          <el-table-column
            label="进球数"
            prop="score">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="updateDataView(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteData(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNumber"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>

        <el-button type="primary" @click="addView" size="small" circle><i
          class="el-icon-circle-plus-outline"></i>
        </el-button>
        <el-button type="primary" @click="queryData" size="small" circle><i class="el-icon-search"></i></el-button>
        <input  name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>

        <el-dialog
          :title="dialogTitle"
          :visible.sync="dialogVisible"
          :modal-append-to-body="true"
          width="80%"
        >
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="球员名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="国家" prop="coutry">
              <el-input v-model="ruleForm.country"></el-input>
            </el-form-item>
            <el-form-item label="进球数" prop="score" :default-sort="{ prop: 'score',order: 'descending'}">
              <el-input v-model.number="ruleForm.score"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addData" v-show="btnDisplay=='add'">确 定</el-button>
            <el-button type="primary" @click="updateData" v-show="btnDisplay=='edit'">修 改</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        dialogTitle: '操作',
        btnDisplay: 'add',
        /*输入框集合*/
        ruleForm: {
          name: '',
          country: '',
          score: 0,
          date: '',
          id: 0
        },
        /*验证规则*/
        rules: {
          name: [
            {required: true, message: '请输入球员名称', trigger: 'blur'},
          ],
          country: [
            {required: true, message: '请输入国家名称', trigger: 'blur'},
          ],
          score: [
            {required: true, message: '请输入进球数', trigger: 'blur'},
          ],
        },
        pageNumber: 1,
        pageSize: 5,
        totalCount: 10,
        loading: false
      }
    },
    methods: {
      /*分页查询*/
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.queryData();
      },
      handleCurrentChange(pageNumber) {
        this.pageNumber = pageNumber;
        this.queryData();
      },
      /*查询数据*/
      queryData: function () {
        this.loading = true;
        this.$ajax.post('/test/query', {
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }).then(data => {
          this.loading = false;
          let resData = data.data.info;
          let tableData = [];
          resData.map((item, index) => {
            let obj = {};
            obj["index"] = (this.pageNumber - 1) * this.pageSize + index + 1;
            obj["date"] = item.date;
            obj["name"] = item.name;
            obj["country"] = item.country;
            obj["score"] = item.score;
            obj["id"] = item.id;
            tableData.push(obj)
          })
          this.tableData = tableData;
          this.totalCount = data.data.total;
        })
      },
      /*新增回显*/
      addView: function () {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.btnDisplay = 'add';
          this.ruleForm.name = '';
          this.ruleForm.country = '';
          this.ruleForm.score = '';
          this.ruleForm.date = '';
        })
      },
      /*新增数据*/
      addData: function () {
        this.$ajax.post('/test/add', {
          name: this.ruleForm.name,
          country: this.ruleForm.country,
          score: this.ruleForm.score,
          date: this.getDay(new Date()),
        }).then(success => {
          this.dialogVisible = false;
          this.$message(success.data.message);
          this.queryData()
        })
      },
      /*修改数据回显*/
      updateDataView: function (index, row) {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.btnDisplay = 'edit';
          this.ruleForm.id = row.id;
          this.ruleForm.name = row.name;
          this.ruleForm.country = row.country;
          this.ruleForm.score = row.score;
          this.ruleForm.date = row.date;
        })
      },
      /*确认编辑*/
      updateData: function () {
        this.$ajax.post('/test/edit', {
          id: this.ruleForm.id,
          name: this.ruleForm.name,
          country: this.ruleForm.country,
          score: this.ruleForm.score,
          date: this.ruleForm.date
        }).then(success => {
          this.$message(success.data.message);
          this.queryData();
          this.dialogVisible = false;
        })
      },
      /*删除数据*/
      deleteData: function (index, row) {
        this.$ajax.post('/test/delete', {
          id: row.id
        }).then(success => {
          this.$message(success.data.message);
          this.queryData()
        })
      },
      getDay: function (date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        return year + "-" + month + "-" + day;
      },
      update(e){
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('file', file);//通过append向form对象添加数据
//        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }; //添加请求头
        this.$ajax.post('/test/upload', param, config)
          .then(response => {
            console.log(response.data);
          })
      }
    },
    mounted: function () {
      this.queryData();
    }
  }
</script>

