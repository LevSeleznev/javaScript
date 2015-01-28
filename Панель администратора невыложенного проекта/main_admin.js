(function() {
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        Router: {}
    };
    
    window.vent = _.extend({}, Backbone.Events);
    
    App.template = function(id) {
        return Handlebars.compile($('#' + id).html());
    };
    
}());