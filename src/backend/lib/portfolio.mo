import List "mo:core/List";
import Types "../types/portfolio";

module {
  /// Returns all projects in the portfolio, in insertion order.
  public func listProjects(projects : List.List<Types.Project>) : [Types.Project] {
    projects.toArray()
  };

  /// Looks up a single project by its unique slug.
  public func getProjectBySlug(projects : List.List<Types.Project>, slug : Text) : ?Types.Project {
    projects.find(func p = p.slug == slug)
  };
};
