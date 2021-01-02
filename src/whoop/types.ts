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

interface WhoopTimePeriodData {
  bounds: string, // String indicating the type of bounds I think. Syntax unclear, e.g. [)
  lower: string, // ISO Date
  upper: string, // ISO Date
}

interface WhoopSleepData {
  cyclesCount: number, // Number of completed sleep cycles
  disturbanceCount: number, // Numberof disturbances
  during: WhoopTimePeriodData,
  id: number,
  inBedDuration: number, // milliseconds spent in bed
  isNap: boolean,
  latencyDuration: number,
  lightSleepDuration: number,
  noDataDuration: number,
  qualityDuration: number,
  remSleepDuration: number,
  respiratoryRate: number,
  responded: boolean,
  score: number, // Out of 100
  sleepConsistency: number, // Out of 100
  sleepEfficiency: number,
  slowWaveSleepDuration: number,
  source: string, // Likely an enum. Example: 'auto'
  state: string, // string
  surveyResponseId: number | null,
  timezoneOffset: string,
  wakeDuration: number
}

interface WhoopWorkoutData {
  altitudeChange: null, // Type currently unclear, likely number
  altitudeGain: null, // Type currently unclear, likely number
  averageHeartRate: number, // in bpm
  cumulativeWorkoutStrain: number,
  distance: null, // Type currently unclear, likely number
  during: WhoopTimePeriodData,
  gpsEnabled: boolean,
  id: number,
  kilojoules: number,
  maxHeartRate: number, // in bpm
  rawScore: number,
  responded: boolean,
  score: number,
  source: string, // likely enum, value 'auto'
  sportId: number, // -1, perhaps for no sport?
  state: string, // likely enum, value 'complete'
  surveyResponseId: number | null,
  timezoneOffset: string,
  zones: number[],
}

interface WhoopCycleData {
  days: string[], // Array of dates in this cycle. Always seems to be a single one.
  during: WhoopTimePeriodData,
  id: number, // int ID of this info;
  lastUpdatedAt: string // ISO Date,
  predictedEnd: string // ISO Date,
  recovery: {
    blackoutUntil: null, // Type unclear
    calibrating: boolean,
    heartRateVariabilityRmssd: number, // Heart rate variability as fraction I think
    id: number,
    responded: boolean,
    restingHeartRate: number, // In bpm
    score: number, // Score out of 100
    state: string, // Likely an enum. Provided value was 'complete'
    surveyResponseId: number | null,
    timestamp: string // ISO Date
  } | null,
  sleep: {
    id: number,
    naps: WhoopSleepData[], // Likely a nap array type. Will deep dive when I have nap data
    needBreakdown: {
      baseline: number, // number in milliseconds I think
      debt: number, // number, additional debt added in milliseconds
      naps: number, // number, time removed by naps in milliseconds
      strain: number, // number, time added by strain
      total: number, // total sleep = baseline + debt + strain - naps
    },
    qualityDuration: number, // Quality sleep in milliseconds
    score: number, // qualityDuration / total * 100
    sleeps: WhoopSleepData[],
    state: string, // likely an enum
  },
  strain: {
    averageHeartRate: number, // in bpm
    kilojoules: number,
    maxHeartRate: number, // in bpm
    rawScore: number,
    score: number,
    state: string,
    workouts: WhoopWorkoutData[]
  }
}

export type WhoopCyclesResponseData = WhoopCycleData[];
