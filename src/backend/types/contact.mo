module {
  /// Stable identifier for a submitted contact/consultancy message.
  public type MessageId = Nat;

  /// The kind of message a visitor can submit.
  public type MessageType = {
    #contact;
    #b2bConsultancy;
  };

  /// Lifecycle state of a submitted message.
  public type MessageStatus = {
    #new;
    #read;
    #archived;
  };

  /// A contact or B2B consultancy message submitted through the portal.
  public type Message = {
    id : MessageId;
    name : Text;
    email : Text;
    company : ?Text;
    subject : Text;
    body : Text;
    messageType : MessageType;
    status : MessageStatus;
    createdAt : Int;
  };

  /// Public view of a message returned by listing queries.
  public type MessageSummary = {
    id : MessageId;
    name : Text;
    email : Text;
    company : ?Text;
    subject : Text;
    messageType : MessageType;
    status : MessageStatus;
    createdAt : Int;
  };
};
