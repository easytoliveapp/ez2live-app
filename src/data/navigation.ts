import { NavItemType } from "@/components/mols/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/app",
    name: "Home Page",
    children: [
      { id: ncNanoId(), href: "/app", name: "Home  1" },
      { id: ncNanoId(), href: "/app", name: "Home  2", isNew: true },
      { id: ncNanoId(), href: "/app", name: "Header  1" },
      { id: ncNanoId(), href: "/app", name: "Header  2", isNew: true },
      { id: ncNanoId(), href: "/app", name: "Coming Soon" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/app",
    name: "Shop Pages",
    children: [
      { id: ncNanoId(), href: "/app", name: "Category Page 1" },
      { id: ncNanoId(), href: "/app", name: "Category Page 2" },
      { id: ncNanoId(), href: "/app", name: "Product Page 1" },
      { id: ncNanoId(), href: "/app", name: "Product Page 2" },
      { id: ncNanoId(), href: "/app", name: "Cart Page" },
      { id: ncNanoId(), href: "/app", name: "Checkout Page" },
    ],
  },
  {
    id: ncNanoId(),
    href: "#",
    name: "Other Pages",
    children: [
      { id: ncNanoId(), href: "/app", name: "Checkout Page" },
      { id: ncNanoId(), href: "/app", name: "Search Page" },
      { id: ncNanoId(), href: "/app", name: "Cart Page" },
      { id: ncNanoId(), href: "/app", name: "Accout Page" },
      { id: ncNanoId(), href: "/app", name: "Order Page" },
      { id: ncNanoId(), href: "/app", name: "Subscription" },
    ],
  },
  {
    id: ncNanoId(),
    href: "#",
    name: "Blog Page",
    children: [
      { id: ncNanoId(), href: "/app", name: "Blog Page" },
      { id: ncNanoId(), href: "/app", name: "Blog Single" },
      { id: ncNanoId(), href: "/app", name: "About Page" },
      { id: ncNanoId(), href: "/app", name: "Contact Page" },
      { id: ncNanoId(), href: "/app/conta/entrar", name: "Login" },
      { id: ncNanoId(), href: "/app", name: "Signup" },
      { id: ncNanoId(), href: "/app", name: "Forgot Password" },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/app",
    name: "Políticas de privacidade",
  },
  {
    id: ncNanoId(),
    href: "/app",
    name: "ajuda",
  },
];
