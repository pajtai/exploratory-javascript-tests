(function() {

    var PurchaseTitleWorker = function(view, api) {
            this.view = view;
            this.api = api;
        },
        prototypeMethods = {
            getApi: getApi,
            getView: getView,
            getAuthToken: getAuthToken,
            purchaseTitle: purchaseTitle
        };

    window.PurchaseTitleWorker = PurchaseTitleWorker;

    $.extend(PurchaseTitleWorker.prototype, prototypeMethods);

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
}());