export const progressDataSource = [
  {
    projectSysNo: 1,
    projectSysName: '项目1',
    processPlanName: '节点1',
    actualEndTime: '2019-04-02',
    actualStartTime: '2018-02-15',
    actuallyFinishTime: null,
    description: '提前结束',
    name: '项目节点1',
    planEndTime: '2019-05-15',
    planFinishDays: 100,
    planStartTime: '2018-02-15',
    status: 2,
    delayDays: 0
  },
  {
    projectSysNo: 1,
    projectSysName: '项目1',
    processPlanName: '节点2',
    actualEndTime: '2019-04-02',
    actualStartTime: '2018-10-10',
    actuallyFinishTime: null,
    description: '提前结束',
    name: '项目节点2',
    planEndTime: '2019-05-15',
    planFinishDays: 100,
    planStartTime: '2018-09-15',
    status: 2,
    delayDays: 0
  },
  {
    projectSysNo: 1,
    projectSysName: '项目1',
    processPlanName: '节点2',
    actualEndTime: null,
    actualStartTime: '2018-10-10',
    actuallyFinishTime: null,
    description: '进行中已延期',
    name: '项目节点3',
    planEndTime: '2019-05-15',
    planFinishDays: 100,
    planStartTime: '2018-04-15',
    status: 1,
    delayDays: 30
  },
  {
    projectSysNo: 1,
    projectSysName: '项目1',
    processPlanName: '节点2',
    actualEndTime: null,
    actualStartTime: '2018-12-10',
    actuallyFinishTime: null,
    description: '提前开始进行中',
    name: '项目节点4',
    planEndTime: '2019-8-15',
    planFinishDays: 100,
    planStartTime: '2018-12-15',
    status: 1,
    delayDays: 0
  },
  {
    projectSysNo: 1,
    projectSysName: '项目1',
    processPlanName: '节点5',
    actualEndTime: null,
    actualStartTime: '2018-10-10',
    actuallyFinishTime: null,
    description: '进行中',
    name: '项目节点5',
    planEndTime: '2019-9-15',
    planFinishDays: 100,
    planStartTime: '2018-03-15',
    status: 1,
    delayDays: 0
  },
  {
    projectSysNo: 1,
    projectSysName: '项目1',
    processPlanName: '节点5',
    actualEndTime: null,
    actualStartTime: null,
    actuallyFinishTime: null,
    description: '已延期',
    name: '项目节点5',
    planEndTime: '2019-10-15',
    planFinishDays: 100,
    planStartTime: '2018-07-15',
    status: 0,
    delayDays: 40
  },
  {
    projectSysNo: 2,
    projectSysName: '项目2',
    processPlanName: '节点1',
    actualEndTime: '2019-04-02',
    actualStartTime: '2018-02-15',
    actuallyFinishTime: null,
    description: '提前结束',
    name: '项目2节点1',
    planEndTime: '2019-05-15',
    planFinishDays: 100,
    planStartTime: '2018-02-15',
    status: 2
  },
  {
    projectSysNo: 2,
    projectSysName: '项目2',
    processPlanName: '节点2',
    actualEndTime: null,
    actualStartTime: '2018-10-10',
    actuallyFinishTime: null,
    description: '进行中',
    name: '项目2节点2',
    planEndTime: '2019-10-15',
    planFinishDays: 100,
    planStartTime: '2018-03-15',
    status: 1,
    delayDays: 0
  },
  {
    projectSysNo: 2,
    projectSysName: '项目2',
    processPlanName: '节点3',
    actualEndTime: null,
    actualStartTime: '2018-12-10',
    actuallyFinishTime: null,
    description: '提前开始已延期',
    name: '项目2节点3',
    planEndTime: '2019-6-15',
    planFinishDays: 100,
    planStartTime: '2019-03-15',
    status: 1,
    delayDays: 20
  },
  {
    projectSysNo: 2,
    projectSysName: '项目2',
    processPlanName: '节点3',
    actualEndTime: null,
    actualStartTime: '2018-10-10',
    actuallyFinishTime: null,
    description: '进行中',
    name: '项目2节点4',
    planEndTime: '2019-10-15',
    planFinishDays: 100,
    planStartTime: '2018-09-15',
    status: 1,
    delayDays: 0
  }
]

export const imgListDataSource = [
  {
    type: 'img',
    uri: require('@/assets/image/bg.jpg'),
    poster: '',
    title: '',
    desc: ''
  },
  {
    type: 'img',
    uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565084670719&di=f3ed73d3eb1a811e95eb6fb2779a6eb7&imgtype=0&src=http%3A%2F%2Fimg.smzy.com%2FSoft%2FUploadPic%2F2015-9%2F20159816584522855.jpg',
    poster: '',
    title: '',
    desc: ''
  },
  {
    type: 'img',
    uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565084670847&di=a41be477467105bc7f37abbe83e440df&imgtype=0&src=http%3A%2F%2Fpic61.nipic.com%2Ffile%2F20150228%2F6116345_172034157715_2.jpg',
    poster: '',
    title: '',
    desc: ''
  },
  {
    type: 'img',
    uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565084671012&di=669a2d0e38e4263864989f95d64927a1&imgtype=0&src=http%3A%2F%2Fimg1.juimg.com%2F140925%2F330751-1409250T02556.jpg',
    poster: '',
    title: '',
    desc: ''
  },
  {
    type: 'video',
    uri: 'https://vdn.vzuu.com/SD/27f0b226-b686-11e9-9ef9-0a580a45c66b.mp4?disable_local_cache=1&bu=com&expiration=1565078609&auth_key=1565078609-0-0-1fd8a6cb74ec11c714c79ccfdcd646b2&f=mp4&v=ali',
    poster: '',
    title: '',
    desc: ''
  }
]

export const imgDataSource = [
  {
    uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565255209829&di=daa606c77f5c5bdc738d7784f7af9cab&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150615%2Fmp18846150_1434335245047_4.jpeg',
    title: '',
  },
  {
    uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565255209827&di=fc8c798428db2912700d63f616c805b9&imgtype=0&src=http%3A%2F%2Fpicuser.city8.com%2Fnews%2Fimage%2F20141025%2FU10521P1274DT20141024134333.png',
    title: '',
  },
  {
    uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565255209893&di=c4f1b59e0fe113f294b08bcda1dc9662&imgtype=0&src=http%3A%2F%2Fgongyi.sinaimg.cn%2Fgreenlife%2F2010-12-31%2FU3511P650T3D23118F158DT20101231112640.jpg',
    title: '',
  },
  {
    uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565255269509&di=1546bbe60384b87d8f41ec6cf1176669&imgtype=0&src=http%3A%2F%2Fimages.ofweek.com%2FUpload%2FNews%2F2017-10%2F12%2Ffindus%2F1507774738589072696.jpg',
    title: '',
  },
]