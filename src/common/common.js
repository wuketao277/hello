export default {
  // 前端版本
  version: '1.2.2',
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
  ],
  // 获取关键词数组在原文中最早出现的位置
  getMinPosition (source, keyWords) {
    // 默认值
    let position = -1
    // 遍历所有关键词，找到最早出现的位置
    for (let index in keyWords) {
      let word = keyWords[index]
      let tempP = source.indexOf(word)
      if (tempP != -1) {
        if (position == -1) {
          position = tempP
        } else if (tempP > -1 && tempP < position) {
          position = tempP
        }
      }
    }
    return position
  },
  // 获取关键词数组在原文中最早出现的结束位置
  getStrEndPosition (source, keyWords) {
    // 默认值
    let position = -1
    // 遍历所有关键词，找到最早出现的位置
    for (let index in keyWords) {
      let tempP = source.indexOf(keyWords[index])
      if (tempP != -1) {
        let tempPend = tempP + keyWords[index].length + 1
        if (position == -1) {
          position = tempPend
          break
        }
      }
    }
    return position
  },
  // 获取数组在keyWords中最早出现的位置
  getFirstIndexForArray (arr, keyWords) {
    let position = -1
    for (let i = 0; i < arr.length; i++) {
      if (keyWords.includes(arr[i])) {
        return i
      }
    }
    return position
  },
  // 判断一个字符串是否为空
  strIsBlank (str) {
    if (str == null || str.length == 0 || str.trim() == '') {
      return true
    } else {
      return false
    }
  },
  // 从字符串中提取手机号
  getPhoneNoFromStr (str) {
    let phoneNoList = str.match(/(\+?86)?1[3-9]\d{9}/)
    let phoneNoList2 = str.match(/(\+?86)?1\d{2} \d{4} \d{4}/)
    if (phoneNoList != null && phoneNoList.length > 0) {
      return phoneNoList[0]
    } else if (phoneNoList2 != null && phoneNoList2.length > 0) {
      return phoneNoList2[0].replaceAll(' ', '')
    } else {
      return ''
    }
  },
  // 从字符串中提取邮箱
  getEmailFromStr (str) {
    let emailList = str.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/)
    if (emailList != null && emailList.length > 0) {
      return emailList[0]
    } else {
      return ''
    }
  },
  // 从字符串中获取英文等级
  getEnglishLevelFromStr (str) {
    if (str.includes('CET-6')) {
      return 'CET-6'
    } else if (str.includes('CET6')) {
      return 'CET6'
    } else if (str.includes('cet-6')) {
      return 'cet-6'
    } else if (str.includes('cet6')) {
      return 'cet6'
    } else if (str.includes('CET-4')) {
      return 'CET-4'
    } else if (str.includes('CET4')) {
      return 'CET4'
    } else if (str.includes('cet-4')) {
      return 'cet-4'
    } else if (str.includes('cet4')) {
      return 'cet4'
    }
  },
  // 所有省市名称
  provinceAndCityName: ['河北', '山西', '内蒙古自治区', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西壮族自治区', '海南', '四川', '贵州', '云南', '西藏自治区', '陕西', '甘肃', '青海', '北京', '天津', '上海', '重庆', '石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水', '太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁', '呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛', '长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '哈尔滨', '齐齐哈尔', '鸡西', '鹤岗', '双鸭山', '大庆', '伊春', '佳木斯', '七台河', '牡丹江', '黑河', '绥化', '南京', '无锡', '徐州', '常州', '苏州', '南通', '连云港', '淮安', '盐城', '扬州', '镇江', '泰州', '宿迁', '杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水', '合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '阜阳', '宿州', '滁州', '六安', '宣城', '池州', '亳州', '福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德', '南昌', '景德镇', '萍乡', '九江', '抚州', '鹰潭', '赣州', '吉安', '宜春', '新余', '上饶', '济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '临沂', '德州', '聊城', '滨州', '菏泽', '郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店', '武汉', '黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州', '长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '广州', '韶关', '深圳', '珠海', '汕头', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮', '南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左', '海口', '三亚', '三沙', '儋州', '成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '贵阳', '六盘水', '遵义', '安顺', '毕节', '铜仁', '昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '拉萨', '日喀则', '昌都', '林芝', '山南', '那曲', '西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛', '兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '张掖', '平凉', '酒泉', '庆阳', '定西', '陇南', '西宁', '海东', '银川', '石嘴山', '吴忠', '固原', '中卫', '乌鲁木齐', '克拉玛依', '吐鲁番', '哈密'],
  // 985院校名称
  school985: ["中国科学技术大学", "清华大学", "北京大学", "中国人民大学", "北京航空航天大学", "北京师范大学", "北京理工大学", "中国农业大学", "中央民族大学", "厦门大学", "兰州大学", "中山大学", "华南理工大学", "哈尔滨工业大学", "武汉大学", "华中科技大学", "中南大学", "湖南大学", "国防科技大学", "吉林大学", "南京大学", "东南大学", "大连理工大学", "东北大学", "山东大学", "中国海洋大学", "西安交通大学", "西北工业大学", "西北农林科技大学", "复旦大学", "上海交通大学", "同济大学", "华东师范大学", "四川大学", "电子科技大学", "南开大学", "天津大学", "浙江大学", "重庆大学"],
  // 211院校名称
  school211: ["清华大学", "北京大学", "中国人民大学", "北京航空航天大学", "北京师范大学", "中国农业大学", "北京理工大学", "中央民族大学", "北京交通大学", "北京工业大学", "北京科技大学", "北京化工大学", "北京邮电大学", "北京林业大学", "中国传媒大学", "中央音乐学院", "对外经济贸易大学", "北京中医药大学", "北京外国语大学", "中国地质大学（北京）", "中国矿业大学（北京）", "中国石油大学（北京）", "中国政法大学", "中央财经大学", "华北电力大学", "北京体育大学", "南京大学", "东南大学", "南京农业大学", "南京航空航天大学", "中国矿业大学", "中国药科大学", "河海大学", "南京师范大学", "南京理工大学", "苏州大学", "江南大学", "复旦大学", "上海交通大学", "同济大学", "华东师范大学", "东华大学", "上海大学", "中国人民解放军海军军医大学（第二军医大学）", "上海财经大学", "上海外国语大学", "华东理工大学", "西安交通大学", "西北工业大学", "西北农林科技大学", "中国人民解放军空军军医大学（第四军医大学）", "陕西师范大学", "西安电子科技大学", "西北大学", "长安大学", "武汉大学", "华中科技大学", "中国地质大学（武汉）", "华中农业大学", "华中师范大学", "武汉理工大学", "中南财经政法大学", "四川大学", "电子科技大学", "西南交通大学", "西南财经大学", "四川农业大学", "哈尔滨工业大学", "哈尔滨工程大学", "东北农业大学", "东北林业大学", "中山大学", "华南理工大学", "华南师范大学", "暨南大学", "湖南大学", "中南大学", "国防科技大学", "湖南师范大学", "南开大学", "天津大学", "天津医科大学", "河北工业大学", "大连理工大学", "东北大学", "辽宁大学", "大连海事大学", "吉林大学", "东北师范大学", "延边大学", "中国科学技术大学", "合肥工业大学", "安徽大学", "山东大学", "中国海洋大学", "中国石油大学（华东）", "重庆大学", "西南大学", "厦门大学", "福州大学", "新疆大学", "石河子大学", "浙江大学", "南昌大学", "华北电力大学（保定）", "太原理工大学", "内蒙古大学", "郑州大学", "广西大学", "云南大学", "贵州大学", "兰州大学", "海南大学", "宁夏大学", "青海大学", "西藏大学"],
  // 双一流院校名称
  school11: ["北京大学", "中国人民大学", "清华大学", "北京交通大学", "北京工业大学", "北京航空航天大学", "北京理工大学", "北京科技大学", "北京化工大学", "北京邮电大学", "中国农业大学", "北京林业大学", "北京协和医学院", "北京中医药大学", "北京师范大学", "首都师范大学", "北京外国语大学", "中国传媒大学", "中央财经大学", "对外经济贸易大学", "外交学院", "中国人民公安大学", "北京体育大学", "中央音乐学院", "中国音乐学院", "中央美术学院", "中央戏剧学院", "中央民族大学", "中国政法大学", "南开大学", "天津大学", "天津工业大学", "天津医科大学", "天津中医药大学", "华北电力大学", "河北工业大学", "山西大学", "太原理工大学", "内蒙古大学", "辽宁大学", "大连理工大学", "东北大学", "大连海事大学", "吉林大学", "延边大学", "东北师范大学", "哈尔滨工业大学", "哈尔滨工程大学", "东北农业大学", "东北林业大学", "复旦大学", "同济大学", "上海交通大学", "华东理工大学", "东华大学", "上海海洋大学", "上海中医药大学", "华东师范大学", "上海外国语大学", "上海财经大学", "上海体育学院", "上海音乐学院", "上海大学", "南京大学", "苏州大学", "东南大学", "南京航空航天大学", "南京理工大学", "中国矿业大学", "南京邮电大学", "河海大学", "江南大学", "南京林业大学", "南京信息工程大学", "南京农业大学", "南京医科大学", "南京中医药大学", "中国药科大学", "南京师范大学", "浙江大学", "中国美术学院", "安徽大学", "中国科学技术大学", "合肥工业大学", "厦门大学", "福州大学", "南昌大学", "山东大学", "中国海洋大学", "中国石油大学（华东）", "郑州大学", "河南大学", "武汉大学", "华中科技大学", "中国地质大学（武汉）", "武汉理工大学", "华中农业大学", "华中师范大学", "中南财经政法大学", "湘潭大学", "湖南大学", "中南大学", "湖南师范大学", "中山大学", "暨南大学", "华南理工大学", "华南农业大学", "广州医科大学", "广州中医药大学", "华南师范大学", "海南大学", "广西大学", "四川大学", "重庆大学", "西南交通大学", "电子科技大学", "西南石油大学", "成都理工大学", "四川农业大学", "成都中医药大学", "西南大学", "西南财经大学", "贵州大学", "云南大学", "西藏大学", "西北大学", "西安交通大学", "西北工业大学", "西安电子科技大学", "长安大学", "西北农林科技大学", "陕西师范大学", "兰州大学", "青海大学", "宁夏大学", "新疆大学", "石河子大学", "中国矿业大学（北京）", "中国石油大学（北京）", "中国地质大学（北京）", "宁波大学", "南方科技大学", "上海科技大学", "中国科学院大学", "国防科技大学", "海军军医大学", "空军军医大学"],
  // 奔腾90所院校名称
  schoolBenTeng90: ['哈尔滨工业大学', '哈尔滨工程大学', '东北林业大学', '吉林大学', '东北师范大学', '东北大学', '鲁迅美术学院', '大连海事大学', '大连理工大学', '东北财经大学', '北京大学', '北京航空航天大学', '北京科技大学', '北京理工大学', '对外经济贸易大学', '清华大学', '中国人民大学', '中央财经大学', '北京邮电大学', '北京交通大学', '中国农业大学', '华北电力大学', '北京工业大学', '北京化工大学', '中国石油大学（北京）', '中国矿业大学（北京）', '中国地质大学（北京）', '中国传媒大学', '北京林业大学', '中央美术学院', '南开大学', '天津大学', '河北工业大学', '华北电力大学（保定）', '中国海洋大学', '中国石油大学（华东）', '山东大学', '东南大学', '南京大学', '南京航空航天大学', '南京理工大学', '河海大学', '南京农业大学', '南京艺术学院', '中国矿业大学', '江南大学', '苏州大学', '复旦大学', '上海财经大学', '上海交通大学', '同济大学', '华东理工大学', '上海大学', '华东师范大学', '东华大学', '太原理工大学', '郑州大学', '合肥工业大学', '安徽大学', '中国科学技术大学', '浙江大学', '中国美术学院', '西安交通大学', '西北工业大学', '长安大学', '西安电子科技大学', '西北大学', '华中科技大学', '武汉大学', '武汉理工大学', '中南财经政法大学', '中国地质大学', '中国地质大学（武汉）', '华中农业大学', '南昌大学', '景德镇陶瓷大学', '厦门大学', '福州大学', '四川大学', '西南财经大学', '西南交通大学', '电子科技大学', '重庆大学', '西南大学', '湖南大学', '中南大学', '国防科技大学', '华南理工大学', '中山大学', '暨南大学']
}
