/**
 * @name EcartDataPresenter
 * @namespace
 */
(function(EcartDataPresenter)
{
    /**
     * Creates a new PaymentView.
     */
    EcartDataPresenter.PaymentView = function(app, templates)
    {
        var _totalProducts = 0;
        var _subTotal = 0;
        var _currency;
        var _promoCode;

        /**
         * calculate the discount on items/products
         */
        var _calculateDiscount = function()
        {
            var _discount = 0;

            if(_totalProducts > 0 && _totalProducts <= 3)
            {
                _discount = ((_subTotal * 5) / 100).toFixed(2);
            }
            else if(_totalProducts > 3 && _totalProducts <= 6)
            {
                _discount = ((_subTotal * 10) / 100).toFixed(2);
            }
            else if(_totalProducts > 10)
            {
                _discount = ((_subTotal * 25) / 100).toFixed(2);
            }

            return _discount;
        };

        /**
         * Creates a new Payment object which will be rendered on payment view.
         */
        var _getPaymentObject = function()
        {
            var payment = {};

            payment.subTotal = _subTotal;
            payment.currency = _currency;
            payment.offer = _calculateDiscount();
            payment.promotionCode = _promoCode;
            payment.shippingFee = 0;
            payment.estimatedTotal = (payment.subTotal - payment.offer);

            return payment;
        };

        /**
         * display payment view
         */
        var _displayPaymentView = function()
        {
            return templates.paymentView(_getPaymentObject()).html();
        };

        /**
         * public function to display payment view
         */
        this.getPaymentView = function(subTotal, currency, totalProducts)
        {
            _subTotal = subTotal;
            _currency = currency;
            _totalProducts = totalProducts;

           return  _displayPaymentView();
        };
    };
}(window.EcartDataPresenter = window.EcartDataPresenter || {}));
