import {MyInvitation} from "../../../api/order";

var aData={
    token: wx.getStorageSync("token"),
    Page: 1,
    PageSize: 10
};
var that;
var ListData=[];
Page({
    data: {
        mans: [],
    },
    onLoad: function (options) {
        that=this;
        this.HttpMyInvitation(aData);
    },
    onHide:function(){
      ListData=[];
    },
    HttpMyInvitation:function (params) {
        MyInvitation(params).then(res=>{

            if(res.code===1){
                for(let i=0;i<res.data.List.length;i++){
                    const a={
                        id: 3,
                        nickname: "大雁",
                        avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/pzwknTuHw5OyBmAzy1fzfUUOicYy5pc4FicMJk3IiaID8Xbf0HPHEJS0Kx4U5ldibichbIUBnlWcpVvpbmQ8f4VMc0A/132",
                        createtime: "2020-10-29 19:34:35"
                    }
                    a.id=res.data.List[i].id;
                    a.avatar=res.data.List[i].avatar;
                    a.nickname=res.data.List[i].nickname;
                    ListData.push(a);
                }
                that.setData({
                    mans: ListData,
                });
            }
            aData.Page+=1;

        });
    }
});
