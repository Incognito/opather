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

      it("should be able to be called multiple times in chain", function() {
        // I'm paranoid this could be broken by obscure changes to
        // the call structure some day.
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
      it("should be able to resolve two levels deep", function() {
        var opatherInstance = Opather('first')('second')('third');
        var testData = {
          'first': {
            'second': {
              'third': 'success'
            },
            'third': 'failure'
          },
          'second': 'failure',
          'third': 'failure'
        };

        expect(opatherInstance.locate(testData)).toEqual('success');
      });
    });
  });
});
