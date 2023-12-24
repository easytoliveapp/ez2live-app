import { ROLES } from "@/constants/roles";

export const PRIVATE_ROUTES_CONFIG = [
  {
    path: "/minha-conta",
    roles: [ROLES.admin, ROLES.commonUser, ROLES.supplier],
    isPublic: false,
  },

  { path: "/admin", roles: [ROLES.admin], isPublic: false },
  { path: "/admin/parceiros", roles: [ROLES.admin], isPublic: false },
  { path: "/dashboard", roles: [ROLES.supplier], isPublic: false },
  { path: "/dashboard/parceiro", roles: [ROLES.supplier], isPublic: false },
  {
    path: "/dashboard/parceiro/ativar-cupom",
    roles: [ROLES.supplier],
    isPublic: false,
  },
  {
    path: "/dashboard/parceiro/perfil",
    roles: [ROLES.supplier],
    isPublic: false,
  },
  { path: "/meus-cupons", roles: [ROLES.commonUser], isPublic: false },
];

export const AUTH_ROUTE_PATHS = [
  "/conta/acessar",
  "/conta/entrar",
  "/conta/cadastrar/parceiro",
  "/conta/cadastrar/usuario",
  "/conta/esqueci-a-senha",
  "/conta/criar-nova-senha",
];

export const ROLE_START_URL = {
  [ROLES.commonUser]: "/meus-cupons",
  [ROLES.admin]: "/admin",
  [ROLES.supplier]: "/dashboard",
};
