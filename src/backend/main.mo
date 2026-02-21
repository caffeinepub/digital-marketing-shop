import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Migration "migration";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

(with migration = Migration.run)
actor {
  include MixinStorage();

  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Category;
    imageUrl : Text;
    videoPreviewUrl : ?Text;
    downloadUrl : Text;
    isMegaBundle : Bool;
    frequentlyBoughtTogether : [Nat];
  };

  public type Category = {
    #viralReelsLibrary;
    #editingSuite;
    #masterclassCourses;
    #softwareTools;
  };

  public type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  public type Order = {
    id : Nat;
    items : [CartItem];
    total : Float;
    status : Text;
    customerInfo : Text;
    downloadLinks : [Text];
  };

  var productIdCounter = 0;
  var orderIdCounter = 0;

  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Principal, List.List<CartItem>>();
  let orders = Map.empty<Nat, Order>();

  public shared ({ caller }) func addProduct(
    name : Text,
    description : Text,
    price : Float,
    category : Category,
    imageUrl : Text,
    videoPreviewUrl : ?Text,
    downloadUrl : Text,
    isMegaBundle : Bool,
    frequentlyBoughtTogether : [Nat],
  ) : async Nat {
    let product : Product = {
      id = productIdCounter;
      name;
      description;
      price;
      category;
      imageUrl;
      videoPreviewUrl;
      downloadUrl;
      isMegaBundle;
      frequentlyBoughtTogether;
    };
    products.add(productIdCounter, product);
    productIdCounter += 1;
    productIdCounter - 1;
  };

  public query ({ caller }) func getProduct(id : Nat) : async ?Product {
    products.get(id);
  };

  public query ({ caller }) func searchProducts(searchTerm : Text) : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.name.toLower().contains(#text(searchTerm.toLower())) or product.description.toLower().contains(#text(searchTerm.toLower()));
      }
    );
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.category == category;
      }
    );
  };

  public query ({ caller }) func getMegaBundleProduct() : async ?Product {
    products.values().toArray().find(
      func(product) {
        product.isMegaBundle;
      }
    );
  };

  public query ({ caller }) func getFrequentlyBoughtTogether(productId : Nat) : async [Product] {
    switch (products.get(productId)) {
      case (null) { [] };
      case (?product) {
        product.frequentlyBoughtTogether.map(
          func(fbtId) {
            switch (products.get(fbtId)) {
              case (null) { null };
              case (?fbtProduct) { ?fbtProduct };
            };
          }
        ).filter(
          func(p) { p != null }
        ).map(
          func(p) {
            switch (p) {
              case (null) { Runtime.trap("Unexpected null in frequently bought together products") };
              case (?product) { product };
            };
          }
        );
      };
    };
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    let cart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?existingCart) { existingCart };
    };

    let updatedCart = cart.filter(func(item) { item.productId != productId });
    updatedCart.add({ productId; quantity });
    carts.add(caller, updatedCart);
  };

  func calculateCartTotal(cart : List.List<CartItem>) : Float {
    var total : Float = 0;
    cart.values().forEach(
      func(item) {
        switch (products.get(item.productId)) {
          case (null) {};
          case (?product) {
            total += product.price * item.quantity.toFloat();
          };
        };
      }
    );
    total;
  };

  public shared ({ caller }) func checkout(customerInfo : Text) : async ?Order {
    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) { cart };
    };

    let total = calculateCartTotal(cart);
    let downloadLinks = cart.toArray().map(
      func(item) {
        switch (products.get(item.productId)) {
          case (null) { "" };
          case (?product) { product.downloadUrl };
        };
      }
    );

    let order : Order = {
      id = orderIdCounter;
      items = cart.toArray();
      total;
      status = "Pending";
      customerInfo;
      downloadLinks;
    };

    orders.add(orderIdCounter, order);
    carts.remove(caller);

    let orderId = orderIdCounter;
    orderIdCounter += 1;
    orders.get(orderId);
  };

  public shared ({ caller }) func addOrder(item : CartItem, customerInfo : Text) : async Order {
    let total : Float = switch (products.get(item.productId)) {
      case (null) { 0.0 };
      case (?product) { product.price * item.quantity.toFloat() };
    };

    let downloadLinks = switch (products.get(item.productId)) {
      case (null) { [] };
      case (?product) { [product.downloadUrl] };
    };

    let order : Order = {
      id = orderIdCounter;
      items = [item];
      total;
      status = "Pending";
      customerInfo;
      downloadLinks;
    };

    orders.add(orderIdCounter, order);

    let orderId = orderIdCounter;
    orderIdCounter += 1;
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found after creation") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getOrderDownloadLinks(orderId : Nat) : async [Text] {
    switch (orders.get(orderId)) {
      case (null) { [] };
      case (?order) { order.downloadLinks };
    };
  };
};

