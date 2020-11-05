import {AdminCategoryList, OrderWeight} from "../../../api/order";
import {back, toast} from "../../../utils/macutils";


var that="";
var columnW=[];
var columns=[];
var classLists=[];
var aData={
  token: ''
};
var aData2={
    token:"",
    id: "",
    pay_id: 0,
    JsonArray:"",
}
Page({
    data: {
        columns:[],
        show: false,
        classList: [],
        radio: '0',
    },
    onLoad: function (options) {
        let id=options.id;
        columns=[
            {
                key: "name",
                values: "",
                className: 'column1',
            },
            {
                key: "name",
                values: '',
                className: 'column2',
                defaultIndex: 2,
            },
        ];
        aData.token=wx.getStorageSync("atoken");
        aData2.token=wx.getStorageSync("atoken");
        aData2.id=id;
        that=this;
        this.HttpAdminCategoryList(aData);
    },
    addItem:function(){

        if(classLists.length>=6){
            toast("只能添加6个哦",1);
        }else{
            this.setData({
                show: true
            });
        }

    },
    // 分类确认
    onConfirm:function(event) {
        const a= event.detail;
        console.log(a);
        // Toast(`当前值：${value[0].name}+${value[1].name}+${value[2].name}, 当前索引：${index}`);
        // this.setData({
        //     Province: a.value[0].name,
        //     City:  a.value[1].name,
        //     Country:  a.value[2].name,
        //     show: false
        // })
        let c={
            label: a.value[1].name,
            id: a.value[1].id,
            price: a.value[1].price,
            weight: ''
        };
        classLists.push(c);
        this.setData({
            classList: classLists,
            show: false
        })
    },
    // 分类取消
    onCancel:function() {
        this.setData({
            show: false
        })
    },
    // 地址拖动改变
    onChange:function(event) {
        const { picker, value, index } = event.detail;
        console.log(event.detail);
        console.log(picker.getColumnIndex(index));
        let columnIndex = picker.getColumnIndex(index);
        switch (index) {
            case 0:
                picker.setColumnValues(1, columnW[columnIndex].NextList);
                let columnValues1 = picker.getColumnValues(1);
                console.log(columnValues1);
                break;
            case 1:

                break;
        }

    },
    // http 管理员分类
    HttpAdminCategoryList:function (params) {
        AdminCategoryList(params).then(res=>{
            console.log(res);
            let a= {
                "id": 2,
                "name": "移动应用",
                "image": "https://fg.996sh.com/assets/img/qrcode.png",
                "NextList": [
                    {
                        "id": 3,
                        "name": "微信公众号",
                        "image": "https://fg.996sh.com/assets/img/qrcode.png",
                        "price": "1.00"
                    }
                ]
            };
            if(res.code===1){
                let list=res.data.List;
                columnW=list;
                columns[0].values=list;
                columns[1].values=list[0].NextList;
                this.setData({
                    columns: columns
                });
            }
        });
    },
    onWeight:function (e) {
        console.log(e);
        let index=e.currentTarget.dataset.index;
        classLists[index].weight=e.detail.value;
    },
    // 立即支付
    onPays:function () {
        console.log(classLists);
        let b=[];
        for(let i=0;i<classLists.length;i++){
            let a={"cat_id":1,"weight":12.5};
            a.cat_id=classLists[i].id;
            a.weight=classLists[i].weight;
            b.push(a);
        }
        let s = JSON.stringify(b);
        aData2.JsonArray=s;
        this.HttpOrderWeight(aData2);
    },
    //支付方式改变
    onPayChange:function(event) {
        this.setData({
            radio: event.detail,
        });
        aData2.pay_id=event.detail;
    },
    HttpOrderWeight:function (params) {
        OrderWeight(params).then(res=>{
           toast(res.msg,1);
           if(res.code===1){
               setTimeout(()=>{
                   back(1);
               },1000)

           }
        });
    },
    onUnload:function () {
        classLists=[];
    }
});
