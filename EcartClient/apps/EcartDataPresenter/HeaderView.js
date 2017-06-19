/**
 * @name EcartDataPresenter
 * @namespace
 */
(function(EcartDataPresenter)
{
    /**
     * Creates a new HeaderView.
     */
    EcartDataPresenter.HeaderView = function(app, templates)
    {
        var _totalProducts = 0;

        /*
            this local function will return the header view
        */
        var _displayHeader = function()
        {
            return templates.header({itemsCount : _totalProducts}).html();
        };

        /*
            this public function can be accessed anywhere and will return a new header view
         */
        this.getHeaderView = function(totalProducts)
        {
            _totalProducts = totalProducts;

            return  _displayHeader();
        };
    };
}(window.EcartDataPresenter = window.EcartDataPresenter || {}));
