var should = chai.should();

describe("Deferred Example", function() {

    beforeEach(function () {
        this.clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        this.clock.restore();
    });

    // clock example
//    it("fires in 500ms", function() {
//       var fire = false;
//       fire.should.be.false;
//       setTimeout(function() {
//           fire = true;
//       }, 500);
//        this.clock.tick(499);
//        fire.should.be.false;
//        this.clock.tick(500);
//        fire.should.be.true;
//    });


    // OUTLINE:
    //
    //  purchaseTitle(titleId)
    //  checkAuth()
    //      No?
    //          view.showLoginModal()
    //      Yes?
    //          api.checkBalance()
    //          api.checkBuyPermissions()
    //              api.doPurchase()
    //                  view.showConfirmation()
    //
    //  worker
    //  view
    //  api
    //

    describe("with a PurchaseTitleWorker", function() {

        it("initializes the worker with an api and a view object", function() {

        });

        describe("makes a purchase using purchaseTitle(titleId)", function() {

            describe("for unauthorzied users", function() {

                it("the authToken is empty", function() {

                });

                describe("the login modal", function() {

                    it("is displayed", function() {

                    });

                    it("returns a promise that when resolved continues with the purchase " +
                        "path", function() {

                    });
                });
            });

            describe("for authorized users", function() {

                describe("checking the user account balance", function() {

                    it("shows an error modal if the account balance is less than the " +
                        "purchase price", function() {

                    });
                });

                describe("checking the user buy permissions", function() {

                    it("shows an error modal if the user doesn't have the correct " +
                        "permissions", function() {

                    });
                });

                describe("doing a purchase", function() {

                    it("is done if both the account balance and permissions are " +
                        "sufficient", function() {

                    });

                    it("triggers a warning modal if there was an error", function() {

                    });

                    it("shows a confirmation modal if it was successful", function() {

                    });
                });
            });
        });
    });
});