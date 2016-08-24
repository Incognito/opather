function opatherGenerator(property){
  // Note that this is different for returning a reference,
  // you get a new function each time.
  return function opatherCallable(property) {
    // Callable blends a call to a new generation plus
    // the locate method scoped to this opather.
    var callable = function(){
      return opatherGenerator.apply(undefined, arguments);
    }
    callable.locate = function(data){
      return data[property];
    };
    return callable;
  }(property)
}

module.exports = opatherGenerator;
