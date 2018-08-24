(function(){
const app = angular.module("myApp", []);

app
    // .controller("AddItemController", AddItemController)
    .controller("AddItemController2", AddItemController2)
    .controller("ShowItemsController", ShowItemsController)
    //.service("ItemService", ItemService)
    .factory("ItemsFactory", ItemsFactory);

//controllers
//AddItemController.$inject = ["ItemService"];
// AddItemController.$inject = ["ItemsFactory"];
// function AddItemController(ItemService){
//     const addItem = this;
//     const factory = ItemsFactory();

//     addItem.itemName = "";
//     addItem.itemQuantity = "";

//     addItem.addItem = function(){
//         //ItemService.addItem(addItem.itemName, addItem.itemQuantity);
//         factory.addItem(addItem.itemName, addItem.itemQuantity);
//     };
// };

AddItemController2.$inject = ["ItemsFactory"];
function AddItemController2(ItemsFactory){
    const addItem = this;
    const factory = ItemsFactory(3);

    addItem.itemName = "";
    addItem.itemQuantity = "";

    addItem.addItem = function(){
        try {
            //ItemService.addItem(addItem.itemName, addItem.itemQuantity);
            factory.addItem(addItem.itemName, addItem.itemQuantity);
        } catch(error) {
            console.log("error", error.message);
            addItem.errorMessage = error.message;
        }
    };

    addItem.items = factory.getItems();
};

// AddItemController.$inject = ["ItemService"];
// function AddItemController(ItemService){
//     const addItem = this;

//     addItem.itemName = "";
//     addItem.itemQuantity = "";

//     addItem.addItem = function(){
//         ItemService.addItem(addItem.itemName, addItem.itemQuantity);
//     };
// };

//services
ShowItemsController.$inject = ["ItemsFactory"];
function ShowItemsController(ItemsFactory){
    const showItems = this;
    const factory = ItemsFactory();

    //showItems.items = ItemService.getItems();
    showItems.items = factory.getItems();
}

function ItemService(maxItems) {
    const service = this;
    let items = [];

    service.addItem = function(itemName, itemQuantity){
        console.log("addItem");
        console.log("items.length", items.length);
        if(maxItems == undefined ||
           maxItems != undefined && items.length < maxItems){
               console.log("maxItems", maxItems);
            items.push({ itemName, itemQuantity });
        } else {
            console.log("maxItems true");
            throw new Error("Max items limit");
        }
        
        console.log("items", items);
    };

    service.getItems = function(){
        return items;
    }
}

//factory
function ItemsFactory(){
    const factory = function(maxItems){
        return new ItemService(maxItems);
    };

    return factory;
}

})();
