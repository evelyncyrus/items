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
  this.root = obj.goal || '',
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
        par.removeChild(node),nMask.hide(), fn && fn();
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