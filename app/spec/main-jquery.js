var should = chai.should();

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
                        (typeof deferred[allMethods[i]]).should.equal("function");
                    });
                }(i));
            }
        });

        describe("on promises", function() {
            var i;

            for (i=0; i<deferredOnlyMethods.length; ++i) {
                (function(i) {
                    it("does not include " + deferredOnlyMethods[i], function() {
                        (typeof promise[deferredOnlyMethods[i]]).should.equal("undefined");
                    });
                }(i));
            }

            for (i=0; i<promiseAndDeferredMethods.length; ++i) {
                (function(i) {
                    it("includes " + promiseAndDeferredMethods[i], function() {
                        (typeof promise[promiseAndDeferredMethods[i]]).should.equal("function");
                    });
                }(i));
            }
        });
    });

    it("A promise listens to the deferred it was created from", function() {
        var done = false;

        promise.always(function() {
            done = true;
        });

        done.should.be.false;
        deferred.resolve();
        done.should.be.true;
    });

    it("'always' runs when a deferred is rejected", function() {
        var done = false;

        promise.always(function() {
            done = true;
        });

        done.should.be.false;
        deferred.reject();
        done.should.be.true;
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

        dones.length.should.equal(0);
        deferred.resolve();
        dones.length.should.equal(1);
        deferred2.resolve();
        dones.length.should.equal(2);

        dones.should.deep.equal([1,2]);
    });
});
