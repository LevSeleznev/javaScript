App.Router = Backbone.Router.extend({
    routes: {
        'edit-category/:id': 'editCategory',
        'edit-prices/:id': 'editPrices'
    },
    editCategory: function() {
    },
    editPrices: function(id) {
        var priceCollection = new App.Collections.Prices();
        priceCollection.fetch({data: {id: id}}).then(function() {
            new App.Views.Prices({collection: priceCollection, id: id}).render();
        });
    }
});