rs.view = {
  el:null,
  init:function(o){
    function selector(type){
      function get_selector(){
        return o.el.substring(1,(o.el.length));
      }
      var css='';
      switch(type){
        case 'id':
          css=document.getElementById(get_selector());
          break;
        case 'class':
          // TODO: make this capable of working on a set of elements
          css=document.getElementsByClassName(get_selector())[0];
          break;
        default:
          // TODO: make this capable of working on a set of elements
          css=document.getElementsByTagName(o.el)[0];
          break;
      }
      if (!css) console.log('Warning: no elements found with selector while looking for: ' + o.el);
      return css;
    }
    if (o){

      //sanity check for single selector
      if (o.el.indexOf(' ')>0) {console.log('Warning: multiple selectors detected, TODO: add multi-class support'); return 0;}

      if (o.el.indexOf("#")===0) {this.el = selector('id');}
      else if (o.el.indexOf(".")===0) {this.el = selector('class');}
      else {this.el = selector();}
    }
    return this;
  },
  render:function(m){

    for (var attr in m){
      if (typeof m[attr] == 'object'){
        this.el.setAttribute(attr,m[attr][1]);
        m[attr]=m[attr][1];
      }
    }

    //reapply the updated element
    if (typeof this.el == 'undefined'){
      return null;
    } else {
      return this.el;
    }
  },
  set_transform: function(el,m){
    var template='translate({{x}},{{y}})';
    if (el) el.setAttribute('transform',
      this.update_template(template,
        {x:m.x, y:m.y}
      )
    );
  },
  update_template: function(t,v){
    for(var prop in v) {
      if(v.hasOwnProperty(prop)) {
        // {{x}} for x, replace
        var re = new RegExp("({{" + prop + "}})");
        t = t.replace(re, v[prop]);
      }
    }
    return t;
  },
  extend: function(props,new_obj) {
    var prop, obj;
    if (new_obj) obj = Object.create(this);
    for(prop in props) {
      if(props.hasOwnProperty(prop)) {
        if (new_obj)
          obj[prop] = props[prop];
        else
          this[prop] = props[prop];
      }
    }
    return new_obj ? obj : this;
  }
};