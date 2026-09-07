module {
  public type ProductId = Nat;

  public type ProductCategory = {
    #ebook;
    #guide;
    #gerber;
    #firmware;
  };

  public type Product = {
    id : ProductId;
    title : Text;
    slug : Text;
    category : ProductCategory;
    description : Text;
    price : Nat;
    image : Text;
  };

  public type ProductSummary = {
    id : ProductId;
    title : Text;
    slug : Text;
    category : ProductCategory;
    description : Text;
    price : Nat;
    image : Text;
  };
};
