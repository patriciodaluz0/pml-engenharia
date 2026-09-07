import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Types "../types/store";

module {
  public func listProducts(products : Map.Map<Types.ProductId, Types.Product>) : [Types.ProductSummary] {
    products.values().map(func p = {
      id = p.id;
      title = p.title;
      slug = p.slug;
      category = p.category;
      description = p.description;
      price = p.price;
      image = p.image;
    }).toArray()
  };

  public func getProduct(products : Map.Map<Types.ProductId, Types.Product>, id : Types.ProductId) : ?Types.Product {
    products.get(id)
  };

  public func getProductBySlug(products : Map.Map<Types.ProductId, Types.Product>, slug : Text) : ?Types.Product {
    products.values().find(func p = p.slug == slug)
  };
};
