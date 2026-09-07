import List "mo:core/List";
import Types "../types/blog";
import BlogLib "../lib/blog";

mixin (articles : List.List<Types.Article>) {
  public query func listArticles() : async [Types.ArticleSummary] {
    BlogLib.listArticles(articles);
  };

  public query func getArticle(id : Types.ArticleId) : async ?Types.Article {
    BlogLib.getArticle(articles, id);
  };

  public query func getArticleBySlug(slug : Text) : async ?Types.Article {
    BlogLib.getArticleBySlug(articles, slug);
  };
};
