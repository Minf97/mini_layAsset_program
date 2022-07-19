const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 使用indexof方法实现模糊查询
 * @param  {Array}  list     进行查询的数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
const fuzzyQuery = (list, keyWord) => {
  var arr = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].indexOf(keyWord) >= 0) {
      arr.push(list[i]);
    }
  }
  return arr;
}
module.exports = {
  formatTime,
  fuzzyQuery
}
