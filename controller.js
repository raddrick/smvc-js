rs.controller = {
  models:[],
  views:[],
  init:function(o){

    // check for array
    for (var i=0 ; i< o.length ; i++){
      var obj=o[i];

      // //create a new model
      // var m=Object.create(rs.model);
      var m=Object.create(rs.model);
      if (obj.u) m.extend({update:obj.u});
      this.models[obj.id] = m;

      // // create a coresponding view
      var v=Object.create(rs.view);
      if (obj.v) v.extend({update:obj.v});
      this.views[obj.id] = v.init(obj);

      m.build_attributes(v.el);
    }
    return this;
  },
  update:function(models){

    //upgrade models to an array if a string
    if (typeof models != 'undefined') {
      if (typeof models.index != 'undefined')
        models = [models];
    }

    for (var id in this.models){
      var m=this.models[id];

      // if the model is set it will update it only, otherwise update all
      if (typeof models == 'undefined' || models.indexOf(m.id) >= 0){
        var v=this.views[id];

        //apply the new model details to the view
        if (typeof m.update == 'undefined') break;
        if (typeof v.update == 'undefined') break;
        v.update(m.update());
      }
    }
    return true;
  }
};
