type ViewerPayload = {
  tankerNation: string
  tankerType: string
  tankerModel: string
  receiverNation: string
  receiverType: string
  receiverModel: string
}

type ViewerResponse = {
  ok: boolean
  message?: string
}

// Send a search request to the backend.
export async function searchViewer(payload: ViewerPayload): Promise<ViewerResponse> {
  // DB hook: replace this endpoint with your backend route that queries the database.
  // Example backend flow:
  // 1) POST /api/viewer/search -> server validates payload
  // 2) server runs SQL query using the payload fields
  // 3) server returns matching compatibility rows as JSON
  const response = await fetch('/api/viewer/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Database search failed.')
  }

  return (await response.json()) as ViewerResponse
}

// Send a viewer submission to the backend.
export async function submitViewerRequest(
  payload: ViewerPayload,
): Promise<ViewerResponse> {
  // DB hook: replace this endpoint with your backend route that stores viewer requests.
  const response = await fetch('/api/viewer/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Viewer submission failed.')
  }

  return (await response.json()) as ViewerResponse
}

