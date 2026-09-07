import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/contact";

module {
  func toSummary(m : Types.Message) : Types.MessageSummary {
    {
      id = m.id;
      name = m.name;
      email = m.email;
      company = m.company;
      subject = m.subject;
      messageType = m.messageType;
      status = m.status;
      createdAt = m.createdAt;
    };
  };

  public func submitMessage(
    messages : Map.Map<Types.MessageId, Types.Message>,
    state : { var nextMessageId : Nat },
    name : Text,
    email : Text,
    company : ?Text,
    subject : Text,
    body : Text,
    messageType : Types.MessageType,
  ) : Types.MessageId {
    let id = state.nextMessageId;
    state.nextMessageId += 1;
    let message : Types.Message = {
      id;
      name;
      email;
      company;
      subject;
      body;
      messageType;
      status = #new;
      createdAt = Time.now();
    };
    messages.add(id, message);
    id
  };

  public func listMessages(messages : Map.Map<Types.MessageId, Types.Message>) : [Types.MessageSummary] {
    messages.entries().map(func ((_, m)) = toSummary(m)).toArray()
  };

  public func getMessage(messages : Map.Map<Types.MessageId, Types.Message>, id : Types.MessageId) : ?Types.Message {
    messages.get(id)
  };

  public func updateMessageStatus(messages : Map.Map<Types.MessageId, Types.Message>, id : Types.MessageId, status : Types.MessageStatus) : ?Types.Message {
    switch (messages.get(id)) {
      case (?m) {
        let updated = { m with status };
        messages.add(id, updated);
        ?updated;
      };
      case null { null };
    };
  };
};
