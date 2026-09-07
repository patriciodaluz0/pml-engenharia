import List "mo:core/List";
import Types "../types/portfolio";
import PortfolioLib "../lib/portfolio";

mixin (projects : List.List<Types.Project>) {
  public query func listProjects() : async [Types.Project] {
    PortfolioLib.listProjects(projects)
  };

  public query func getProjectBySlug(slug : Text) : async ?Types.Project {
    PortfolioLib.getProjectBySlug(projects, slug)
  };
};
