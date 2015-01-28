App.Models.Category = Backbone.Model.extend({
    validate: function(attrs, options) {
        if(!attrs.h1) {
            return 'Необходимо ввести заголовок категории';
        }
    }
});

/*Модель прайс листа*/
App.Models.Prices = Backbone.Model.extend({

});
/*END Модель прайс листа*/