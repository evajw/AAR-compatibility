type PlannerPayload = {
  tankerNation: string
  tankerType: string
  tankerModel: string
  receiverNation: string
  receiverType: string
  receiverModel: string
}

type PlannerResponse = {
  ok: boolean
  message?: string
}

// Send a search request to the backend.
export async function searchPlanner(payload: PlannerPayload): Promise<PlannerResponse> {
  // DB hook: replace this endpoint with your backend route that queries the database.
  // Example backend flow:
  // 1) POST /api/planner/search -> server validates payload
  // 2) server runs SQL query using the payload fields
  // 3) server returns matching compatibility rows as JSON
  const response = await fetch('/api/planner/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Database search failed.')
  }

  return (await response.json()) as PlannerResponse
}

// Send a planner submission to the backend.
export async function submitPlannerRequest(
  payload: PlannerPayload,
): Promise<PlannerResponse> {
  // DB hook: replace this endpoint with your backend route that stores planner requests.
  const response = await fetch('/api/planner/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Planner submission failed.')
  }

  return (await response.json()) as PlannerResponse
}
