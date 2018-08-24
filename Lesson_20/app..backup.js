(function(){
    const app = angular.module("myApp", []);

    app
      .controller("ItemController", ItemController)
      .provider("ItemService", ItemServiceProvider)
      .config(Config);

    Config.$inject = ["ItemServiceProvider"];
    function Config(ItemServiceProvider) {

    };
    
    ItemController.$inject = ["ItemService"];
    function ItemController(ItemService) {
        let itemCtrl = this;
        const provider = ItemService();

        itemCtrl.name = "";
        itemCtrl.quantity = "";

        itemCtrl.addItem = () => {
            try {
                provider.addItem(itemCtrl.name, itemCtrl.quantity);
            } catch(error) {
                itemCtrl.error = error.message;
            }
        };

        itemCtrl.items = provider.getItems();
    }

    function ItemService(maxItems) {
        const service = this;
        const items = [];

        service.addItem = (name, quantity) => {
            if(maxItems == undefined ||
                maxItems != undefined && items.length < maxItems) {
                    console.log(name);
                    items.push({ name, quantity });
            } else {
                throw new Error('Max limit is ${maxItems}');
            }
        };

        service.getItems = () => {
            console.log("items", items);
            return items;
        }

        return service;
    }

    function ItemServiceProvider() {
        const provider = this;

        provider.defaults = {
            maxItems: 5
        };

        provider.$get = function() {
            return new ItemService(provider.defaults.maxItems);
        };
    }
})();