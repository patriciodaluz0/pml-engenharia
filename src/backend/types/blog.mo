module {
  public type ArticleId = Nat;

  public type Article = {
    id : ArticleId;
    title : Text;
    slug : Text;
    category : Text;
    summary : Text;
    content : Text;
    publishedAt : Int;
    readTimeMinutes : Nat;
  };

  public type ArticleSummary = {
    id : ArticleId;
    title : Text;
    slug : Text;
    category : Text;
    summary : Text;
    publishedAt : Int;
    readTimeMinutes : Nat;
  };
};
