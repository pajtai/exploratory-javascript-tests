var expect = chai.expect;

// Includel a stack trace when needed
// chai.Assertion.includeStack = true;

describe("Deferred", function() {

    var deferred,
        promise,
        deferred2,
        promise2,
        deferredOnlyMethods = ["resolve", "reject", "notify", "resolveWith", "rejectWith", "notifyWith"],
        promiseAndDeferredMethods = ["then", "done", "fail", "always", "pipe", "progress", "state"],
        allMethods = deferredOnlyMethods.concat(promiseAndDeferredMethods);

    beforeEach(function() {

        deferred = new $.Deferred();
        promise = deferred.promise();

        deferred2 = $.Deferred();
        promise2 = deferred2.promise();

    });

    describe("methods available", function() {

        describe("on deferred", function() {
            var i;

            for (i=0; i<allMethods.length; ++i) {
                (function(i) {
                    it("includes " + allMethods[i], function() {
                        expect(typeof deferred[allMethods[i]]).to.equal("function");
                    });
                }(i));
            }
        });

        describe("on promises", function() {
            var i;

            for (i=0; i<deferredOnlyMethods.length; ++i) {
                (function(i) {
                    it("does not include " + deferredOnlyMethods[i], function() {
                        expect(typeof promise[deferredOnlyMethods[i]]).to.equal("undefined");
                    });
                }(i));
            }

            for (i=0; i<promiseAndDeferredMethods.length; ++i) {
                (function(i) {
                    it("includes " + promiseAndDeferredMethods[i], function() {
                        expect(typeof promise[promiseAndDeferredMethods[i]]).to.equal("function");
                    });
                }(i));
            }
        });
    });

    it("A promise listens to the deferred it was created from", function() {
        var done = false;

        $.when(promise).always(function() {
            done = true;
        });

        expect(done).to.be.false;
        deferred.resolve();
        expect(done).to.be.true;
    });

    it("'always' runs when a deferred is rejected", function() {
        var done = false;

        promise.always(function() {
            done = true;
        });

        expect(done).to.be.false;
        deferred.reject();
        expect(done).to.be.true;
    });

    it("promises can chain callbacks using, 'then'", function() {

        var dones = [];

        promise.then(promise2);
        promise.done(function() {
            dones.push(1);
        });
        promise2.done(function() {
            dones.push(2);
        });

        expect(dones.length).to.equal(0);
        deferred.resolve();
        expect(dones.length).to.equal(1);
        deferred2.resolve();
        expect(dones.length).to.equal(2);

        expect(dones).to.deep.equal([1,2]);
    });
});
