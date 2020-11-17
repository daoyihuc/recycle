import {goRouter, toast} from "../../utils/macutils";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgs:Array,
    autoplay:{type:Boolean,value:true},
    interval:{type:Number,value:3000},
    duration:{type:Number,value:500},
    dots:{type:Boolean,value:false},
    height:{type:String,value:"240rpx"},
    radius:{type:String,value:"20rpx"},
    width: {type:String,value:"300px"},
    content:{type:String,value:""},
    urls:{type:String,value:""}
  },

  /**
   * 组件的初始数据
   */
  data: {
    current:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      this.setData({
        current:event.detail.current
      })
    },
    go:function (e) {
      console.log(e);
      console.log(e.currentTarget.dataset.content==="");
      console.log(e.currentTarget.dataset.url==="");
      if(e.currentTarget.dataset.content===""){
        if(e.currentTarget.dataset.url!==""){
          goRouter("/pages/banner-url/index?urls="+e.currentTarget.dataset.url);
        }else{
          toast("没有广告详细哦",1);
        }

      }else if(!e.currentTarget.dataset.url===""){
        if(!e.currentTarget.dataset.content!==""){
          goRouter("/pages/banner-content/index?content="+e.currentTarget.dataset.content);
        }else{
          toast("没有广告详细哦",1);
        }

      }else{
        toast("没有广告详细哦");
      }
    }
  }
})

