import { ROLES } from "@/constants/roles";

export const ROUTES_CONFIG = [
  { path: "/", roles: [ROLES.commonUser], isPublic: true },
  { path: "/admin", roles: [ROLES.admin], isPublic: false },
  { path: "/dashboard", roles: [ROLES.supplier], isPublic: false },
  { path: "/dashboard/parceiro", roles: [ROLES.supplier], isPublic: false },
  { path: "/meus-cupons", roles: [ROLES.commonUser], isPublic: false },
  {
    path: "minha-conta",
    roles: [ROLES.admin, ROLES.commonUser, ROLES.supplier],
    isPublic: false,
  },
  { path: "/parceiro/:path*", roles: [ROLES.commonUser], isPublic: true },
  { path: "/parceiro-nao-encontrado", roles: [], isPublic: true },
  { path: "/politica-privacidade", roles: [], isPublic: true },
  { path: "/criar-nova-senha/:path*", roles: [], isPublic: true },
  { path: "esqueci-a-senha", roles: [], isPublic: true },
  { path: "/acessar", roles: [], isPublic: true },
];
