import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import List "mo:core/List";

actor {
  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
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
  };

  var productIdCounter = 0;
  var orderIdCounter = 0;

  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Principal, List.List<CartItem>>();
  let orders = Map.empty<Nat, Order>();

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Float, category : Text, imageUrl : Text) : async Nat {
    let product : Product = {
      id = productIdCounter;
      name;
      description;
      price;
      category;
      imageUrl;
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

  func getSortComparison(status : Text, statusFilter : Text) : Bool {
    status.toLower().contains(#text(statusFilter.toLower()));
  };

  public shared ({ caller }) func checkout(customerInfo : Text) : async ?Order {
    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) { cart };
    };

    let total = calculateCartTotal(cart);
    let order : Order = {
      id = orderIdCounter;
      items = cart.toArray();
      total;
      status = "Pending";
      customerInfo;
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

    let order : Order = {
      id = orderIdCounter;
      items = [item];
      total;
      status = "Pending";
      customerInfo;
    };

    orders.add(orderIdCounter, order);

    let orderId = orderIdCounter;
    orderIdCounter += 1;
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found after creation") };
      case (?order) { order };
    };
  };
};
