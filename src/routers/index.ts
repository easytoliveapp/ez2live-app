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
  { path: "/meus-cupons", roles: [ROLES.commonUser], isPublic: false },
];

export const SIGN_IN_ROUTE_PATH = "/conta/entrar";

export const ROLE_START_URL = {
  [ROLES.commonUser]: "/meus-cupons",
  [ROLES.admin]: "/admin",
  [ROLES.supplier]: "/dashboard",
};
