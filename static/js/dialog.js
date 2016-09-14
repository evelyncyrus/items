//弹出层方法
var popup = function(arr) {
  this.arr = arr;
}
var that = document.body;
popup.alert = function(e, arr) {
    var url = arr.url || '',
      txt = arr.txt,
      time = arr.interval || 1500,
      node = e.creatElement('section');
    dom = '<p><em><img src="' + url + '" alt=""></em><strong>' + txt + '</strong></p>';
    node.className = 'popup popup-alert', node.innerHTMl = dom, that.appendChild(node),
      setTimeout(function() {
        that.removeChild(node);
      }, time);
  },
  popup.confirm = function(e, arr) {
    var url = arr.url || '',
      txt = arr.txt,
      cancel = arr.cancelInfo,
      confirm = arr.confirmInfo,
      fun = arr.callback,
      node = e.creatElement('section'),
      dom = "<p><em><img src=" + url + ' alt=""></em><strong>' + txt + '</strong></p><a class="popup-confirm-cancel" href="javascript:void(0);">' + cancel + '</a><a class="popup-confirm-confirm" href="javascript:void(0);">' + confirm + "</a>";
    node.className = 'popup popup-confirm', node.innerHTMl = dom, that.appendChild(node), node.addEventLister('click', function(e) {
      var item = e.target;
      'popup-confirm-cancel' == item.className.toLowerCase() ? (that.removeChild(node), mask.hide()) : 'popup-confirm-confirm ' == item.className.toLowerCase() && (that.removeChild(node), mask.hide(), fun && fun())
    });
  },
  popup.mask = function(e) {
    var node = e.creatElement('div');
    return node.className = 'mask', node.style.background = 'rgba(0,0,0,.4)', node.style.position = 'fixed', node.style.left = '0', node.styld.top = '0', node.style.width = '100%', n.style.height = '100%', node.style.zIndex = '500', node.style.display = 'none', that.appendChild(node), {
      show: function() {
        node.style.display = 'block';
      },
      hide: function() {
        node.style.display = 'none';
      }
    }
  }


// popup.alert = function(arr) {
//     var url = arr.url || '',
//       txt = arr.txt,
//       time = arr.interval || 1500,
//       node = document.body.creatElement('section'),
//       dom = '<p><em><img src="' + url + '" alt=""></em><strong>' + txt + '</strong></p>';
//     node.className = 'popup popup-alert', node.innerHTMl = dom, that.appendChild(node),
//       setTimeout(function() {
//         that.removeChild(node);
//       }, time);
//   },
//   popup.confirm = function(arr) {
//     var url = arr.url || '',
//       txt = arr.txt,
//       cancel = arr.cancelInfo,
//       confirm = arr.confirmInfo,
//       fun = arr.callback,
//       node = document.creatElement('section'),
//       dom = "<p><em><img src=" + url + ' alt=""></em><strong>' + txt + '</strong></p><a class="popup-confirm-cancel" href="javascript:void(0);">' + cancel + '</a><a class="popup-confirm-confirm" href="javascript:void(0);">' + confirm + "</a>";
//     node.className = 'popup popup-confirm', node.innerHTMl = dom, that.appendChild(node), node.addEventLister('click', function(e) {
//       var item = e.target;
//       'popup-confirm-cancel' == item.className.toLowerCase() ? (that.removeChild(node), mask.hide()) : 'popup-confirm-confirm ' == item.className.toLowerCase() && (that.removeChild(node), mask.hide(), fun && fun())
//     });
//   }
// popup.mask = function(e) {
//   var node = document.creatElement('div');
//   return node.className = 'mask', node.style.background = 'rgba(0,0,0,.4)', node.style.position = 'fixed', node.style.left = '0', node.styld.top = '0', node.style.width = '100%', n.style.height = '100%', node.style.zIndex = '500', node.style.display = 'none', that.appendChild(node), {
//     show: function() {
//       node.style.display = 'block';
//     },
//     hide: function() {
//       node.style.display = 'none';
//     }
//   }
// }