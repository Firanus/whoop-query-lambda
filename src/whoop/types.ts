/* eslint-disable camelcase */

// A rough breakdown of the type structure from a single response
export interface WhoopAuthenticationResponseData {
  access_token: string,
  refresh_token: string,
  expires_in: number, // Defaults to 86400
  membershipStatus: string, // Currently only aware of the value 'active'
  user: {
    id: number, // Integer ID
    avatarUrl: string | null,
    createdAt: string, // ISO Datetime
    updatedAt: string, // ISO Datetime
    firstName: string,
    lastName: string,
    city: string,
    country: string,
    adminDivision: null, // Can likely take other values
    fullName: string,
    profile: {
      userId: number, // Seems to be the same as user id above
      bioDataId: number, // Integer ID
      height: number, // In meters (so 1.72)
      weight: number, // In kilograms
      birthday: string, // ISO Datetime (time set to midnight)
      gender: string, // values likely 'male' or 'female'
      unitSystem: string, // value 'metric'. Likely also has 'imperial', with other effects
      fitnessLevel: string // 'recreational_enthusiast', likely other values
      createdAt: string, // ISO Datetime, different to user
      updatedAt: string, // ISO Datetime,
      timezoneOffset: string, // '+0000',
      physiologicalBaseline: null, // Unaware of object structure at this time
      id: number, // Same as bioDataId
      maxHeartRate: number // In beats per minute,
      minHeartRate: number // In beats per minute,
      avgHeartRate: number | null, // In beats per minute,
      kilojoules: null, // Unaware of structure at this time
      canUploadData: boolean,
    },
    teams: [],
    preferences: {
      performanceOptimizationAssessment: boolean,
      performanceOptimizationDayOfWeek: number
    },
    email: string,
    username: string,
    privacyProfile: {
      overview: string, // Likely an enum, which contains at least value 'all'
      intensity: string, // Likely an enum, which contains at least value 'all'
      recovery: string, // Likely an enum, which contains at least value 'all'
      sleep: string, // Likely an enum, which contains at least value 'all'
      stats: string, // Likely an enum, which contains at least value 'all'
      comps: string, // Likely an enum, which contains at least value 'all'
    }
  },
  needsProfileCompletion: string, // Set to '0', likely represents boolean
  token_type: string, // Takes value 'bearer'
}
