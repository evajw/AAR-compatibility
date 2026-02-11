import { useEffect, useState } from 'react'
import '../Styles/role-pages.css'
import {
  loadSubmissions,
  updateSubmissionStatus,
  type EngineerSubmission,
} from '../Services/submissionService'

type AdminPageProps = {
  onLogout: () => void
}

// Show the admin review page.
export default function AdminPage({ onLogout }: AdminPageProps) {
  const [submissions, setSubmissions] = useState<EngineerSubmission[]>([])

  // Load forms that were submitted by Engineers.
  useEffect(() => {
    setSubmissions(loadSubmissions())
  }, [])

  // Mark a submission as approved.
  const handleApprove = (id: string) => {
    setSubmissions(updateSubmissionStatus(id, 'Goedgekeurd'))
  }

  // Mark a submission as rejected.
  const handleReject = (id: string) => {
    setSubmissions(updateSubmissionStatus(id, 'Afgewezen'))
  }

  return (
    <div className="role-page">
      <header className="role-page__header">
        <div>
          <span className="role-pill">Admin</span>
          <h1 className="role-page__title">Admin</h1>
        </div>
        <button className="btn ghost" type="button" onClick={onLogout}>
          Uitloggen
        </button>
      </header>

      <section className="role-card">
        <p className="planner-intro">
          Review incoming engineer forms and approve or reject them.
        </p>
        {submissions.length === 0 ? (
          <p className="muted">No forms submitted yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="engineer-table">
              <colgroup>
                <col className="col-nation" />
                <col className="col-type" />
                <col className="col-model" />
                <col className="col-refuel" />
                <col className="col-tanker" />
                <col className="col-recv" />
                <col className="col-minfl" />
                <col className="col-maxfl" />
                <col className="col-minkcas" />
                <col className="col-maxkcas" />
                <col className="col-fuel" />
                <col className="col-status" />
                <col className="col-actions" />
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <span title="Nation / Organisation">Nation/Org</span>
                  </th>
                  <th>
                    <span title="Aircraft type">A/C type</span>
                  </th>
                  <th>
                    <span title="Aircraft model">A/C model</span>
                  </th>
                  <th>
                    <span title="Refuelling interface type">Refuel IF</span>
                  </th>
                  <th>
                    <span title="Tanker SRD-category">Tanker SRD</span>
                  </th>
                  <th>
                    <span title="Receiver SRD-category">Recv SRD</span>
                  </th>
                  <th>
                    <span title="Minimum altitude Flight Level">Min FL</span>
                  </th>
                  <th>
                    <span title="Maximum altitude Flight Level">Max FL</span>
                  </th>
                  <th>
                    <span title="Minimum speed KCAS">Min KCAS</span>
                  </th>
                  <th>
                    <span title="Maximum speed KCAS">Max KCAS</span>
                  </th>
                  <th>
                    <span title="Planning fuel transfer rate">Fuel rate</span>
                  </th>
                  <th className="engineer-table__status">Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td data-label="Nation/Org">
                      {submission.nationOrganisation}
                    </td>
                    <td data-label="A/C type">{submission.aircraftType}</td>
                    <td data-label="A/C model">{submission.aircraftModel}</td>
                    <td data-label="Refuel IF">
                      {submission.refuellingInterface}
                    </td>
                    <td data-label="Tanker SRD">
                      {submission.tankerSrdCategory}
                    </td>
                    <td data-label="Recv SRD">
                      {submission.receiverSrdCategory}
                    </td>
                    <td data-label="Min FL">
                      {submission.minimumFlightLevel}
                    </td>
                    <td data-label="Max FL">
                      {submission.maximumFlightLevel}
                    </td>
                    <td data-label="Min KCAS">{submission.minimumKcas}</td>
                    <td data-label="Max KCAS">{submission.maximumKcas}</td>
                    <td data-label="Fuel rate">
                      {submission.planningFuelTransferRate}
                    </td>
                    <td className="engineer-table__status" data-label="Status">
                      <span
                        className={`status-tag ${
                          submission.status === 'Goedgekeurd'
                            ? 'status-tag--approved'
                            : submission.status === 'Afgewezen'
                              ? 'status-tag--rejected'
                              : 'status-tag--pending'
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td data-label="Action">
                      <div className="admin-actions">
                        <button
                          className="btn small"
                          type="button"
                          onClick={() => handleApprove(submission.id)}
                          disabled={submission.status === 'Goedgekeurd'}
                        >
                          Approve
                        </button>
                        <button
                          className="btn ghost small"
                          type="button"
                          onClick={() => handleReject(submission.id)}
                          disabled={submission.status === 'Afgewezen'}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
