App.Views.App = Backbone.View.extend({
    initialize: function() {
        vent.on('category:edit', this.editCategory, this);
        vent.on('category:add', this.addCategory, this);
    },
    el: 'body',
    events: {
        'click .admin_menu_link': 'clickEditCat',
        'click #new_cat': 'clickNewCat'
    },
    clickEditCat: function(e) {
        this.collection.fetch();
        var modelId = this.collection.get($(e.currentTarget).attr('alt'));
        var editCategory = new App.Views.EditCategory({ model: modelId, collection: this.collection }).render().tinymce();
        $('select').customStyle1();
    },
    clickNewCat: function() {
        var addCategory = new App.Views.AddCategory({ collection: this.collection }).render().tinymce();
        $('select').customStyle1();
    },
    editCategory: function(category) {
        this.collection.fetch();
    },
    addCategory: function() {
        console.log("Создана новая категория.");
    }
});

App.Views.AddCategory = Backbone.View.extend({
    template: App.template('addCategoryTpl'),
    events: {
        'submit': 'submitNewCategory'
    },
    initialize: function() {
        this.h1 = this.$("#h1");
        this.title = this.$("#title");
        this.url = this.$("#url");
        this.meta_description = this.$("#meta_description");
        this.meta_keywords = this.$("#meta_keywords");
        this.top_description = this.$("#top_description");
        this.bottom_description = this.$("#bottom_description");
        this.menu_name = this.$("#menu_name");
        this.number_in_menu = this.$("#menu_number");
        this.visible_in_menu = this.$("#visible_in_menu");
        this.parent_id = this.$("#parent_category");
        
        return this;
    },
    render: function() {
        var parents = [];
        this.collection.each(function(category) {
            if(category.get('parent_id') == 0)
                parents.push({'h1': category.get('h1'), 'id': category.get('id')});
        }, this);
        var parents_object = {'all-parents': parents};
        $("#template-block").html(this.$el.html(this.template(parents_object)));
        return this;
    },
    tinymce: function() {
        CKEDITOR.replace( 'top_description' );
        CKEDITOR.replace( 'bottom_description' );
    },
    submitNewCategory: function(e) {
        e.preventDefault();
        if(this.$("#h1").val() && this.$("#title").val()) {
            this.collection.create({
                h1: this.$("#h1").val(),
                title: this.$("#title").val(),
                url: this.$("#url").val(),
                meta_description: this.$("#meta_description").val(),
                meta_keywords: this.$("#meta_keywords").val(),
                top_description: this.$("#top_description").val(),
                bottom_description: this.$("#bottom_description").val(),
                menu_name: this.$("#menu_name").val(),
                number_in_menu: this.$("#menu_number").val(),
                visible_in_menu: this.$("#visible_in_menu").val(),
                parent_id: this.$("#parent_category").val()
            }, {wait: true});
        } else {
            alert("Заполните обязательные поля!");
        }
        vent.trigger('category:add');
        
        this.clearForm();
        
        return this;
    },
    clearForm: function() {
        this.h1.val('');
        this.title.val('');
        this.url.val('');
        this.meta_description.val('');
        this.meta_keywords.val('');
        this.top_description.val('');
        this.bottom_description.val('');
        this.menu_name.val('');
        this.number_in_menu.val('');
        this.visible_in_menu.val('');
        this.parent_id.val('');
        
        return this;
    },
    validateH1: function() {
        console.log(this.collection.toJSON());
        if(!this.h1.val())
            $(".help_h1").html("Обязательно для заполнения!");
        else
            $(".help_h1").html("");
    },
    validateTitle: function() {
        console.log(this.collection.toJSON());
        if(!this.title.val())
            $(".help_title").html("Обязательно для заполнения!");
        else
            $(".help_title").html("");
    }
});


App.Views.EditCategory = Backbone.View.extend({
    template: App.template('editCategoryTpl'),
    initialize: function() {   
    },
    render: function() {
        var parents = [];
        this.collection.each(function(category) {
            if(category.get('parent_id') === 0 && category.get('id') !== this.model.get('id')) {
                var selected = (category.get('id') === this.model.get('parent_id')) ? true : false;
                parents.push({'h1': category.get('h1'), 'id': category.get('id'), 'selected': selected});
            }
        }, this);
        console.log(parents);
        this.model.set('all-parents', parents);
        
        $("#template-block").html(this.$el.html(this.template(this.model.toJSON())));
        return this;
    },
    tinymce: function() {
        CKEDITOR.replace( 'top_description' );
        CKEDITOR.replace( 'bottom_description' );
    },
    submitEditCategory: function(e) {
        e.preventDefault();
        this.model.save({
            h1: this.$("#h1").val(),
            title: this.$("#title").val(),
            url: this.$("#url").val(),
            meta_description: this.$("#meta_description").val(),
            meta_keywords: this.$("#meta_keywords").val(),
            top_description: this.$("#top_description").val(),
            bottom_description: this.$("#bottom_description").val(),
            menu_name: this.$("#menu_name").val(),
            number_in_menu: this.$("#menu_number").val(),
            visible_in_menu: this.$("#visible_in_menu").val(),
            parent_id: this.$("#parent_category").val()
        });
        vent.trigger('category:edit', this.model);
    },
    events: {
        'submit': 'submitEditCategory'
    }
});

App.Views.Prices = Backbone.View.extend({
    initialize: function() {
        this.collection.on('add', this.addOne, this);
    },
    render: function() {
        new App.Views.AddPrice({collection: this.collection, id: this.id}).render();
        this.collection.each(this.addOne, this);
        return this;
    },
    addOne:function(contact) {
        if(!contact.get('id')) {
            var price = contact;
            price.fetch().then(function() {
                contact.set('id', price.attributes[0].id);
            });
        }
        var singleContact = new App.Views.Price({model: contact});
        console.log(singleContact.render().el);
        $("#template-block").append(this.$el.append(singleContact.render().el));
        
    }
});

App.Views.Price = Backbone.View.extend({
    initialize: function() {
        this.model.on('destroy', this.unrender, this);
        this.model.on('change', this.render, this);
    },
    events: {
        'click #price_delete': 'removePrice',
        'click #price_update': 'editPrice'
    },
    template: App.template('editPricesTpl'),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    unrender: function() {
        this.remove();
    },
    removePrice: function() {
        this.model.destroy();
    },
    editPrice: function(e) {
        e.preventDefault();
        var parent = $(e.currentTarget).parent();
        var name = parent.find('.name').val();
        this.model.set('name', name);
        this.model.save();
    }
});

App.Views.AddPrice = Backbone.View.extend({
    initialize: function() {
    },
    template: App.template('addPriceTpl'),
    events: {
        'click #add_price_submit': 'addPrice'
    },
    render: function() {
        $("#template-block").append(this.$el.html(this.template({id_category: this.id})));
        return this;
    },
    addPrice: function(e) {
        e.preventDefault();
        this.collection.create({
            name: $("#add_price").val(),
            id_category: $("#id_category_price").val()
        }, {wait: true});
        this.clearInput();
    },
    clearInput: function() {
        $("#add_price").val("");
    }
});