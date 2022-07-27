// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  var data;
  console.log(event);
  switch (event.type) {
    case 'login':
      data = await login(event);
      break;
    case 'index_readNew':
      data = await index_readNew(event);
      break;
    case 'myself_readMyPub':
      data = await myself_readMyPub(event);
      break;
    case 'myself_readApplication':
      data = await myself_readApplication(event);
      break;
    case 'publish':
      data = await publish(event);
      break;
    case 'ceshi':
      data = await ceshi(event);
      break;
    case 'readMark':
      data = await readMark(event);
      break;
    case 'delCard':
      data = await delCard(event);
      break;
    case 'search':
      data = await search(event);
      break;
      case 'search_2':
      data = await search_2(event);
      break;
    case 'readall':
      data = await readall(event);
      break;
    case 'shenpi':
      data = await shenpi(event);
      break;
      case 'shenpi2':
      data = await shenpi2(event);
      break;
  }
  return data;
}
// 我的信息页面，审批
async function shenpi(event) {
  let _id = event._id
  try {
    return await db.collection('cards').where({
      _id: _id
    }).update({
      data: {
        success: true
      }
    })
  } catch (error) {
    console.log(error);
  }
}
async function shenpi2(event) {
  let _id = event._id
  try {
    return await db.collection('cards').where({
      _id: _id
    }).update({
      data: {
        success: false
      }
    })
  } catch (error) {
    console.log(error);
  }
}
async function search_2(event) {
  let arr = event.arr;
  let obj = {};
  arr.forEach((item,index) => {
    obj[`value${index}`] = item
  })
  console.log(arr);
  try {

    return await db.collection('cards').where(_.or([
      {
        num: obj["value1"] || obj["value2"] || obj["value3"] || obj["value4"] || obj["value5"]
      }, 
      {
        name: obj["value1"] || obj["value2"] || obj["value3"] || obj["value4"] || obj["value5"]
      }, {
        catagory: obj["value1"] || obj["value2"] || obj["value3"] || obj["value4"] || obj["value5"]
      }, {
        partment: obj["value1"] || obj["value2"] || obj["value3"] || obj["value4"] || obj["value5"]
      },
      {
        Usepartment: obj["value1"] || obj["value2"] || obj["value3"] || obj["value4"] || obj["value5"]
      }, {
        date: obj["value1"] || obj["value2"] || obj["value3"] || obj["value4"] || obj["value5"]
      }, {
        funcStation: obj["value1"] || obj["value2"] || obj["value3"] || obj["value4"] || obj["value5"]
      },
    ])).get()

  } catch (error) {
    console.log(error);
  }
}
async function search(event) {
  let value = event.value
  console.log(value);
  try {
    return await db.collection('cards').where(_.or([
      {
        num: db.RegExp({
          regexp: value,
          options: 'i'
        })
      }, {
        name: db.RegExp({
          regexp: value,
          options: 'i'
        })
      }, {
        catagory: db.RegExp({
          regexp: value,
          options: 'i'
        })
      }, {
        partment: db.RegExp({
          regexp: value,
          options: 'i'
        })
      },
      {
        Usepartment: db.RegExp({
          regexp: value,
          options: 'i'
        })
      }, {
        date: db.RegExp({
          regexp: value,
          options: 'i'
        })
      }, {
        funcStation: db.RegExp({
          regexp: value,
          options: 'i'
        })
      },
    ])).get()

  } catch (error) {
    console.log(error);
  }
}
async function readMark(event) {
  let obj = event.obj
  try {
    return await db.collection('user').where({
      username: obj.username
    }).get()

  } catch (error) {
    console.log(error);
  }
}
async function login(event) {
  let obj = event.obj
  try {
    let data1 = await db.collection('user').where({
      username: _.eq(obj.username)
    }).get()
    console.log(data1);
    if (data1.data.length == 0) {
      await db.collection('user').add({
        data: {
          ...obj
        }
      })
      return '注册成功'
    }

    if (data1.data[0].password == obj.password && data1.data[0].nickname == obj.nickname) {
      return '登录成功'
    } else {
      return '用户名或密码错误'
    }

  } catch (error) {
    console.log(error);
  }
}
async function ceshi(event) {
  console.log(123);
  try {
    return await db.collection('args').field({
      '_createTime': false,
      '_updateTime': false,
      '_id': false
    }).get()
  } catch (error) {
    console.log(error);
  }
}
// 分页读
async function index_readNew(event) {
  console.log('readread');
  var skipPage = event.currentPage * 10;
  try {
    return await db.collection('cards').where({
      success: true
    }).field({
      '_createTime': false,
      '_updateTime': false,
      '_id': false
    }).orderBy('_createTime', 'desc').skip(skipPage).limit(10).get()
  } catch (error) {
    console.log(error);
  }
}
async function readall(event) {
  console.log('readall');
  try {
    return await db.collection('cards').where({
      success: true
    }).field({
      '_createTime': false,
      '_updateTime': false,
      '_id': false
    }).orderBy('_createTime', 'desc').get()
  } catch (error) {
    console.log(error);
  }
}
async function myself_readMyPub(event) {
  let obj = event.obj
  try {
    return await db.collection('cards').where({
      username: obj.username,
      success: true
    }).get()
  } catch (error) {
    console.log(error);
  }
}

async function myself_readApplication(event) {
  let obj = event.obj
  try {
    return await db.collection('cards').where({
      username: obj.username,
      success: false
    }).get()
  } catch (error) {
    console.log(error);
  }
}

async function publish(event) {
  var obj = event.obj;
  console.log('publish');
  try {
    let data1 = await db.collection('user').where({
      username: obj.username
    }).update({
      data: {
        mark: _.inc(10)
      }
    })
    console.log(data1);
    return await db.collection('cards').add({
      data: {
        ...obj
      }
    })
  } catch (error) {
    console.log(error);
  }
}

async function delCard(event) {
  var _id = event._id;
  console.log('delCard');
  try {
    return await db.collection('cards').where({
      _id: _id
    }).remove()
  } catch (error) {
    console.log(error);
  }
}