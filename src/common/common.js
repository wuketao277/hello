export default {
  // 前端版本
  version: '1.1.2',
  versionCheck () {
    // 先获取本地版本
    let localVersion = window.localStorage['version']
    // 如果本地版本未定义或与最新前端版本不一致，就删除前端本地数据，并重新保存最新版本
    if (typeof (localVersion) === 'undefined' || localVersion === null ||
      localVersion === '' || localVersion !== this.version) {
      window.localStorage.clear()
      window.localStorage['version'] = this.version
    }
  },
  // 判断字符串非空
  judgeStrIsNotNull (str) {
    if (typeof (str) === 'undefined') {
      // 未定义判定为空
      return false
    } else if (str === null) {
      // 空对象判定为空
      return false
    } else if (str === '') {
      // 空字符串判定为空
      return false
    }
    return true
  },
  // 是否拥有admin角色
  isAdmin () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.roles.includes('ADMIN', 0)
  },
  // 是否拥有admin角色
  isAdminInArray (arr) {
    return arr.includes('ADMIN', 0)
  },
  // 是否拥有admin_company角色
  isAdminCompany () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.roles.includes('ADMIN_COMPANY', 0)
  },
  // 是否拥有admin_company角色
  isAdminCompanyInArray (arr) {
    return arr.includes('ADMIN_COMPANY', 0)
  },
  // 是否拥有AM角色
  isAM () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.roles.includes('AM', 0)
  },
  // 是否拥有AM角色
  isAMInArray (arr) {
    return arr.includes('AM', 0)
  },
  // 是否拥有RECRUITER角色
  isRECRUITER () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.roles.includes('RECRUITER', 0)
  },
  // 是否拥有RECRUITER角色
  isRECRUITERInArray (arr) {
    return arr.includes('RECRUITER', 0)
  },
  // 是否拥有BD角色
  isBD () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.roles.includes('BD', 0)
  },
  // 是否拥有BD角色
  isBDInArray (arr) {
    return arr.includes('BD', 0)
  },
  // 是否是全职
  isFulltimeJobType () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.jobType === 'FULLTIME'
  },
  // 是否是兼职
  isParttimeJobType () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.jobType === 'PARTTIME'
  },
  // 是否是外包员工
  isConsultantJobType () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.jobType === 'CONSULTANT'
  },
  // 是否是体验员工
  isExperienceJobType () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.jobType === 'EXPERIENCE'
  },
  // 获取当前用户工作类型
  getJobType () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.jobType
  },
  // 获取当前用户名
  getUserName () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.username
  },
  // 是否拥有某个角色
  hasRole (role) {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    let index = loginInfo['roleList'].length
    while (index > 0) {
      index = index - 1
      if (loginInfo['roleList'][index] === role) {
        return true
      }
    }
    return false
  },
  // 获取当前登录用户
  getUser () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    let user = {
      'id': loginInfo.id,
      'userName': loginInfo.username,
      'realName': loginInfo.realname
    }
    return user
  },
  getStorageContent (key, defaultValue) {
    if (typeof (window.localStorage[key]) === 'undefined') {
      return typeof (defaultValue) === 'undefined' ? '' : defaultValue
    } else {
      return window.localStorage[key]
    }
  },
  setStorageContent (key, value) {
    window.localStorage[key] = value
  },
  // 获取本地存储对象，如果没有key，返回空对象
  getStorageContentObject (key) {
    if (typeof (window.localStorage[key]) === 'undefined' || window.localStorage[key] === 'undefined') {
      return {}
    } else {
      return JSON.parse(window.localStorage[key])
    }
  },
  // 获取本地存储对象，如果没有key，返回默认值
  getStorageContentObjectDefault (key, defaultValue) {
    if (typeof (window.localStorage[key]) === 'undefined' || window.localStorage[key] === 'undefined') {
      return defaultValue
    } else {
      return JSON.parse(window.localStorage[key])
    }
  },
  getPageNumber (pageNumber) {
    if (typeof (window.localStorage[pageNumber]) === 'undefined') {
      return 1
    } else {
      return Number(window.localStorage[pageNumber])
    }
  },
  getPageSize (pageSize) {
    if (typeof (window.localStorage[pageSize]) === 'undefined') {
      return 10
    } else {
      return Number(window.localStorage[pageSize])
    }
  },
  // 获取YYYY-MM-dd格式的年月日
  getYYYY_MM_dd (d) {
    if (typeof (d) === 'object') {
      let year = d.getFullYear()
      let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
      let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      return year + '-' + month + '-' + day
    } else {
      return ''
    }
  },
  // 获取YYYY-MM格式的年月
  getYYYY_MM (d) {
    if (typeof (d) === 'object') {
      let year = d.getFullYear()
      let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
      return year + '-' + month
    } else {
      return ''
    }
  },
  // 日期字符串格式化
  timeStrFormate1 (d) {
    if (d !== null && d !== '') {
      return d.substr(0, 19).replace('T', ' ')
    } else {
      return ''
    }
  },
  // 从公司编码转公司名称
  getCompanyName (code) {
    for (let c of this.companyList) {
      if (c[code] === code) {
        return c[name]
      }
    }
    return ''
  },
  // 工资卡银行
  banks: [{
    code: 'ICBC',
    name: '工商银行'
  },
  {
    code: 'ABC',
    name: '农业银行'
  },
  {
    code: 'CMB',
    name: '招商银行'
  },
  {
    code: 'CCB',
    name: '建设银行'
  },
  {
    code: 'BCM',
    name: '交通银行'
  },
  {
    code: 'PAB',
    name: '平安银行'
  },
  {
    code: 'CEB',
    name: '光大银行'
  },
  {
    code: 'BOC',
    name: '中国银行'
  },
  {
    code: 'SPDB',
    name: '浦发银行'
  },
  {
    code: 'CITIC',
    name: '中信银行'
  },
  {
    code: 'BOS',
    name: '上海银行'
  },
  {
    code: 'CMBC',
    name: '民生银行'
  },
  {
    code: 'CIB',
    name: '兴业银行'
  },
  {
    code: 'HB',
    name: '华夏银行'
  }
  ],
  // 性别
  genders: [{
    code: 'MALE',
    describe: '男'
  }, {
    code: 'FEMALE',
    describe: '女'
  }],
  // 是否列表
  yesOrNoList: [{
    code: 'YES',
    name: '是'
  }, {
    code: 'NO',
    name: '否'
  }],
  // 公司列表
  companyList: [{
    code: 'Shanghaihailuorencaifuwu',
    name: '上海海罗人才服务有限公司'
  },
  {
    code: 'Shanghaihailuorencaikeji',
    name: '上海海罗人才科技有限公司'
  },
  {
    code: 'Shenyanghailuorencaifuwu',
    name: '沈阳海罗人才服务有限公司'
  },
  {
    code: 'Nanjinghailuorencaifuwu',
    name: '南京海罗人才服务有限公司'
  },
  {
    code: 'Wuhanhailuorencaifuwu',
    name: '武汉海罗河山人才服务有限公司'
  }
  ],
  locationList: [{
    code: 'Shanghai',
    name: '上海'
  }, {
    code: 'Beijing',
    name: '北京'
  }, {
    code: 'Shenyang',
    name: '沈阳'
  }, {
    code: 'Nanjing',
    name: '南京'
  }, {
    code: 'Wuhan',
    name: '武汉'
  }, {
    code: 'Enshi',
    name: '恩施'
  }],
  approveStatusList: [{
    code: 'Apply',
    name: 'Apply'
  }, {
    code: 'Approved',
    name: 'Approved'
  }, {
    code: 'Denied',
    name: 'Denied'
  }],
  typeList: [{
    code: 'Transportation',
    name: '交通'
  }, {
    code: 'Travel',
    name: '差旅'
  }, {
    code: 'Communication',
    name: '通讯'
  }, {
    code: 'Office',
    name: '办公'
  }, {
    code: 'Service',
    name: '服务'
  }, {
    code: 'Recruit',
    name: '招聘'
  }, {
    code: 'Other',
    name: '其他'
  }],
  transportationKindList: [{
    code: 'Parking',
    name: '停车费'
  },
  {
    code: 'InternalAirTicket',
    name: '国内机票'
  },
  {
    code: 'InternalTrainTicket',
    name: '国内高铁/火车'
  },
  {
    code: 'TaxiSubway',
    name: '出租车/地铁/其他市内交通'
  },
  {
    code: 'DriveTheFare',
    name: '自驾车费'
  },
  {
    code: 'NationalAirTicket',
    name: '国际机票'
  }
  ],
  travelKindList: [{
    code: 'TravelHotel',
    name: '差旅住宿费'
  },
  {
    code: 'TravelMeal',
    name: '差旅餐饭'
  }
  ],
  communicationKindList: [{
    code: 'Communication',
    name: '通讯费'
  }],
  officeKindList: [{
    code: 'OfficeRent',
    name: '办公室租金'
  }, {
    code: 'Training',
    name: '培训费'
  }, {
    code: 'Print',
    name: '打印费'
  },
  {
    code: 'Tool',
    name: '文具费'
  }, {
    code: 'Postage',
    name: '快递费'
  }, {
    code: 'Drug',
    name: '药品'
  },
  {
    code: 'ITFee',
    name: 'IT费用'
  }
  ],
  serviceKindList: [{
    code: 'Candidate',
    name: '候选人招待费'
  }, {
    code: 'Client',
    name: '客户招待费'
  },
  {
    code: 'Employee',
    name: '员工内部招待费'
  }, {
    code: 'Consultant',
    name: '外包员工招待费'
  },
  {
    code: 'BodyCheck',
    name: '体检费'
  }
  ],
  recruitKindList: [{
    code: 'Recruit',
    name: '招聘费'
  }],
  otherKindList: [{
    code: 'InsuranceAndHousefund',
    name: '五险一金'
  },
  {
    code: 'Insurance',
    name: '各类保险'
  }, {
    code: 'Tax',
    name: '各类税收'
  }, {
    code: 'Other',
    name: '其他'
  }
  ],
  // 报销是否需要支付
  reimbursementNeedPay: [{
    code: 'YES',
    name: '是'
  }, {
    code: 'NO',
    name: '否'
  }, {
    code: 'BANK',
    name: '银行'
  }],
  notMatchReasonList: [{
    code: 'NO',
    name: '无'
  }, {
    code: 'LANGUAGE',
    name: '语言'
  }, {
    code: 'LOCATION',
    name: '地点'
  }, {
    code: 'PACKAGE',
    name: '薪资'
  }, {
    code: 'ABILITY',
    name: '能力'
  }, {
    code: 'EDUCATION_BACKGROUND',
    name: '学历'
  }, {
    code: 'AGE',
    name: '年龄'
  }, {
    code: 'LEVEL',
    name: '级别'
  }, {
    code: 'NOCONSIDER',
    name: '不考虑'
  }, {
    code: 'OTHER',
    name: '其他'
  }],
  jobTypeList: [{
    code: 'FULLTIME',
    name: '全职'
  }, {
    code: 'PARTTIME',
    name: '兼职'
  }, {
    code: 'INTERN',
    name: '实习'
  }, {
    code: 'CONSULTANT',
    name: '外包'
  }, {
    code: 'EXPERIENCE',
    name: '体验'
  }],
  formatTime (val) {
    if (typeof (val) !== 'undefined' && val !== null && val !== '') {
      return val.replace('T', ' ')
    }
    return ''
  },
  formatTimeToyyyyMMddHHmm (val) {
    if (typeof (val) !== 'undefined' && val !== null && val !== '') {
      return val.replace('T', ' ').substr(0, 16)
    }
    return ''
  },
  dateRegExp: new RegExp('/^\\d{4}\\-\\d{2}\\-\\d{2}$/'),
  constellations: [{
    code: 'SHUIPING',
    name: '水瓶'
  }, {
    code: 'SHUANGYU',
    name: '双鱼'
  }, {
    code: 'BAIYANG',
    name: '白羊'
  }, {
    code: 'JINNIU',
    name: '金牛'
  }, {
    code: 'SHUANGZI',
    name: '双子'
  },
  {
    code: 'JUXIE',
    name: '巨蟹'
  },
  {
    code: 'SHIZI',
    name: '狮子'
  },
  {
    code: 'CHUNV',
    name: '处女'
  },
  {
    code: 'TIANPING',
    name: '天平'
  },
  {
    code: 'TIANXIE',
    name: '天蝎'
  },
  {
    code: 'SHESHOU',
    name: '射手'
  },
  {
    code: 'MOJIE',
    name: '摩羯'
  }
  ],
  phaseOptions: [{
    value: 'SL',
    lable: 'SL'
  },
  {
    value: 'TI',
    lable: 'TI'
  },
  {
    value: 'VI',
    lable: 'VI'
  },
  {
    value: 'IOI',
    lable: 'IOI'
  },
  {
    value: 'CVO',
    lable: 'CVO'
  },
  {
    value: '1st Interview',
    lable: '1st Interview'
  },
  {
    value: '2nd Interview',
    lable: '2nd Interview'
  },
  {
    value: '3rd Interview',
    lable: '3rd Interview'
  },
  {
    value: '4th Interview',
    lable: '4th Interview'
  },
  {
    value: '5th Interview',
    lable: '5th Interview'
  },
  {
    value: '6th Interview',
    lable: '6th Interview'
  },
  {
    value: 'CF',
    lable: 'CF'
  },
  {
    value: 'Offer Signed',
    lable: 'Offer Signed'
  },
  {
    value: 'On Board',
    lable: 'On Board'
  },
  {
    value: 'Pre. Service',
    lable: 'Pre. Service'
  },
  {
    value: 'On Service',
    lable: 'On Service'
  },
  {
    value: 'Week Service',
    lable: 'Week Service'
  },
  {
    value: 'Month Service',
    lable: 'Month Service'
  },
  {
    value: '2Month Service',
    lable: '2Month Service'
  },
  {
    value: '3Month Service',
    lable: '3Month Service'
  },
  {
    value: '4Month Service',
    lable: '4Month Service'
  },
  {
    value: '5Month Service',
    lable: '5Month Service'
  },
  {
    value: '6Month Service',
    lable: '6Month Service'
  },
  {
    value: 'Turndown Offer',
    lable: 'Turndown Offer'
  },
  {
    value: 'Period Failed',
    lable: 'Period Failed'
  },
  {
    value: 'END',
    lable: 'END'
  }
  ]
}
