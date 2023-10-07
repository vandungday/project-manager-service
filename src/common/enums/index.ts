export enum AuthType {
  Jwt,
  Public,
}

export enum EnvironmentType {
  UAT = 'UAT',
  develop = 'develop',
  staging = 'staging',
  production = 'production',
}

export enum RoleType {
  USER = 'user',
  ADMIN = 'admin',
  SUPPER_ADMIN = 'supper-admin',
}
