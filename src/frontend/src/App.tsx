import { Route as RootRoute } from "@/routes/__root";
import BlogPage from "@/routes/blog";
import BlogDetailPage from "@/routes/blog.$slug";
import ContatoPage from "@/routes/contato";
import HomePage from "@/routes/index";
import LojaPage from "@/routes/loja";
import LojaDetailPage from "@/routes/loja.$slug";
import PortfolioPage from "@/routes/portfolio";
import PortfolioDetailPage from "@/routes/portfolio.$slug";
import PrivacidadePage from "@/routes/privacidade";
import SobrePage from "@/routes/sobre";
import TermosPage from "@/routes/termos";
import {
  RouterProvider,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const indexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: HomePage,
});

const sobreRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/sobre",
  component: SobrePage,
});

const blogRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/blog",
  component: BlogPage,
});

const blogDetailRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/blog/$slug",
  component: BlogDetailPage,
});

const portfolioRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/portfolio",
  component: PortfolioPage,
});

const portfolioDetailRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/portfolio/$slug",
  component: PortfolioDetailPage,
});

const lojaRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/loja",
  component: LojaPage,
});

const lojaDetailRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/loja/$slug",
  component: LojaDetailPage,
});

const contatoRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/contato",
  component: ContatoPage,
});

const termosRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/termos",
  component: TermosPage,
});

const privacidadeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/privacidade",
  component: PrivacidadePage,
});

const routeTree = RootRoute.addChildren([
  indexRoute,
  sobreRoute,
  blogRoute,
  blogDetailRoute,
  portfolioRoute,
  portfolioDetailRoute,
  lojaRoute,
  lojaDetailRoute,
  contatoRoute,
  termosRoute,
  privacidadeRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
