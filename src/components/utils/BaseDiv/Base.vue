<template>
  <div id="app">
    <el-container>
      <el-main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="(level,index) in levelList"
            :key="index"
            :to="{path: level.path}"
          >
            {{level.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="10" class="show-row">
          <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24" style="padding-bottom:30px">
            <el-card class="animation-card">
              <slot name="animation-div"></slot>
            </el-card>
            <div style="text-align: center; margin-top: 10px;">
              <slot name="button-group">
                <el-button-group>
                  <el-button :disabled="display.edit" icon="el-icon-edit" type="primary" @click="dialogVisible = true"
                  ></el-button>
                  <el-button v-if="isPlay" icon="el-icon-video-pause" type="warning" @click="play"></el-button>
                  <el-button v-else icon="el-icon-video-play" type="warning" @click="play"></el-button>
                  <el-button :disabled="display.add" icon="el-icon-plus" type="danger" @click="inputDialogVisible=true"
                  ></el-button>
                </el-button-group>
              </slot>
            </div>
          </el-col>
          <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24" class="code-box" style="position: relative;">
            <div class="click">
              <ul>
                <li v-for="index in linecount" :key="index" @click="click(index)"></li>
              </ul>
            </div>
            <div style="margin-left: 10px;">
              <codemirror ref="code" v-model="codeData" :options="option" class="code-mirror"></codemirror>
            </div>
          </el-col>
        </el-row>
        <el-dialog
          :before-close="handleClose"
          :title="title[0]"
          :visible.sync="dialogVisible"
        >
          <slot name="change-dialog-div"></slot>
          <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="changeDialog()">确 定</el-button>
              </span>
        </el-dialog>
        <el-dialog
          :before-close="handleClose"
          :title="title[1]"
          :visible.sync="inputDialogVisible"
        >
          <slot name="add-dialog-div"></slot>
          <span slot="footer" class="dialog-footer">
                  <el-button @click="inputDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addDialog()">确 定</el-button>
              </span>
        </el-dialog>
      </el-main>
      <el-footer>
        <el-card shadow="hover">
          <el-row :gutter="10">
            <el-col :lg="4" :md="3" :sm="6" :xl="4" :xs="8">
              <div class="span-div"> 语言选择:</div>
            </el-col>
            <el-col :lg="8" :md="21" :sm="18" :xl="8" :xs="16">
              <div class="radio-div">
                <el-radio-group v-model="language" @change="changeDataCode">
                  <el-radio label="0">C</el-radio>
                  <el-radio label="1">C++</el-radio>
                  <el-radio label="2">Java</el-radio>
                </el-radio-group>
              </div>
            </el-col>
            <el-col :lg="4" :md="3" :sm="6" :xl="4" :xs="8">
              <div class="span-div">播放速度:</div>
            </el-col>
            <el-col :lg="8" :md="21" :sm="18" :xl="8" :xs="16">
              <el-slider v-model="speed"></el-slider>
            </el-col>
          </el-row>
        </el-card>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/theme/dracula.css'

require('codemirror/mode/clike/clike.js')
require('codemirror/addon/selection/active-line.js')
export default {
  props: {
    codeDataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    levelList: {
      type: Array,
      default: () => {
        return []
      }
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: Array,
      default: () => {
        return []
      }
    },
    display: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      language: '2',
      speed: 50,
      isPlay: false,
      dialogVisible: false,
      inputDialogVisible: false,
      focus: -1,
      linecount: 0,
      editor: {},
      codeData: '',
      set: new Set()
    }
  },
  components: {
    codemirror
  },
  mounted() {
    this.editor = this.$refs.code.codemirror
  },
  methods: {
    changeDataCode(val) {
      this.codeData = this.codeDataList[val]
      setTimeout(() => {
        this.linecount = this.editor.lineCount()
      }, 0)
    },
    getSpeed() {
      return 800 - 7 * this.speed
    },
    play() {
      if (this.isPlay) {
        this.isPlay = false
      } else {
        this.isPlay = true
        if (this.set.has(this.focus)) {
          this.set.delete(this.focus)

          setTimeout(() => {
            this.set.add(this.focus)
          }, 800)
        }
        this.moveCursor()
      }
    },
    getRandom(n, m) {
      return Math.floor(n + Math.random() * (m - n + 1))
    },
    click(i) {
      const addClick = (index) => {
        const dom = document.querySelector('.click li:nth-child(' + index + ')')
        this.set.add(index - 1)
        dom.classList.add('redPoint')
        dom.style.display = 'block'
      }
      const removeClick = (index) => {
        const dom = document.querySelector('.click .redPoint:nth-child(' + index + ')')
        dom.classList.remove('redPoint')
        this.set.delete(index - 1)
      }
      if (this.set.has(i - 1)) {
        removeClick(i)
      } else {
        addClick(i)
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    moveCursor() {
    },
    changeDialog() {

    },
    addDialog() {

    }
  }
}
</script>
<style lang="less" scoped>
.el-main {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  overflow: unset !important;
  margin-bottom: 12px;
}

.show-row.el-row, .show-row .el-col {
  min-height: 50vh;
}

.el-main::-webkit-scrollbar {
  width: 0 !important
}

.el-container {
  height: 80vh;
}

.animation-card {
  height: 91%;
}

.click {
  position: absolute;
  z-index: 700;
  top: 1%;
  left: -0.5%;
  width: 30px;
}

.click ul {
  padding: 0;
  margin: 0;
}

.click li {
  position: relative;
  height: 14.4px;
  color: transparent;
  list-style: none;
  cursor: pointer;
  padding: 4.4px 0;
  // background-color: pink;
  // border: 1px solid black;
}

.click li.redPoint::before {
  content: "";
  position: absolute;
  left: 59.2%;
  width: 15px;
  height: 15px;
  background-color: red;
  z-index: 701;
  border-radius: 50%;
}

.radio-div {
  transform: translateY(50%);
}

.span-div {
  transform: translateY(50%);
  text-align: right;
  padding-right: 10px;
}

.code-mirror {
  font-size: 20px;
  // line-height: 120%;
}

.code-box {
  background: #a7a8bd;
  box-shadow: 20px 20px 46px #cccccc,
    -20px -20px 46px #f4f4f4;
  padding: 0px;
}
</style>
