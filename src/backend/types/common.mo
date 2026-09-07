module {
  /// Cross-cutting identifier used across the portal's domains.
  public type UserId = Principal;

  /// Nanoseconds since the Unix epoch (matches `Time.now()`).
  public type Timestamp = Int;

  /// Common record shape for a named entity with a stable identifier.
  public type Named = {
    id : UserId;
    name : Text;
  };

  /// Common record shape for any entity that records when it was created.
  public type Dated = {
    createdAt : Timestamp;
  };
};
