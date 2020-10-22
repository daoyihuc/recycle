
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
    width: {type:String,value:"300px"}
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
  }
})

