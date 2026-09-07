module {
  public type Specification = {
    caption : Text;
    value : Text;
  };

  public type Project = {
    id : Nat;
    title : Text;
    slug : Text;
    category : Text;
    summary : Text;
    description : Text;
    specifications : [Specification];
    images : [Text];
    year : Nat;
  };
};
