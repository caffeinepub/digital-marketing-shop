import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  type OldProduct = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
  };

  type OldCartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type OldOrder = {
    id : Nat;
    items : [OldCartItem];
    total : Float;
    status : Text;
    customerInfo : Text;
  };

  type OldActor = {
    productIdCounter : Nat;
    orderIdCounter : Nat;
    products : Map.Map<Nat, OldProduct>;
    carts : Map.Map<Principal, List.List<OldCartItem>>;
    orders : Map.Map<Nat, OldOrder>;
  };

  type NewProduct = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : NewCategory;
    imageUrl : Text;
    videoPreviewUrl : ?Text;
    downloadUrl : Text;
    isMegaBundle : Bool;
    frequentlyBoughtTogether : [Nat];
  };

  type NewCategory = {
    #viralReelsLibrary;
    #editingSuite;
    #masterclassCourses;
    #softwareTools;
  };

  type NewCartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type NewOrder = {
    id : Nat;
    items : [NewCartItem];
    total : Float;
    status : Text;
    customerInfo : Text;
    downloadLinks : [Text];
  };

  type NewActor = {
    productIdCounter : Nat;
    orderIdCounter : Nat;
    products : Map.Map<Nat, NewProduct>;
    carts : Map.Map<Principal, List.List<NewCartItem>>;
    orders : Map.Map<Nat, NewOrder>;
  };

  func mapLegacyCategory(cat : Text) : NewCategory {
    switch (cat) {
      case ("reelsLibrary") { #viralReelsLibrary };
      case ("editingSuite") { #editingSuite };
      case ("masterclass") { #masterclassCourses };
      case ("softwareTools") { #softwareTools };
      case (_) { #viralReelsLibrary }; // Default fallback
    };
  };

  public func run(old : OldActor) : NewActor {
    let newProducts = old.products.map<Nat, OldProduct, NewProduct>(
      func(_, oldProduct) {
        {
          oldProduct with
          category = mapLegacyCategory(oldProduct.category);
          videoPreviewUrl = null;
          downloadUrl = "";
          isMegaBundle = false;
          frequentlyBoughtTogether = [];
        };
      }
    );

    let newCarts = old.carts.map<Principal, List.List<OldCartItem>, List.List<NewCartItem>>(
      func(_k, v) { v.map<OldCartItem, NewCartItem>(func(old) { old }) }
    );

    let newOrders = old.orders.map<Nat, OldOrder, NewOrder>(
      func(_, oldOrder) {
        {
          oldOrder with
          downloadLinks = [];
          items = oldOrder.items;
        };
      }
    );

    {
      old with
      products = newProducts;
      carts = newCarts;
      orders = newOrders;
    };
  };
};

