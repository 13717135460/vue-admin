<template>
  <div class="page2">
    <section>
		<h1 class="fz20 mb20">vue-quill-editor 富文本</h1>
    <quill-editor
      id="editor"
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
	</section>
  <span class="mt10">字数：{{TiLength}} / 800</span>
  <!-- <el-button type="primary" @click="getContent">获取内容</el-button> -->
  <p class="mt20 mb10">富文本内容是：<span v-text="contents"></span></p>
  <p>官网地址：https://quilljs.com/docs/api/#content</p>
  <p>中文官网: https://www.kancloud.cn/liuwave/quill/1409378</p>
  </div>
</template>

// <script src="https://cdn.staticfile.org/quill/1.3.6/quill.js"></script>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
// import Quill from 'quill'

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data () {
    return {
      toolbarTips: [
        { Choice:'.ql-bold',title:'加粗' },
        { Choice:'.ql-italic',title:'倾斜' },
        { Choice:'.ql-underline',title:'下划线' },
        { Choice:'.ql-header',title:'段落格式' },
        { Choice:'.ql-strike',title:'删除线' },
        { Choice:'.ql-blockquote',title:'块引用' },
        { Choice:'.ql-code-block',title:'插入代码段' },
        { Choice:'.ql-size',title:'字体大小' },
        { Choice:'.ql-list[value="ordered"]',title:'编号列表' },
        { Choice:'.ql-list[value="bullet"]',title:'项目列表' },
        { Choice:'.ql-header[value="1"]',title:'h1' },
        { Choice:'.ql-header[value="2"]',title:'h2'},
        { Choice:'.ql-align',title:'对齐方式' },
        { Choice:'.ql-color',title:'字体颜色' },
        { Choice:'.ql-background',title:'背景颜色' },
        { Choice:'.ql-image',title:'上传图片' },
        { Choice:'.ql-video',title:'视频' },
        { Choice:'.ql-link',title:'添加链接' },
        { Choice:'.ql-formula',title:'插入公式' },
        { Choice:'.ql-clean',title:'清除格式' },
        { Choice:'.ql-indent[value="-1"]',title:'向左缩进' },
        { Choice:'.ql-indent[value="+1"]',title:'向右缩进' },
        { Choice:'.ql-header .ql-picker-label',title:'标题大小' },
        { Choice:'.ql-header .ql-picker-item[data-value="1"]',title:'标题一' },
        { Choice:'.ql-header .ql-picker-item[data-value="2"]',title:'标题二' },
        { Choice:'.ql-header .ql-picker-item[data-value="3"]',title:'标题三' },
        { Choice:'.ql-header .ql-picker-item[data-value="4"]',title:'标题四' },
        { Choice:'.ql-header .ql-picker-item[data-value="5"]',title:'标题五' },
        { Choice:'.ql-header .ql-picker-item[data-value="6"]',title:'标题六' },
        { Choice:'.ql-header .ql-picker-item:last-child',title:'标准' },
        { Choice:'.ql-size .ql-picker-item[data-value="small"]',title:'小号' },
        { Choice:'.ql-size .ql-picker-item[data-value="large"]',title:'大号' },
        { Choice:'.ql-size .ql-picker-item[data-value="huge"]',title:'超大号' },
        { Choice:'.ql-size .ql-picker-item:nth-child(2)',title:'标准' },
        { Choice:'.ql-align .ql-picker-item:first-child',title:'居左对齐' },
        { Choice:'.ql-align .ql-picker-item[data-value="center"]',title:'居中对齐' },
        { Choice:'.ql-align .ql-picker-item[data-value="right"]',title:'居右对齐' },
        { Choice:'.ql-align .ql-picker-item[data-value="justify"]',title:'两端对齐' }
      ],
      content: "",
      contents: "",
      TiLength: 0,
      editorOption: {
        placeholder: "请输入...",
        modules: {
           toolbar:[
            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'],     //引用，代码块
            [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
            [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     // 几级标题
            [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
            [{ 'align': [] }],    //对齐方式
            ['clean'],    //清除字体样式
            ['image']    //上传图片、上传视频
           ] //工具栏设置
         }
      },
      theme:'snow'
    }
  },
  components: {
    quillEditor
  },
  mounted () {
    // this.editor.container.style.height = `${500}px`
    for(let item of this.toolbarTips){
      let tip = document.querySelector('.quill-editor '+ item.Choice)
      if (!tip) continue
      tip.setAttribute('title',item.title)
    }
  },
  computed: {
    editor() {
      // false禁止编辑  true语序编辑
      this.$refs.myQuillEditor.quill.enable(false)
      // return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    getContent () {
      // var quill = new Quill('#editor');
      // var txt = quill.getContents();
      // var length = quill.getLength();
      // console.log(txt);
      // console.log(length);
      // console.log(this.content);
    },
    onEditorReady(editor) { }, // 准备编辑器
    // 失去焦点事件
    onEditorBlur(val, editor) {
      // console.log('222');
      // console.log(val);
      // // console.log(val.container.innerHTML);
      // // console.log(val.container.innerText);
      // console.log(val.container.outerHTML);
      // console.log(val.container.outerText);
    },
    // 获得焦点事件
    onEditorFocus(val, editor) {
      // console.log('111');
      // console.log(val); // 富文本获得焦点时的内容
    },
    // 内容改变事件
    onEditorChange(event) {
      event.quill.deleteText(800,4)
      if(this.content === '') {
        this.TiLength = 0
      } else {
        this.TiLength = event.quill.getLength()-1
      }
      // if (this.TiLength > 10) {
      //   this.$message.error('大于10')
      //   // 禁止编辑
      //   this.$refs.myQuillEditor.quill.enable(false)
      // }
      // console.log('wxyjolin');
      // console.log(event.html);
      // console.log(event.text);
      this.contents = event.text
    }
  }
}
</script>
<style lang="less" scope>
.page2 {
  border: 1px solid transparent;
}
</style>
<style lang="less">
.page2 {
  .ql-container {
    height: 500px;
  }
}
</style>
