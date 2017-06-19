/**
 * @name EcartDataPresenter
 * @namespace
 */
(function(EcartDataPresenter)
{
    /**
     * Creates a new View.
     */
    EcartDataPresenter.View = function(app, templates)
    {
        var _template = templates.view();
        var _appTemplate = app.template;
        var _dataProvider = new EcartDataProvider.EcartDataProvider();
        var _products;
        var _totalProducts = 0;
        var _subTotal = 0;
        var _currency;
        var _baseImgURL = "apps/EcartDataPresenter/images/T";
        var _productID;

        /**
         * render main view
         */
        var _renderDataView = function(data)
        {
            return templates.dataView(data).html();
        };

        /**
         * display no data message if products/items not exists
         */
        var _displayNoDataMessage = function()
        {
            _template.vars.productContainer.empty().append(templates.error().html());
        };

        /**
         * add header in to the main view
         */
        var _displayHeader = function(itemsCount)
        {
            var headerViewObject = new EcartDataPresenter.HeaderView(app, templates);

            _template.vars.header.append(headerViewObject.getHeaderView(_totalProducts));
        };

        /**
         * add payent view into the main view
         */
        var _displayPaymentView = function()
        {
            var paymentViewObject = new EcartDataPresenter.PaymentView(app, templates);

            _template.vars.paymentView.append(paymentViewObject.getPaymentView(_subTotal, _currency, _totalProducts));
        };

        /**
         * Creates a new View.
         */
        var _displayProducts = function(products)
        {
            _template.vars.productContainer.empty();

            _.each(products, function(product)
            {
                _subTotal += product.p_price;
                _currency = product.c_currency;
                 product.imgUrl = _baseImgURL + product.p_id+".jpg";
                _template.vars.productContainer.append(_renderDataView(product));
            });
        };

        /**
         * reflect edited product on the main base page
         * these things will be more easy if any framework i.e Angular JS, knockout js can be used, but i have made this app as an pure javascript so did not used any framework
            TODO: this code should we moved into the saperate file as this is a new view
         */
        var _displayEditedProduct = function(err, data)
        {
            var productView = $('#product-' + _productID);

            var product = data[0];
            product.imgUrl = _baseImgURL + product.p_id+".jpg";
            product.p_selected_size.code = $('#productSize').val();
            product.p_quantity = $('#productQty').val();

            productView.html(_renderDataView(product));
        };

        var _editProduct = function(productID)
        {
            _productID = productID;

            _dataProvider.getProductByID(productID, _displayEditedProduct);
        };

        /**
         * display addto cart view into the modal window
         TODO: this code should we moved into the saperate file as this is a new view
         */
        var _displayAddToBagView = function(err, data)
        {
            if(!err)
            {
                var viewData = {};
                viewData.product = data[0];
                viewData.product.imgUrl = _baseImgURL + viewData.product.p_id+".jpg";
                _template.vars.modal.empty().append(templates.addToBag(viewData).html());
            }
        };

        /**
         * bind events to open addtotag view
         TODO: this code should we moved into the saperate file as this is a new view
         */
        var _bindEventOnAddToBag = function()
        {
            $('.saveProduct').on('click', function()
            {
                var id = $(this).attr('p-id');
                _dataProvider.getProductByID(id, _displayAddToBagView);
            });
        };

        /**
         * display edited view into the modal window
         TODO: this code should we moved into the saperate file as this is a new view
         */
        var _displayEditView = function(err, data)
        {
            if(!err)
            {
                var viewData = {};
                viewData.product = data[0];
                viewData.product.imgUrl = _baseImgURL + viewData.product.p_id+".jpg";
                _template.vars.modal.empty().append(templates.editView(viewData).html());
            }
        };

        /**
         * bind event to open  edited view into the modal window
         TODO: this code should we moved into the saperate file as this is a new view
         */
        var _bindEventOnEdit = function()
        {
            $('.editProduct').on('click', function()
            {
                var id = $(this).attr('p-id');
                _dataProvider.getProductByID(id, _displayEditView);
            });
        };

        /**
         * main function to display all the view on page load and bind the events
         */
        var _displayCartView = function(err, products)
        {
            if(!err && products.productsInCart.length > 0)
            {
                _products = products.productsInCart;
                _totalProducts = _products.length;
                _displayHeader(_totalProducts);
                _displayProducts(_products);
                _displayPaymentView();
                _bindEventOnEdit();
                _bindEventOnAddToBag();
            }
            else
            {
                _displayNoDataMessage();
            }
        };

        /**
         * get list of all the available products
         */
        var _getAllProducts = function()
        {
            _dataProvider.getAllProducts(_displayCartView);
        };

        /**
         * public function to initialie the application
         */
        this.Initialize = function()
        {
            _getAllProducts();
            _appTemplate.append(_template);
        };
    };
}(window.EcartDataPresenter = window.EcartDataPresenter || {}));
