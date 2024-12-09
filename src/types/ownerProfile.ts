import { FamilyRole, Gender, Provider } from '~types/common'

export interface OwnerProfileType {
  memberId?: number
  name: string
  email: string
  provider: Provider
  gender: Gender
  address: string
  familyRole: FamilyRole
  profileImg: string
}
