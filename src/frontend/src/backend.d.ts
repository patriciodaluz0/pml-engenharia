import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductSummary {
    id: ProductId;
    title: string;
    slug: string;
    description: string;
    category: ProductCategory;
    image: string;
    price: bigint;
}
export interface Article {
    id: ArticleId;
    title: string;
    content: string;
    slug: string;
    publishedAt: bigint;
    summary: string;
    category: string;
    readTimeMinutes: bigint;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export type ArticleId = bigint;
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export interface ArticleSummary {
    id: ArticleId;
    title: string;
    slug: string;
    publishedAt: bigint;
    summary: string;
    category: string;
    readTimeMinutes: bigint;
}
export type MessageId = bigint;
export interface Cell {
    value: Value;
    name: string;
}
export interface Message {
    id: MessageId;
    status: MessageStatus;
    subject: string;
    body: string;
    name: string;
    createdAt: bigint;
    email: string;
    messageType: MessageType;
    company?: string;
}
export type ProductId = bigint;
export interface MessageSummary {
    id: MessageId;
    status: MessageStatus;
    subject: string;
    name: string;
    createdAt: bigint;
    email: string;
    messageType: MessageType;
    company?: string;
}
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export interface Specification {
    value: string;
    caption: string;
}
export interface Product {
    id: ProductId;
    title: string;
    slug: string;
    description: string;
    category: ProductCategory;
    image: string;
    price: bigint;
}
export interface Project {
    id: bigint;
    specifications: Array<Specification>;
    title: string;
    slug: string;
    year: bigint;
    description: string;
    summary: string;
    category: string;
    images: Array<string>;
}
export enum MessageStatus {
    new_ = "new",
    read = "read",
    archived = "archived"
}
export enum MessageType {
    contact = "contact",
    b2bConsultancy = "b2bConsultancy"
}
export enum ProductCategory {
    ebook = "ebook",
    firmware = "firmware",
    guide = "guide",
    gerber = "gerber"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    execute(qJson: string): Promise<Result>;
    getApiDoc(): Promise<string>;
    getArticle(id: ArticleId): Promise<Article | null>;
    getArticleBySlug(slug: string): Promise<Article | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMessage(id: MessageId): Promise<Message | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    getProductBySlug(slug: string): Promise<Product | null>;
    getProjectBySlug(slug: string): Promise<Project | null>;
    isCallerAdmin(): Promise<boolean>;
    listArticles(): Promise<Array<ArticleSummary>>;
    listMessages(): Promise<Array<MessageSummary>>;
    listProducts(): Promise<Array<ProductSummary>>;
    listProjects(): Promise<Array<Project>>;
    schema(): Promise<string>;
    submitMessage(name: string, email: string, company: string | null, subject: string, body: string, messageType: MessageType): Promise<MessageId>;
    updateMessageStatus(id: MessageId, status: MessageStatus): Promise<Message | null>;
}
