import { pinyin } from './pyconst.js'
export default {
  initialLetter: function (word) {
    const pinyin = this.chineseToPinYin(word)
    // let SX = ''
    // for (var i = 0; i < pinyin.length; i++) {
    //   var c = pinyin.charAt(i)
    //   if (/^[A-Z]+$/.test(c)) {
    //     SX += c
    //   }
    // }
    return pinyin
  },
  chineseToPinYin: function (l1) {
    var l2 = l1.length
    var I1 = ''
    var reg = new RegExp('[a-zA-Z0-9]')

    for (var i = 0; i < l2; i++) {
      var val = l1.substr(i, 1)
      var name = this.arraySearch(val, pinyin)
      if (reg.test(val)) {
        // console.log('letter number:', val)
        I1 += val
        // console.log('I1:', I1)
      } else if (name !== false) {
        // console.log('chinese number:', name)
        let SX = ''
        for (var j = 0; j < name.length; j++) {
          var c = name.charAt(j)
          if (/^[A-Z]+$/.test(c)) {
            SX += c
          }
        }
        I1 += SX
        // console.log('I1:', I1)
      }
    }
    I1 = I1.replace(/ /g, '-')
    while (I1.indexOf('--') > 0) {
      I1 = I1.replace('--', '-')
    }
    return I1
  },
  arraySearch: function (l1, l2) {
    for (var name in l2) {
      if (l2[name].indexOf(l1) !== -1) {
        return this.ucfirst(name)
      }
    }
    return false
  },
  ucfirst: function (l1) {
    if (l1.length > 0) {
      var first = l1.substr(0, 1).toUpperCase()
      var spare = l1.substr(1, l1.length)
      return first + spare
    }
  },
}
