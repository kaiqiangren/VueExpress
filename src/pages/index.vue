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
          :data="tableData"
          style="width: 100%"
          :default-sort = "{prop: 'score', order: 'descending'}"
        >
          <el-table-column
            label="序号"
            type="index">
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
        <el-button type="primary" @click="addView" size="small" circle><i
          class="el-icon-circle-plus-outline"></i>
        </el-button>
        <el-button type="primary" @click="queryData" size="small" circle><i class="el-icon-search"></i></el-button>
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
        ruleForm: {
          name: '',
          country: '',
          score: 0,
          date: '',
          id: 0
        },
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
        }
      }
    },
    methods: {
      /*查询数据*/
      queryData: function () {
        this.$ajax.post('/test/query').then(data => {
          this.tableData = data.data.info;
        })
      },
      /*新增回显*/
      addView:function () {
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
        }).then(success=>{
          this.$message(success.data.message);
          this.queryData();
          this.dialogVisible=false;
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
      }
    },
    mounted: function () {
      this.queryData();

      var ws = new WebSocket("ws://10.18.160.20:3000");

      ws.onopen = function(evt) {
        console.log("Connection open ...");
        ws.send("Hello WebSockets!");
      };

      ws.onmessage = function(evt) {
        console.log( "Received Message: " + evt.data);
        ws.close();
      };

      ws.onclose = function(evt) {
        console.log("Connection closed.");
      };
    }
  }
</script>

