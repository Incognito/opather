function opatherGenerator(property){
  // Note that this is different for returning a reference,
  // you get a new function each time.
  return function opatherCallable(property) {
    // Callable blends a call to a new generation plus
    // the locate method scoped to this opather.
    var callable = function() {
      var called = opatherCallable.apply(undefined, arguments);
      // Let the next call have a reference to this locate
      called.previousLocate = callable.locate;
      return called;
    }

    callable.locate = function(data){
      // Previous locate is called before present locate (eg, recursion)
      if (callable.previousLocate) {
        return callable.previousLocate(data)[property];
      }
      return data[property];
    };

    return callable;
  }(property)
}

module.exports = opatherGenerator;
