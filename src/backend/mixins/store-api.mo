import Map "mo:core/Map";
import Types "../types/store";
import StoreLib "../lib/store";

mixin (products : Map.Map<Types.ProductId, Types.Product>) {
  public query func listProducts() : async [Types.ProductSummary] {
    StoreLib.listProducts(products)
  };

  public query func getProduct(id : Types.ProductId) : async ?Types.Product {
    StoreLib.getProduct(products, id)
  };

  public query func getProductBySlug(slug : Text) : async ?Types.Product {
    StoreLib.getProductBySlug(products, slug)
  };
};
