export type SubmissionStatus = 'Pending Review' | 'Approved' | 'Rejected'

export type SRD_holderFormValues = {
  nationOrganisation: string
  tankerType: string
  tankerModel: string
  receiverNation: string
  receiverType: string
  receiverModel: string
  cTanker: string
  cReciever: string
  vSrdT: string
  vSrdR: string
  refuellingInterface: string
  minimumFlightLevel: string
  maximumFlightLevel: string
  minimumKcas: string
  maximumKcas: string
  maxAsM: string
  planningFuelTransferRate: string
  comment: string
}

export type SRD_holderSubmission = SRD_holderFormValues & {
  id: string
  status: SubmissionStatus
  createdAt: string
}

const STORAGE_KEY = 'aar_srd_holder_submissions'

// Convert old stored status values to the current English labels.
function normalizeStatus(status: unknown): SubmissionStatus {
  if (status === 'Goedgekeurd' || status === 'Approved') return 'Approved'
  if (status === 'Afgewezen' || status === 'Rejected') return 'Rejected'
  return 'Pending Review'
}

// Load saved submissions from browser storage.
export function loadSubmissions(): SRD_holderSubmission[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as unknown) : []
    if (!Array.isArray(parsed)) return []
    return parsed.map((item) => {
      const submission = item as SRD_holderSubmission
      return { ...submission, status: normalizeStatus(submission.status) }
    })
  } catch {
    return []
  }
}

// Save submissions to browser storage.
function saveSubmissions(submissions: SRD_holderSubmission[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions))
}

// Create a unique id for one submission.
const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

// Add a new submission and persist it.
export function addSubmission(values: SRD_holderFormValues): SRD_holderSubmission[] {
  const next: SRD_holderSubmission = {
    ...values,
    id: createId(),
    status: 'Pending Review',
    createdAt: new Date().toISOString(),
  }
  const updated = [next, ...loadSubmissions()]
  saveSubmissions(updated)
  return updated
}

// Update the review status of one submission.
export function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
): SRD_holderSubmission[] {
  const updated = loadSubmissions().map((submission) =>
    submission.id === id ? { ...submission, status } : submission,
  )
  saveSubmissions(updated)
  return updated
}

// Update all editable fields for one submission.
export function updateSubmission(
  id: string,
  values: SRD_holderFormValues,
): SRD_holderSubmission[] {
  const updated = loadSubmissions().map((submission) =>
    submission.id === id ? { ...submission, ...values } : submission,
  )
  saveSubmissions(updated)
  return updated
}
