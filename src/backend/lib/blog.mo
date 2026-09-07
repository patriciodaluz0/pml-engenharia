import List "mo:core/List";
import Types "../types/blog";

module {
  /// Projects an internal article into its public summary shape.
  public func toSummary(a : Types.Article) : Types.ArticleSummary {
    {
      id = a.id;
      title = a.title;
      slug = a.slug;
      category = a.category;
      summary = a.summary;
      publishedAt = a.publishedAt;
      readTimeMinutes = a.readTimeMinutes;
    };
  };

  /// Returns all articles as public summaries.
  public func listArticles(articles : List.List<Types.Article>) : [Types.ArticleSummary] {
    articles.toArray().map(func a = toSummary(a));
  };

  /// Returns the full article with the given id, if it exists.
  public func getArticle(articles : List.List<Types.Article>, id : Types.ArticleId) : ?Types.Article {
    articles.find(func a = a.id == id);
  };

  /// Returns the full article with the given slug, if it exists.
  public func getArticleBySlug(articles : List.List<Types.Article>, slug : Text) : ?Types.Article {
    articles.find(func a = a.slug == slug);
  };
};
