var expect = chai.expect,
    should = chai.should();

describe("Deferred Example", function() {

    beforeEach(function () {
        this.clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        this.clock.restore();
    });

    it("fires in 500ms", function() {
       var fire = false;
       fire.should.be.false;
       setTimeout(function() {
           fire = true;
       }, 500);
        this.clock.tick(499);
        fire.should.be.false;
        this.clock.tick(500);
        fire.should.be.true;
    });
});