/**
 * @name EcartDataProvider
 * @namespace
 */
(function(EcartDataProvider)
{
    /**
     * Creates a new EcartDataProvider.
     */
    EcartDataProvider.EcartDataProvider = function()
    {
        var _baseURL = Framework.getDynamicRoot();

        /**
         * {@link Application.Application#loadResources}
         */
        this.loadResources = function(onComplete)
        {
            Framework.applicationManager.loadApplicationResources('EcartDataPresenter',
                null,
                [
                    'EcartDataProvider.js'
                ],
                [
                ],
                function(status, templates)
                {
                    onComplete(status);
                }
            );
        };

        this.getAllProducts = function(callBack)
        {
            $.ajax({
                url : _baseURL + 'EcartDataProvider/getAllProducts',
                type : 'GET',
                dataType : 'json',
                success : function(response) {
                    callBack(undefined, response);
                },
                error : function(err) {
                    callBack(err, undefined);
                }
            });
        };

        this.getProductByID = function(id, callBack)
        {
            $.ajax({
                url : _baseURL + 'EcartDataProvider/getProductByID',
                type : 'POST',
                data: {id: id},
                dataType : 'json',
                success : function(response) {
                    callBack(undefined, response);
                },
                error : function(err) {
                    callBack(err, undefined);
                }
            });
        };
    };
}(window.EcartDataProvider = window.EcartDataProvider || {}));
