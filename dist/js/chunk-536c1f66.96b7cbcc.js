(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-536c1f66"],{"0224":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"article-container"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:"/"}},[t._v("首页")]),a("el-breadcrumb-item",[t._v("内容管理")])],1)],1),a("el-form",{ref:"form",attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"状态",model:t.form}},[a("el-radio-group",{model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},[a("el-radio",{attrs:{label:null}},[t._v("全部")]),a("el-radio",{attrs:{label:0}},[t._v("草稿")]),a("el-radio",{attrs:{label:1}},[t._v("待审核")]),a("el-radio",{attrs:{label:2}},[t._v("审核通过")]),a("el-radio",{attrs:{label:3}},[t._v("审核失败")]),a("el-radio",{attrs:{label:4}},[t._v("已删除")])],1)],1),a("el-form-item",{attrs:{label:"频道"}},[a("el-select",{attrs:{placeholder:"请选择频道"},model:{value:t.form.channel_id,callback:function(e){t.$set(t.form,"channel_id",e)},expression:"form.channel_id"}},[a("el-option",{attrs:{label:"全部",value:null}}),t._l(t.channelArr,(function(t){return a("el-option",{key:t.id,attrs:{value:t.id,label:t.name}})}))],2)],1),a("el-form-item",{attrs:{label:"日期"}},[a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"开始日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:t.form.begin_pubdate,callback:function(e){t.$set(t.form,"begin_pubdate",e)},expression:"form.begin_pubdate"}})],1),a("el-col",{staticClass:"line",attrs:{span:2}},[t._v("-")]),a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{placeholder:"结束时间",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:t.form.end_pubdate,callback:function(e){t.$set(t.form,"end_pubdate",e)},expression:"form.end_pubdate"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:t.load},on:{click:t.searchFn}},[t._v("查询")])],1)],1)],1),a("el-card",{staticStyle:{"margin-top":"20px"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[t._v("根据筛选条件查询到"+t._s(t.total)+"条数据：")]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.load,expression:"load"}],staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"cover",label:"封面",width:"180"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-image",{staticStyle:{width:"150px",height:"100px"},attrs:{lazy:"",src:t.row.cover.images[0],fit:"cover"}})]}}])}),a("el-table-column",{attrs:{prop:"title",label:"标题",width:"180"}}),a("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.status?a("el-tag",[t._v("草稿")]):1===e.row.status?a("el-tag",{attrs:{type:"info"}},[t._v("待审核")]):2===e.row.status?a("el-tag",{attrs:{type:"success"}},[t._v("审核通过")]):3===e.row.status?a("el-tag",{attrs:{type:"warning"}},[t._v("审核失败")]):4===e.row.status?a("el-tag",{attrs:{type:"danger"}},[t._v("已删除")]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"pubdate",label:"时间"}}),a("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:""},on:{click:function(a){return t.hEdit(e.$index,e.row)}}}),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(a){return t.hDelete(e.$index,e.row)}}})]}}])})],1),a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",disabled:t.load,total:t.total},on:{"current-change":t.changePage}})],1)],1)},l=[],n=a("3835"),s=(a("96cf"),a("1da1")),o=a("365c"),c={name:"articleList",data:function(){return{form:{status:null,channel_id:null,begin_pubdate:null,end_pubdate:null,page:1,per_page:10},channelArr:[],tableData:[],total:0,load:!1}},created:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,r,l,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["f"])();case 2:if(a=e.sent,r=Object(n["a"])(a,2),l=r[0],s=r[1],!l){e.next=8;break}return e.abrupt("return");case 8:t.channelArr=s.data.data.channels,t.getArticleListFn();case 10:case"end":return e.stop()}}),e)})))()},methods:{searchFn:function(){this.getArticleListFn()},hEdit:function(t,e){this.$router.push({path:"/layout/addArticle",query:{id:e.id}})},hDelete:function(t,e){var a=this;this.$confirm("此操作将永久删除该文章, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function t(){var r,l,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["c"])(e.id);case 2:if(r=t.sent,l=Object(n["a"])(r,1),s=l[0],!s){t.next=7;break}return t.abrupt("return");case 7:a.$message({type:"success",message:"删除成功!"}),a.getArticleListFn();case 9:case"end":return t.stop()}}),t)})))).catch((function(){a.$message({type:"info",message:"已取消删除"})}))},changePage:function(t){this.form.page=t,this.getArticleListFn()},getArticleListFn:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,r,l,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.load=!0,e.next=3,Object(o["d"])(t.form);case 3:if(a=e.sent,r=Object(n["a"])(a,2),l=r[0],s=r[1],!l){e.next=9;break}return e.abrupt("return");case 9:t.tableData=s.data.data.results,t.total=s.data.data.total_count,t.load=!1;case 12:case"end":return e.stop()}}),e)})))()}}},i=c,u=(a("16b9"),a("2877")),d=Object(u["a"])(i,r,l,!1,null,"8bb0b08c",null);e["default"]=d.exports},"16b9":function(t,e,a){"use strict";a("5515")},5515:function(t,e,a){}}]);
//# sourceMappingURL=chunk-536c1f66.96b7cbcc.js.map