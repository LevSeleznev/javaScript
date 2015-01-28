App.Collections.Categories = Backbone.Collection.extend({
    model: App.Models.Category,
    url: '/admin-remont24/add-category/cat'
});

/*Коллекция прайс листов*/
App.Collections.Prices = Backbone.Collection.extend({
    model: App.Models.Prices,
    url: '/admin-remont24/edit-prices'
});
/*END Коллекция прайс листов*/