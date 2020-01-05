# opather (oh-path-er)

A tool to defer the resolution of an object path until you have the data.

This lets you remove functions where you don't reall need any except to map out
a property path, and write code that reads more like configuration. It also
allows you to refactor object structure easily.

Inspired by trivial uses of XPath, where you can "compile" a path to access a
node on an XML document many times over. Think of this as similar to that, but
with less features.

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
var getFaxInJson = opather('foo')('bar')('baz')('fax').locate;
var getBaxInJson = opather('foo')('bar')('baz')('bax').locate;
var getJaxInJson = opather('foo')('bar')('baz')('jax').locate;

function(data){
    return [
        getFaxInJson(data)
        getBaxInJson(data)
        getJaxInJson(data)
    ];
}
```


You can also write:

```
bazPather = opather('foo')('bar')('baz');
var getFaxInJson = bazPather('fax').locate;
var getBaxInJson = bazPather('bax').locate;
var getJaxInJson = bazPather('jax').locate;

function(data){
    return [
        bazPather('fax').locate(data);
        bazPather('bax').locate(data);
        bazPather('jax').locate(data);
    ];
}
```


You may also have a method that expects a opather you can curry with:

```
var hugeBlobOfData = {
    address: '123 bob way',
    company: 'bob tech',
    user: {username: 'bob'},
    email: ['bob@example.com']
};

function curryByOpather(opather){
    return function(object){
      opather.locate(object)
    };
}

getUsername = curryByOpather(opather('user')('username'));
getFirstEmail = curryByOpather(opather('email')(0));
getCompany = curryByOpather(opather('company'));
getAddress = curryByOpather(opather('address'));

getUsername(hugeBlobOfData); // 'bob'

```


And if you don't have data until later, you can return the opather and reduce
data against it later.
