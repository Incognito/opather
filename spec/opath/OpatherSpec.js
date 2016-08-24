describe("Opather", function() {
  var Opather = require('../../lib/opather');

  // semver major bumps if backwards compatibility is broken here
  describe("Public Api", function() {

    it("should be defined", function() {
      expect(Opather).toBeDefined();
    });

    describe("Opather chain", function() {
      it("should return an instance", function() {
        var opatherInstance = Opather()
        expect(opatherInstance).toBeDefined(Opather);
      });

      it("should have a locate method", function() {
        var opatherInstance = Opather();

        expect(opatherInstance.locate).toBeDefined();
      });
      it("should be able to be called multiple times in chain", function() {
        expect(Opather()()()()()()()()()()()()).toBeDefined();
        expect(Opather().locate).toBeDefined();
        expect(Opather()().locate).toBeDefined();
        expect(Opather()()().locate).toBeDefined();
        expect(Opather()()()().locate).toBeDefined();
      });
    });
    describe("Opather resolver", function() {
      it("should be able to resolve one level deep", function() {
        var opatherInstance = Opather('first');

        expect(opatherInstance.locate({'first': 'success'})).toEqual('success');
      });
      it("should maintain locator after chained on", function() {
        var opatherInstance = Opather('first')
        var chainedOpatherInstance = opatherInstance('second')
        var testData = {
          'first': {
            'second': 'success'
          }
        };

        expect(opatherInstance.locate(testData)).toEqual({'second': 'success' });
      });
      fit("should be able to resolve two levels deep", function() {
        var opatherInstance = Opather('first')('second');
        var testData = {
          'first': {
            'second': 'success'
          },
          'second': 'failure'
        };

        expect(opatherInstance.locate(testData)).toEqual('success');
      });
    });
  });
});
