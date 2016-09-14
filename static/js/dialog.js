//弹出层方法
function createPopup(obj) {
  var popup = new Object;
  popup.time = obj.interval || 3000,
    popup.root = obj.goal || '',
    popup.url = obj.url || '',
    popup.txt = obj.txt || '',
    popup.body = popup.root.body || '',
    popup.cancel = obj.cancelInfo || '',
    popup.confirm = obj.confirmInfo || '',
    popup.fun = obj.fun || '',
    popup.alert = function(obj) {
      var node = this.root.createElement('section'),
        dom = '<p><em><img src="' + url + '" alt=""></em><strong>' + txt + '</strong></p>',
        pop = this.body.getElementsByClassName('popup');
      if(pop.length < 1) {
        popup.mask(obj),
          node.className = 'popup popup-alert',
          node.innerHTML = dom,
          this.body.appendChild(node),
          setTimeout(function() {
            this.body.removeChild(node);
          }, time);
      } else {
        return false;
      }
    },
    popup.confirm = function(obj) {
      node = this.root.createElement('section'),
        dom = "<p><em><img src=" + url + ' alt=""></em><strong>' + txt + '</strong></p><a class="popup-confirm-cancel" href="javascript:void(0);">' + cancel + '</a><a class="popup-confirm-confirm" href="javascript:void(0);">' + confirm + "</a>";
      node.className = 'popup popup-confirm', node.innerHTMl = dom, this.body.appendChild(node), node.addEventLister('click', function(e) {
        var item = e.target;
        'popup-confirm-cancel' == item.className.toLowerCase() ? (that.removeChild(node), mask.hide()) : 'popup-confirm-confirm ' == item.className.toLowerCase() && (that.removeChild(node), mask.hide(), fun && fun())
      });
    },
    popup.mask = function(obj) {
      var node = root.createElement('div');
      return node.className = 'mask',
        node.style = {
          'background': 'rgba(0,0,0,.4)',
          'position': 'fixed',
          'left': '0',
          'top': '0',
          'width': '100%',
          'height': '100%',
          'zIndex': '500'
        }, this.body.appendChild(node), {
          show: function() {
            node.style.display = 'block',
              setTimeout(function() {
                this.body.removeChild(this);
              }, time);
          },
          hide: function() {
            node.style.display = 'none';
          }
        }
    }
}