# Use case:

Instead of writing:

```
var getBaxInJson = function(data){
    return data.foo.bar.baz.fax;
};
var getBaxInJson = function(data){
    return data.foo.bar.baz.bax;
};
var getBaxInJson = function(data){
    return data.foo.bar.baz.jax;
};

function(data){
    return [
        getFaxInJson(data)
        getBaxInJson(data)
        getJaxInJson(data)
    ];
}

```


You can write:

```
function(data){
    return [
        opather('foo')('bar')('baz')('fax').locate(data);
        opather('foo')('bar')('baz')('bax').locate(data);
        opather('foo')('bar')('baz')('jax').locate(data);
    ];
}
```


You can also write:

```
function(data){
    bazPather = opather('foo')('bar')('baz');
    return [
        bazPather('fax').locate(data);
        bazPather('bax').locate(data);
        bazPather('jax').locate(data);
    ];
}
```


And if you don't have data until later, you can return the opather and reduce
data against it later.

```
function(data){
    bazPather = opather('foo')('bar')('baz');
    return [
        bazPather('fax');
        bazPather('bax');
        bazPather('jax');
    ];
}
```
