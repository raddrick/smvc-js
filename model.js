rs.model = {
  build_attributes: function(el){
    var box=el.getBoundingClientRect();
    for (var attr in box){
      var value=box[attr];
      this[attr]=value;
    }
    if (el.x) this.x = el.x.baseVal.value;
    if (el.y) this.y = el.y.baseVal.value;
    return el;
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
