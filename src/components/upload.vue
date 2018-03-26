<template>
  <div class="upload">
    <p>Please upload your file:</p>
    <input type="file" @change="onFileChange">
    <button @click="uploadFile">Upload</button>
    <table border="0" cellspacing="0" v-if="this.tableTbody.length>0">
      <thead>
        <tr>
          <th>Index</th>
          <th v-for="header in this.tableHeader">
            {{header}}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(value, key) in this.tableTbody">
          <td>{{key}}</td>
          <td v-for="list in value ">
            {{list}}
          </td>
        </tr>
      </tbody>

      <!--<tr>-->
        <!--<td v-for="body in this.tableTbody">-->
          <!--{{body}}-->
        <!--</td>-->
      <!--</tr>-->
    </table>
  </div>
</template>

<script>
//import "../../node_modules/xlsx/dist/xlsx.full.min"
import XLSX from "xlsx"

export default {
  name: 'upload',
  data () {
    return {
      fileLength: 0,
      fileList: [],
      tableHeader: [],
      tableTbody: []
    }
  },
  methods: {
    onFileChange: function (e) {
//      this.fileList = e.target.files || e.dataTransfer.files;
      console.log("File change!");
      if(!e.target.files) {
        console.log("No file!");
        return;
      }
      let file = e.target.files[0];
      let types = file.name.split('.')[1];
      let fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(item => item === types);
      if (!fileType) {
        alert("格式错误！请重新选择");
        return;
      }
      console.log(file);
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.tableHeader = Object.keys(tabJson[0]);
          this.tableTbody = tabJson;
          console.log(this.tableHeader);
          console.log(this.tableTbody);
        }
      });
    },
    file2Xce: function(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.onload = function (e) {
          let data = e.target.result;
          this.wb = XLSX.read(data, {
            type: 'binary'
          });
          resolve(XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]]));
        };
        reader.readAsBinaryString(file);
      });
    },
    uploadFile: function () {
      console.log("upload file");

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  table {
    /*border-color: blue;*/
  }

  table th {
    background-color: cadetblue;
    /*background-color: rgb(62, 203, 202);*/
  }

  tbody tr:nth-child(odd) {
    background-color: antiquewhite;
  }

  tbody tr:nth-child(even) {
    background-color: aqua;
  }

  tbody td {
    width: 200px;
    text-align: center;
  }
</style>
