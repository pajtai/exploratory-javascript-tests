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

    //TODO: move this into a separate file
    function PurchaseTitleWorker(view, api) {
        this.view = view;
        this.api = api;
    }

    PurchaseTitleWorker.prototype.getApi = getApi;
    PurchaseTitleWorker.prototype.getView = getView;
    PurchaseTitleWorker.prototype.getAuthToken = getAuthToken;
    PurchaseTitleWorker.prototype.purchaseTitle = purchaseTitle;

    describe("The PurchaseTitleWorker", function() {

        var worker, api, view;

        beforeEach(function() {
            api = 1;
            view = sinon.mock({
                showLoginModal: function () {}
            });
            worker = new PurchaseTitleWorker(view, api);
        });

        it("initializes the worker with an api and a view object", function() {
            should.exist(worker.getApi());
            should.exist(worker.getView());
        });

        describe("makes a purchase using purchaseTitle(titleId).", function() {

            describe("For unauthorzied users", function() {

                it("the authToken does not exist", function() {
                    should.not.exist(worker.getAuthToken());
                });

                describe("the login modal", function() {

                    it("is displayed", function() {

                        
                        view.showLoginModal.should.have.been.calledOnce();
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

    function getApi() {
        return this.api;
    }

    function getView() {
        return this.view;
    }

    function getAuthToken() {
        return this.authToken;
    }

    function purchaseTitle(titleId) {
        if (!this.getAuthToken()) {
            this.view.showLoginModal();
        }
    }
});