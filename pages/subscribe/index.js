import Dialog from '@vant/weapp/dialog/dialog';
import {getLocation, getSetting} from '../../utils/macutils'
Page({
    data: {
        currentSel: "",
        weightList:[],
        checked: true,
        show: true,
        showcalendar: false,
        showtime: false,
        date: '' , // 日期
        formatter(type, value) {
            if (type === 'hour') {
                return `${value}点`;
            } else if (type === 'minute') {
                return `${value}分`;
            }
            return value;
        },
        currentDate: '12:00',// 当前时间

    },
    onLoad: function (options) {
        this.addWeightList();
        getSetting(false).then(res => {
            console.log(res);
        });
        getLocation(false).then(value => {
            if(value!==0x12){
                const show=false;
                this.setData({
                    show: show
                })
            }
            console.log(value);
        })

    },
    sel: function(t) {
        // console.log(t);
        this.setData({
            currentSel:t.target.dataset.count
        });
    },
    addWeightList:function () {

        const as=[];
        for (let i=0;i<4;i++){
            const ad="100-285kg";
            as.push(ad);
        }
        this.setData({
            weightList: as
        })
    },
    onChange(event) {
        this.setData({
            checked: event.detail,
        });
    },

    openLocation: function (event) {
        getLocation().then(res => {
            console.log(res);
        });

    },

    getUserInfo(event) {
        console.log(event.detail);
    },

    onClose() {
        this.setData({ close: false });
    },
    onCloseClaendar() {
        this.setData({ showcalendar: false });
    },
    onCloseTime() {
        this.setData({ showtime: false });
    },
    opencalendar:function(){
        this.setData({
            showcalendar: true
        })
    },

    formatDate(date) {
        date = new Date(date);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(event) {
        this.setData({
            showcalendar: false,
            date: this.formatDate(event.detail),
        });
    },
    // 时间选择
    onInput(event) {
        this.setData({
            currentDate: event.detail,
        });
    },
    // 打开时间
    openTime:function () {
        this.setData({
            showtime: true,
        });
    }

});
