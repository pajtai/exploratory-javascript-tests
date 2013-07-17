(function() {

    // Interface guaranteed - implementation unknown
    // The methods will return promises resolved with data needed
    var PurchaseApi = function() {

        },
        prototypeMethods = {
            checkBalance: checkBalance,
            checkBuyPermissions: checkBuyPermissions,
            doPurchase: doPurchase
        };

    window.PurchaseApi = PurchaseApi;

    $.extend(PurchaseApi.prototype, prototypeMethods);

    function checkBalance() {

    }

    function checkBuyPermissions() {

    }

    function doPurchase() {

    }
}());
