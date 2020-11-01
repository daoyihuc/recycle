import {FeedBack} from "../../../api/order";
import {back, toast} from "../../../utils/macutils";

var fileList = [] ;
var a='';
var FSM = wx.getFileSystemManager();
var aData={
    token: '',
    type: '',
    mobile: '',
    content:'',
    images: ''
};
Page({
    data: {
        fileList: [],
        radio: '0',
        phone: '',
        content: "",
    },
    onLoad: function (options) {
        aData.token=wx.getStorageSync("token");
    },
    afterRead(event) {
        const file  = event.detail;
        let a="";
        // reader.onload = () => {
        //     a += reader.result.toString().split(',')[1] + ',';
        // };
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        fileList.push({...file, url: file.file.url });
        console.log("daoyi",file.file.url);
        FSM.readFile({
            filePath: file.file.url,
            encoding: "base64",
            success: function(data) {
                console.log(data.data)
                a+=data.data+",";
                // toast(data.data);
            }
        });

        this.setData({
            fileList: fileList
        });
    },
    // 类型选择
    onChange(event) {
        this.setData({
            radio: event.detail,
        });
    },
    // 手机号码
    onPhoneChange(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            phone: event.detail
        });
    },
    // 详细类容
    onContentChange(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            content: event.detail
        });
    },
    // 提交事件
    SaveEvent:function () {
        console.log(this.data.fileList);
        // this.selectImage();
        aData.type=this.data.radio;
        aData.mobile=this.data.phone;
        aData.content=this.data.content;
        aData.images=a;
        this.HttpSave(aData);

    },
    // 数据保存
    HttpSave:function (params) {
        FeedBack(params).then(res=>{
            console.log(res);
            toast(res.msg,1);
            if(res.code===1){
                setTimeout(()=>{
                    back(1);
                },1500);

            }

        });
    },
});
