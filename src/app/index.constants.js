/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('mp')
    .constant('PATH', {
      componentsBase: 'app/components/',
      routerBase: 'app/router/',
      adminBase: 'app/router/admin/',
      orgBase: 'app/router/org/',
      modalBase: 'app/modal/'
    })
    .constant('CONF', {
      version: '0.0.1',
      qiniuDomain: 'http://oc469bbac.bkt.clouddn.com/lhccms',
      localImgDomain: 'assets/images',
      tokenKey: 'X-GREEN-MATCH-KEY',
      salt: 'lvHuochaIcMs',
      tokenValuePrefix: 'Bearer ',
      apiDomain: 'http://lhc.0lz.net:9999',
      //apiDomain: 'http://lhc.0lz.net:8888'
    })
    .constant('ORG_TYPE', {
      society: 'SOCIETY',
      campus: 'CAMPUS'
    })
    .constant('ACTIVITY_STATUS',{
      editing: 'EDITING',//编辑中
      auditing: 'AUDITING',//审核中
      auditFailed: 'AUDIT_FAILED',//审核失败
      active: 'ACTIVE', //活动招募中
      inActive: 'INACTIVE',//活动报名截止
      onGoing: 'ONGOING', //活动进行中
      finished: 'FINISHED', // 活动结束
      canceled: 'CANCELLED', // 活动取消
      delete: 'DELETED'// 活动删除
    })
    .constant('EVENT', {
      refreshPagination: 'refreshPagination'
    })
    .constant('REGEXP', {
      cellphone: /(^(13\d|14[57]|15[^4,\D]|17[13678]|18\d)\d{8}|170[^346,\D]\d{7})$/,
      email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    })
    .constant('API', {
      geo: '/gm/common/geo/{id}',                                                                                       //获取地址信息  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=2
      getCaptcha: '/gm/common/captcha/send',                                                                            //获取图形验证码  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=3
      verifyCaptcha: '/gm/common/captcha/check',                                                                        //验证图形验证码  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=4
      sendMessageCode: '/gm/common/code/send',                                                                          //发送手机验证码  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=5
      verifyMessageCode: '/gm/common/code/check',                                                                       //校验手机验证码  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=6
      fileUpload: '/gm/secured/common/upload/file/lvhuochai',                                                           //文件上传  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=7
      fileUploadSimditor: '/gm/secured/common/upload/file/format/lvhuocha',                                             //文件上传(富文本编辑器)  //http://demo.0lz.net/showdoc/index.php?s=/1&page_id=8

      orgLogin: '/gm/org/login',                                                                                        //组织登陆  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=32
      orgApply: '/gm/org/apply',                                                                                        //组织申请入驻  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=33,
      orgUpdateProfile: '/gm/secured/org/{oid}/basic',                                                                  //组织更新资料  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=34
      orgUpdatePhone: '/gm/secured/org/{oid}/contactphone',                                                             //组织修改手机号  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=63
      orgUpdatePassword: '/gm/secured/org/{oid}/account/{aid}/password/modify',                                                              //组织修改密码  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=64
      orgResetPassword: '/gm/org/account/reset',                                                               //组织重置密码  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=65

      getMetaDataTags: '/gm/activity/metadata/tags',//获取活动性质
      getCategories: '/gm/activity/metadata/categories',//获取活动分类
      getOneActivity: '/gm/activity/{aid}',                                                    //获取单个活动  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=35
      getActivities: '/gm/activity',                                                           //获取活动列表 http://demo.0lz.net/showdoc/index.php?s=/1&page_id=36
      saveActivity: '/gm/secured/org/{oid}/activity/save',                                     //创建/更新活动  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=37
      supplementActivity: '/gm/secured/org/{oid}/activity/{aid}/supplement',                   //提供活动补充信息    http://demo.0lz.net/showdoc/index.php?s=/1&page_id=38
      auditActivity: '/gm/secured/org/{oid}/activity/{aid}/audit',                             //活动审核  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=39
      cancelAuditActivity: '/gm/secured/org/{oid}/activity/{aid}/cancel',                      //取消活动审核  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=40
      deleteActivity: '/gm/secured/org/{oid}/activity/{aid}/delete',                           //删除活动  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=41
      addActivityReview: '/gm/secured/org/{oid}/activity/{aid}/review',                        //添加活动回顾  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=42
      addSignUpField: '/gm/secured/org/{oid}/signupfield/create',                              //创建自定义活动报名字段  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=43
      deleteSignUpField: '/gm/secured/org/{oid}/signupfield/{fid}/delete',                     //删除自定义字段 http://demo.0lz.net/showdoc/index.php?s=/1&page_id=77
      getSignUpFields: '/gm/secured/org/{id}/signupfield',                                     //获取组织可用的报名字段列表  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=44
      getActivitySignUpFields: '/gm/activity/metadata/{aid}/fields',                           //获取活动报名所需字段列表  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=45
      getActivitySignUpRecords: '/gm/secured/org/{oid}/activity/{aid}/signup',                 //获取活动报名信息列表  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=46
      getActivityQrCode: '/gm/secured/org/{oid}/activity/{aid}/qrcode',                        //获取活动二维码  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=47
      exportActivitySignUpRecords: '/gm/secured/org/{oid}/activity/{aid}/export/signup',       //导出活动报名信息(XLSX格式)  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=48
      manualSignUpActivity: '/gm/secured/org/{oid}/activity/{aid}/manualsignup',               //活动报名手动录入  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=66
      getVolunteers: '/gm/secured/org/{oid}/volunteer',                                        //获取志愿者列表  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=49
      getStatistics: '/gm/secured/org/{oid}/dashboard',                                        //组织统计数据    http://demo.0lz.net/showdoc/index.php?s=/1&page_id=50
      getFaq: '/gm/secured/org/{oid}/faq',     //获取FAQ列表   http://demo.0lz.net/showdoc/index.php?s=/1&page_id=67

      auditPlatActivity: '/gm/secured/platform/activity/{aid}/audit', //平台审核活动
      postPlatformHot: '/gm/secured/platform/activity/{aid}/hot', //平台设置热点活动
      postUploadDiscussQrcodde: '/gm/secured/org/{oid}/activity/{aid}/supplement', //后续上传活动讨论组二维码
      adminLogin: '/gm/platform/login',                                                        //平台管理员登陆  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=51
      getOrgs: '/gm/org',             //获取组织列表  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=57
      getOrg: '/gm/org/{oid}',       //获取单个组织
      checkOrg: '/gm/secured/platform/org/{oid}/audit',       //审核组织入驻申请  http://demo.0lz.net/showdoc/index.php?s=/1&page_id=58,
      getOrgStatistics: '/gm/secured/org/{oid}/chart/dashboard',      //组织的统计数据    http://demo.0lz.net/showdoc/index.php?s=/1&page_id=50
      getOrgNames: '/gm/typeahead/orgname'      //获取组织名称列表    http://demo.0lz.net/showdoc/index.php?s=/1&page_id=76
    })

})();
