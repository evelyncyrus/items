/**
 * Created by evelyn on 2016/8/29.
 */

/**
 * @author Evelyn
 * @data 2016/8/22
 * reset font-size of the root
 **/

(function resetRem() {

  //设置根元素字体大小
  var setRem = function() {
    var root = document.documentElement;
    var fontS = Math.min(750, window.innerWidth) / 24 + 'px';
    root.style.fontSize = fontS;
  };
  window.addEventListener('resize', setRem);

  //解决Safari存在的加载时resize事件不触发问题
  var userAgent = navigator.userAgent;
  if(userAgent.indexOf("Safari") > -1) {
    setRem();
  }
})();


//insert js 异步加入js
function insertJS(src) {
  var doc = document;
  var body = doc.body;
  var script = doc.createElement('script');
  script.src = src;
  window.addEventListener('load', function() {
    setTimeout(function() {
      body.appendChild(script);
    }, 0)
  })
}