/*开发环境*/
export const BASE_URL = 'https://fg.996sh.com/';

export const PHONE="400-179-1768";
export const API={
    wxlogin: BASE_URL+"WxLogin", // 授权登录
    NewList: BASE_URL+"NewList", // 资讯列表接口
    NewDetail: BASE_URL+"NewDetail", // 资讯详情接口
    Index: BASE_URL+"Index", // 首页接口
    AppointmentShow: BASE_URL+"AppointmentShow", // 预约界面信息展示接口
    MakeAnAppointmentNow: BASE_URL+"MakeAnAppointmentNow", // 立即预约接口
    AddAddress: BASE_URL+"AddAddress", // 添加地址接口
    AddressInfo: BASE_URL+"AddressInfo", // 地址详情接口
    EditAddress: BASE_URL+"EditAddress", // 编辑地址接口
    AddressList: BASE_URL+"AddressList", // 地址列表接口
    AddressDelete: BASE_URL+"AddressDelete", // 地址删除
    AppintmentList: BASE_URL+"AppintmentList", // 预约列表接口
    AppintmentDetail: BASE_URL+"AppintmentDetail", // 预约详情接口
    CancelOrder: BASE_URL+"CancelOrder", // 预约取消接口
    ComfirmFinished: BASE_URL+"ComfirmFinished", // 预约确认完成接口
    CategoryList: BASE_URL+"CategoryList", // 回收废品分类列表接口
    RecyclingList: BASE_URL+"RecyclingList", // 回收指南接口
    MyInvitation: BASE_URL+"MyInvitation", // 我的邀请列表接口
    RankingList: BASE_URL+"RankingList", // 回收排行榜接口
    FeedBack: BASE_URL+"FeedBack", // 意见反馈接口
    GoodsIndex: BASE_URL+"GoodsIndex", // 商城首页
    GoodsList: BASE_URL+"GoodsList", // 商品列表 //start
    GoodsDetail: BASE_URL+"GoodsDetail", // 商品详情
    CheckOrder: BASE_URL+"CheckOrder", // 商品购买确认订单接口
    Done: BASE_URL+"Done", // 商城商品兑换提交接口
    OrderList: BASE_URL+"OrderList", // 商城订单列表接口
    OrderDetail: BASE_URL+"OrderDetail", // 商城订单详情
    CancelGoodsOrder: BASE_URL+"CancelGoodsOrder", // 商城订单取消
    ComfirmGoodsOrder: BASE_URL+"ComfirmGoodsOrder", // 商城确认收货
    Mine: BASE_URL+"Mine", // 我的
    AmountDetails: BASE_URL+"AmountDetails", // 明细列表接口
    Withdrawal: BASE_URL+"Withdrawal", // 体现
    AdminLogin: BASE_URL+"AdminLogin", // 回首员登录
    AdminAppointmentList: BASE_URL+"AdminAppointmentList", // 回收员预约订单列表接口
    ReceivingOrders: BASE_URL+"ReceivingOrders", // 回收员接单
    UpdateOrderStatus: BASE_URL+"UpdateOrderStatus", //  更改状态为服务中
    AdminAppointmentDetail: BASE_URL+"AdminAppointmentDetail", //  回收订单详情
    AdminCategoryList: BASE_URL+"AdminCategoryList", //  管理员回首分类
    OrderWeightPrice: BASE_URL+"OrderWeightPrice", //  回收员称重获取单品价格接口
    OrderWeight: BASE_URL+"OrderWeight", //  回收员称重提交接口
    BookingCenter: BASE_URL+"BookingCenter", //  预约中心接口
    PoliteInvitation: BASE_URL+"PoliteInvitation", //  邀请有礼
    ApplyStore: BASE_URL+"ApplyStore", //  提交门店信息接口
    ApplyStoreStatus: BASE_URL+"ApplyStoreStatus", //  判断该二维码是否绑定门店接口
    GetStoreAddress: BASE_URL+"GetStoreAddress", //  通过二维码ID获取门店地址信息


}
