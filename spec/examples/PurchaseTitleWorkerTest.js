var should = chai.should();

describe("Deferred Example", function() {

    beforeEach(function () {
        this.clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        this.clock.restore();
    });

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

    //TODO: implement using requirejs

    // View and Api are stubbed out but no implemented yest
    // we know the will retunr promises that are resolved with the data we need
    describe("The PurchaseTitleWorker", function() {

        var worker, api, view,
            viewDeferred, apiDeferred;

        beforeEach(function() {
            api = new PurchaseApi();
            view = new PurchaseView();

            // Since we know api and view will be implemented using promises,
            // we can exercise the worker with stubbed out api and view that
            // use the deferreds below.
            viewDeferred = $.Deferred();
            apiDeferred = $.Deferred();
            worker = new PurchaseTitleWorker(view, api);

            sinon.stub(view, "showLoginModal", function() {
                return viewDeferred.promise();
            });
        });

        it("initializes the worker with an api and a view object", function() {
            should.exist(worker.getApi());
            should.exist(worker.getView());
        });

        describe("makes a purchase using purchaseTitle(titleId).", function() {

            beforeEach(function() {
                worker.purchaseTitle(123);
            });
            describe("For unauthorzied users", function() {

                it("the authToken does not exist", function() {
                    should.not.exist(worker.getAuthToken());
                });

                describe("the login modal", function() {

                    it("is displayed", function() {
                        view.showLoginModal.should.have.been.calledOnce;
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
