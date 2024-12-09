export const FAMILY_ROLE = {
  FATHER: '아빠',
  MOTHER: '엄마',
  ELDER_BROTHER: '오빠',
  OLDER_BROTHER: '형',
  ELDER_SISTER: '언니',
  OLDER_SISTER: '누나',
  GRANDFATHER: '할아버지',
  GRANDMOTHER: '할머니',
  '': '',
}
export type FamilyRoleKey = keyof typeof FAMILY_ROLE
export type FamilyRoleValue = (typeof FAMILY_ROLE)[FamilyRoleKey]
export const REVERSE_FAMILY_ROLE = Object.fromEntries(
  Object.entries(FAMILY_ROLE).map(([key, value]) => [value, key])
) as { [key in FamilyRoleValue]: FamilyRoleKey }