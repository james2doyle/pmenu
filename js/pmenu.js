(function(pmenu, undefined ) {
  //Private Method
  function has3d() {
    var el = document.createElement('p'),
    get3d,
    transforms = {'webkitTransform':'-webkit-transform','OTransform':'-o-transform','msTransform':'-ms-transform','MozTransform':'-moz-transform','transform':'transform'};
    document.body.insertBefore(el, null);
    for (var t in transforms) {
      if (el.style[t] !== undefined) {
        el.style[t] = "translate3d(1px,1px,1px)";
        get3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        return t;
      } else {
        return '';
      }
    }
    console.log(el);
    document.body.removeChild(el);
  }
  //Public Property
  pmenu.version = '1.0';
  pmenu.startingAngle = -180;
  pmenu.angleDifference = 180;
  pmenu.radius = 100;
  pmenu.menu = document.querySelector('.menu_option');
  pmenu.button = document.querySelector('.menu_button');
  pmenu.element = pmenu.menu.children;
  pmenu.ellength = pmenu.menu.children.length;
  pmenu.prefix = has3d();
  pmenu.reinit = function() {
    pmenu.element = pmenu.menu.children;
    pmenu.ellength = pmenu.menu.children.length;
  };
  //Public Method
  pmenu.close = function() {
    pmenu.button.classList.remove('btn-rotate');
    for (var i = pmenu.ellength - 1; i >= 0; i--) {
      pmenu.element[i].style[pmenu.prefix] = 'translate3d(0,0,-1px)';
    }
  };
  pmenu.open = function() {
    pmenu.button.classList.add('btn-rotate');
    var angle = pmenu.angleDifference/(pmenu.ellength - 1),
    delayTime = 1/(pmenu.ellength - 1),
    elementAngle = [],
    xPos = [],
    yPos = [];
    for (var i = pmenu.ellength - 1; i >= 0; i--) {
      elementAngle[i] = (pmenu.startingAngle + angle*(i))*Math.PI/180;
      xPos[i] = Math.round(pmenu.radius * Math.sin(elementAngle[i]));
      yPos[i] = Math.round(pmenu.radius * Math.cos(elementAngle[i]));
      pmenu.element[i].style[pmenu.prefix] = 'translate3d('+yPos[i]+'px,'+xPos[i]+'px,1px)';
    }
  };
  pmenu.init = function() {
    for (var i = pmenu.ellength - 1; i >= 0; i--) {
      pmenu.element[i].style.top = pmenu.button.offsetTop - 10 + 'px';
      pmenu.element[i].style.left = pmenu.button.offsetLeft + 5 + 'px';
    }
    pmenu.button.addEventListener('click', function() {
      if (pmenu.button.classList.contains('btn-rotate')) {
        pmenu.close();
      } else {
        pmenu.open();
      }
    }, false);
  };
}(window.pmenu = window.pmenu || {}));