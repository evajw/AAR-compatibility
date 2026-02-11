export type SubmissionStatus = 'In beoordeling' | 'Goedgekeurd' | 'Afgewezen'

export type EngineerFormValues = {
  nationOrganisation: string
  aircraftType: string
  aircraftModel: string
  refuellingInterface: string
  tankerSrdCategory: string
  receiverSrdCategory: string
  minimumFlightLevel: string
  maximumFlightLevel: string
  minimumKcas: string
  maximumKcas: string
  planningFuelTransferRate: string
}

export type EngineerSubmission = EngineerFormValues & {
  id: string
  status: SubmissionStatus
  createdAt: string
}

const STORAGE_KEY = 'aar_engineer_submissions'

// Read stored submissions from the browser so pages can share the same data.
// Load saved submissions from storage.
export function loadSubmissions(): EngineerSubmission[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as unknown) : []
    return Array.isArray(parsed) ? (parsed as EngineerSubmission[]) : []
  } catch {
    return []
  }
}

// Persist the submissions so Admin and Engineer stay in sync.
// Save submissions to storage.
function saveSubmissions(submissions: EngineerSubmission[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions))
}

// Create a simple unique id for a submission.
const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

// Add a new submission with a default status.
// Add a new submission and save it.
export function addSubmission(values: EngineerFormValues): EngineerSubmission[] {
  const next: EngineerSubmission = {
    ...values,
    id: createId(),
    status: 'In beoordeling',
    createdAt: new Date().toISOString(),
  }
  const updated = [next, ...loadSubmissions()]
  saveSubmissions(updated)
  return updated
}

// Update the status so the Engineer can see Admin decisions.
// Change the status for a submission.
export function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
): EngineerSubmission[] {
  const updated = loadSubmissions().map((submission) =>
    submission.id === id ? { ...submission, status } : submission,
  )
  saveSubmissions(updated)
  return updated
}
