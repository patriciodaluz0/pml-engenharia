import OQL "mo:caffeineai-oql";
import Types "store";

module {
  public func _toRow(self : Types.ProductCategory) : OQL.Value {
    #text(switch self {
      case (#ebook) "ebook";
      case (#guide) "guide";
      case (#gerber) "gerber";
      case (#firmware) "firmware";
    })
  };
};
