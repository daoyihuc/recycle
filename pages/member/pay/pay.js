import {AdminCategoryList, OrderWeight, OrderWeightPrice} from "../../../api/order";
import {back, toast} from "../../../utils/macutils";


var that="";
var columnW=[];
var columns=[];
var classLists=[];
var moneyList=[];
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
        moneySum: 0,
        icon: {
            normal: 'https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.9/first-114@2x.png',
            active: 'https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.9/first-113@2x.png',
        },
        icon1:{
            d1:"https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@2.0/first-1101@2x.png",
            d2:"https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.9/first-110@2x.png"
        }
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
        this.Calculation();
    },
    onWeight1:function (e) {
        console.log(e);
        let index=e.currentTarget.dataset.index;
        classLists[index].weight=e.detail;
        this.Calculation();
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
            radio: event.currentTarget.dataset.radio,
        });
        aData2.pay_id=event.currentTarget.dataset.radio;
    },
    // 称重结算
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
    // 价格计算
    HttpOrderWeightPrice:function(params){
        OrderWeightPrice(params).then(res=>{
            if(res.code===1){

            }
        });
    },
    // 金额计算
    Calculation:function(){
        console.log("开始计算金额");
        let sum=0;
      for(let i=0;i<classLists.length;i++){
          sum+=classLists[i].price*classLists[i].weight;
      }
      this.setData({
          moneySum: sum
      });
    },
    onUnload:function () {
        classLists=[];
    }
});
