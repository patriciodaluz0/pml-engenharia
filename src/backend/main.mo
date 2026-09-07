import List "mo:core/List";
import Map "mo:core/Map";
import OQL "mo:caffeineai-oql";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import MapEntity "mo:caffeineai-oql/MapEntity";
import ListEntity "mo:caffeineai-oql/ListEntity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import IntValue "mo:caffeineai-oql/IntValue";
import ProductCategoryValue "types/ProductCategoryValue";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Types "types/portfolio";
import PortfolioApi "mixins/portfolio-api";
import StoreTypes "types/store";
import StoreApi "mixins/store-api";
import BlogTypes "types/blog";
import BlogApi "mixins/blog-api";
import ContactTypes "types/contact";
import ContactApi "mixins/contact-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  let projects : List.List<Types.Project>;
  let products : Map.Map<StoreTypes.ProductId, StoreTypes.Product>;
  let articles : List.List<BlogTypes.Article>;
  let messages : Map.Map<ContactTypes.MessageId, ContactTypes.Message>;
  let contactState : { var nextMessageId : Nat };

  include MixinAuthorization(accessControlState, null);
  include PortfolioApi(projects);
  include StoreApi(products);
  include BlogApi(articles);
  include ContactApi(messages, contactState);
  include ApiDocMixin();
  include Expose({
    entities = [
      OQL.Entity.manual<Types.Project>(
        "project",
        func () = projects.values(),
        "Project",
        "id",
      )
        .sample({
          id = 0;
          title = "";
          slug = "";
          category = "";
          summary = "";
          description = "";
          specifications = [];
          images = [];
          year = 0;
        })
        .payload("id", func p = p.id)
        .payload("title", func p = p.title)
        .payload("slug", func p = p.slug)
        .payload("category", func p = p.category)
        .payload("summary", func p = p.summary)
        .payload("year", func p = p.year)
        .public_()
        .build(),
      products.toEntity("product", "Product", "id")
        .sample({ id = 0; title = ""; slug = ""; category = #ebook; description = ""; price = 0; image = "" })
        .public_()
        .build(),
      articles.toEntity("article", "Article", "id")
        .sample({ id = 0; title = ""; slug = ""; category = ""; summary = ""; content = ""; publishedAt = 0; readTimeMinutes = 0 })
        .public_()
        .build(),
      OQL.Entity.manual<ContactTypes.Message>(
        "message",
        func () = messages.values(),
        "Message",
        "id",
      )
        .sample({
          id = 0;
          name = "";
          email = "";
          company = null;
          subject = "";
          body = "";
          messageType = #contact;
          status = #new;
          createdAt = 0;
        })
        .payload("id", func m = m.id)
        .payload("name", func m = m.name)
        .payload("email", func m = m.email)
        .payload("company", func m = m.company ?? "")
        .payload("subject", func m = m.subject)
        .payload("body", func m = m.body)
        .payload("messageType", func m = switch (m.messageType) { case (#contact) "contact"; case (#b2bConsultancy) "b2bConsultancy" })
        .payload("status", func m = switch (m.status) { case (#new) "new"; case (#read) "read"; case (#archived) "archived" })
        .payload("createdAt", func m = m.createdAt)
        .controllerOnly()
        .build(),
    ];
  });
};
