import {NewList} from "../../api/app";

var that;
var listItems=[];
var aData={
    Page: 1,
    PageSize: 10,
    type: 0
};
Page({
    data: {
        active:0,
        listItem:[],
        titleList:[
            {
                title: "新闻",
                name: 0
            },
            {
                title: "资讯",
                name: 1
            }
        ],
    },
    onLoad: function (options) {
        // this.listItem();
        that=this;
        this.http(aData);
    },
    onChange(event) {
        // wx.showToast({
        //     title: `切换到标签 ${event.detail.name}`,
        //     icon: 'none',
        // });
        aData.type=event.detail.name;
        aData.Page=1;
        listItems=[];
        this.http(aData);
    },
    onReachBottom:function () {
        this.http(aData);
    },
    onUnload:function(){
        listItems=[];
    },
    onHide:function(){
        listItems=[];
    },
    // 测试
    listItem:function () {
        const test = {
            image: "https://cs17.appios.cn/uploads/20200731/3d5cf83e0deee46995454e0976d845df.jpg",
            name: "端午节|“粽”于等到你",
            desc: "端午安康！来康康粽叶垃圾分类小科普吧",
            read: "222",
            comment: "54",
            createtime: "2020/07/14"
        }
        const list = [];
        listItems.push(test);
        listItems.push(test);
        listItems.push(test);
        listItems.push(test);

        this.setData({
            listItem: listItems
        })
        console.log(listItems);
    },
    // 资讯列表
    http:function (params) {
        let dataArr=[];
        NewList(params).then(res=>{
            console.log(res);
            if(res.code===1){
                const list=res.List;
                for(let i=0;i<list.length;i++){
                    let data={
                        id: '',
                        title: '',
                        desc: '',
                        logo: '',
                        read_num: '',
                        dateline: ''
                    };
                    data.id=list[i].id; // id
                    data.title=list[i].title;// 标题
                    data.desc=list[i].desc;// 说明
                    data.read_num=list[i].read_num; // 阅读数量
                    data.dateline=list[i].dateline;// 创建时间
                    listItems.push(data);
                    dataArr.push(data);
                }
                that.setData({
                    listItem: listItems
                });
                aData.Page+=1;
            }

        });
    },
});
