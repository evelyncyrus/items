/**
 * created by evelyncyrus at 2016.09.19
 * @popup module
 *
 *
 * use demo:
 *    var dom = document.getElementById('btnPopup');
 *    dom.onclick = function() {
 *      var obj = [];
 *      obj.goal = document;
 *      obj.interval = 6000;
 *      obj.txt = '哈哈哈哈,笑呀哈哈哈哈！';
 *      obj.url = '';
 *      obj.fun = function() {
 *        alert(1);
 *      }
 *      var aPopup = new createPopup(obj);
 *      aPopup.confirm(obj);
 *    }
 */
function createPopup(obj) {
  this.time = obj.interval || 3000,
    this.root = obj.goal || document,
    this.url = obj.url || '../img/warn.svg',
    this.txt = obj.txt || '',
    this.body = this.root.body || '',
    this.cancelBtn = obj.cancelInfo || '取消',
    this.confirmBtn = obj.confirmInfo || '确定',
    this.fun = obj.fun || '',
    this.alert = function(obj) { //alert fun
      var par = this.body;
      var fn = this.fun;
      var nMask = this.mask();
      var node = this.root.createElement('section'),
        dom = '<p><em><img src="' + this.url + '" alt=""></em><strong>' + this.txt + '</strong></p>',
        pop = par.getElementsByClassName('popup');
      if(pop.length < 1) {
        nMask.show(), //mask show
          node.className = 'popup popup-alert',
          node.innerHTML = dom,
          par.appendChild(node);
        setTimeout(function() {
          par.removeChild(node), nMask.hide(), fn && fn();
        }, this.time);
      } else {
        return false;
      }
    },
    this.confirm = function(obj) {
      var nMask = this.mask();
      var par = this.body;
      var fn = this.fun;
      var node = this.root.createElement('section');
      var dom = '<p><em><img src="' + this.url + ' " alt=""></em><strong>' + this.txt + '</strong></p><a class="popup-confirm-cancel" href="javascript:void(0);">' + this.cancelBtn + '</a><a class="popup-confirm-confirm" href="javascript: void(0);">' + this.confirmBtn + '</a>';
      nMask.show(), // mask show
        node.className = 'popup popup-confirm',
        node.innerHTML = dom,
        par.appendChild(node),
        node.onclick = function(e) {
          var item = e.target;
          var goal = item.className.toLowerCase();
          if(goal === 'popup-confirm-cancel') {
            par.removeChild(node), nMask.hide();
          } else if(goal === 'popup-confirm-confirm') {
            par.removeChild(node), nMask.hide(), fn && fn();
          }
        };
    },
    this.mask = function() {
      var par = this.body;
      var node = this.root.createElement('div');
      return node.className = 'mask', par.appendChild(node), {
        show: function() {
          node.style.display = 'block';
        },
        hide: function() {
          node.style.display = 'none';
          par.removeChild(node);
        }
      }
    };
}

//sign页面公用js,依赖于jquery及dailog.js

// use demo:

function signPost(inn) {
  var that = this;
  this.data = inn.data || '';    // post的数据
  this.flag = inn.flag || true;  // 表单是否填写完整
  this.svg = inn.svg || 'static/img/warm.svg';  // 提醒icon
  this.url = inn.url || '';      // post地址
  this.link = inn.link || '';    // 返回成功后跳转地址
  this.role = inn.role || '';    // 'signin' or 'signup'
  this.fun = inn.fun || '';      // alert之后的回调函数
  this.fullfill = function() {   // 表单是否填写完整逻辑
    var obj = [];                // createPopup函数的参数
    obj.url = that.svg;
    var len = that.data.length;
    for(var i = 0; i < len; i++) {
      that.flag = that.data[i].value == '' ? false : true
    }
    if(that.flag == false) {
      obj.txt = '请将信息填写完整';
      var aPopup = new createPopup(obj);
      aPopup.alert();
      return false;
    } else {
      that.post();
      return false;
    }
  },
  this.post = function() {        // 表单提交逻辑
    $.post(that.url, that.data, that.callback);
  },
  this.callback = function(res) { // post的回调函数
    var obj = [];
    obj.url = that.svg;
    obj.txt = res.msg;
    if(that.role == 'signin') {
    } else {
      obj.fun = that.fun;
    }
    if(res.code === 1) {         // 返回成功
      alert('成功!');
      window.location.href = that.link;
      return false;
    } else if(res.code === 2) {  // 返回状态码为2
      var bPopup = new createPopup(obj);
      bPopup.alert();
      return false;
    } else {                    // 返回状态码为3
      if(that.role == 'signin') obj.fun = that.fun;
      var cPopup = new createPopup(obj);
      cPopup.alert();
      return false;
    }
  }
  this.fullfill();
}