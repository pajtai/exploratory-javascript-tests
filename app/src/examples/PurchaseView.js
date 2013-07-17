(function() {

    // Interface guaranteed - implementation unknown
    // The methods will return promises resolved with data needed
    var PurchaseView = function() {

        },
        prototypeMethods = {
            showLoginModal: showLoginModal,
            showConfirmation: showConfirmation
        };

    window.PurchaseView = PurchaseView;

    $.extend(PurchaseView.prototype, prototypeMethods);

    function showLoginModal() {

    }

    function showConfirmation() {

    }
}());
