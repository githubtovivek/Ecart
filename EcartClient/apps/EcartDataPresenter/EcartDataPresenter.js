/**
 * @name EcartDataPresenter
 * @namespace
 */
(function(EcartDataPresenter)
{
    EcartDataPresenter.EcartDataPresenter = function()
    {
        var _self = this;
        var _templates;
        var _view;

        /**
         * {@link Application.Application#loadResources}
         */
        this.loadResources = function(onComplete)
        {
            Framework.applicationManager.loadApplicationResources('EcartDataPresenter',
                null,
                [
                    'HeaderView.js',
                    'PaymentView.js',
                    'presenter.css',
                    'View.js'
                ],
                [
                    'addToBag',
                    'dataView',
                    'editView',
                    'error',
                    'header',
                    'paymentView',
                    'view'
                ],
                function(status, templates)
                {
                    _templates = templates;
                    onComplete(status);
                }
            );
        };

        /**
         * {@link Application.Application#initialize}
         */
        this.initialize = function()
        {
           _self.template = $("#applicationContainer");

            _view = new EcartDataPresenter.View(_self, _templates);

            _view.Initialize();
        };
    };
}(window.EcartDataPresenter = window.EcartDataPresenter || {}));
