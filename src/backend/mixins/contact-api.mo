import Map "mo:core/Map";
import Types "../types/contact";
import ContactLib "../lib/contact";

mixin (messages : Map.Map<Types.MessageId, Types.Message>, state : { var nextMessageId : Nat }) {
  public shared func submitMessage(
    name : Text,
    email : Text,
    company : ?Text,
    subject : Text,
    body : Text,
    messageType : Types.MessageType,
  ) : async Types.MessageId {
    ContactLib.submitMessage(messages, state, name, email, company, subject, body, messageType)
  };

  public query func listMessages() : async [Types.MessageSummary] {
    ContactLib.listMessages(messages)
  };

  public query func getMessage(id : Types.MessageId) : async ?Types.Message {
    ContactLib.getMessage(messages, id)
  };

  public shared func updateMessageStatus(id : Types.MessageId, status : Types.MessageStatus) : async ?Types.Message {
    ContactLib.updateMessageStatus(messages, id, status)
  };
};
