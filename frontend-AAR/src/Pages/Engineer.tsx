import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import '../Styles/role-pages.css'

type EngineerPageProps = {
  onLogout: () => void
}

type FormValues = {
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

type FormStatus = 'In beoordeling' | 'Goedgekeurd'

type FormSubmission = FormValues & {
  id: string
  status: FormStatus
}

const EMPTY_FORM: FormValues = {
  nationOrganisation: '',
  aircraftType: '',
  aircraftModel: '',
  refuellingInterface: '',
  tankerSrdCategory: '',
  receiverSrdCategory: '',
  minimumFlightLevel: '',
  maximumFlightLevel: '',
  minimumKcas: '',
  maximumKcas: '',
  planningFuelTransferRate: '',
}

const REFUEL_INTERFACE_OPTIONS = ['Boom', 'Pod', 'HDU', 'Centre Line (CL)']
const SRD_CATEGORY_OPTIONS = ['CAT I', 'CAT II', 'CAT III']

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

export default function EngineerPage({ onLogout }: EngineerPageProps) {
  const [formValues, setFormValues] = useState<FormValues>(EMPTY_FORM)
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])

  const canSubmit = useMemo(
    () => Object.values(formValues).every((value) => value.trim().length > 0),
    [formValues],
  )

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return

    const nextSubmission: FormSubmission = {
      ...formValues,
      id: createId(),
      status: 'In beoordeling',
    }

    setSubmissions((prev) => [nextSubmission, ...prev])
    setFormValues(EMPTY_FORM)
  }

  const handleReset = () => {
    setFormValues(EMPTY_FORM)
  }

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((submission) =>
        submission.id === id
          ? { ...submission, status: 'Goedgekeurd' }
          : submission,
      ),
    )
  }

  return (
    <div className="role-page">
      <header className="role-page__header">
        <div>
          <span className="role-pill">Engineer</span>
          <h1 className="role-page__title">Engineer</h1>
          
        </div>
        <button className="btn ghost" type="button" onClick={onLogout}>
          Uitloggen
        </button>
      </header>

      <section className="role-card">
                <form className="engineer-form" onSubmit={handleSubmit}>
          <div className="engineer-form__grid">
            <label className="input-group">
              Nation / Org.
              <input
                type="text"
                name="nationOrganisation"
                value={formValues.nationOrganisation}
                onChange={handleChange}
                placeholder="NLAF"
                required
              />
            </label>
            <label className="input-group">
              Aircraft type
              <input
                type="text"
                name="aircraftType"
                value={formValues.aircraftType}
                onChange={handleChange}
                placeholder="F-16"
                required
              />
            </label>
            <label className="input-group">
              Aircraft model
              <input
                type="text"
                name="aircraftModel"
                value={formValues.aircraftModel}
                onChange={handleChange}
                placeholder="AM"
                required
              />
            </label>
            <label className="input-group">
              Refuel interface
              <select
                name="refuellingInterface"
                value={formValues.refuellingInterface}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecteer
                </option>
                {REFUEL_INTERFACE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="input-group">
              Tanker SRD
              <select
                name="tankerSrdCategory"
                value={formValues.tankerSrdCategory}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecteer
                </option>
                {SRD_CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="input-group">
              Receiver SRD
              <select
                name="receiverSrdCategory"
                value={formValues.receiverSrdCategory}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecteer
                </option>
                {SRD_CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="input-group">
              Min FL
              <input
                type="text"
                name="minimumFlightLevel"
                value={formValues.minimumFlightLevel}
                onChange={handleChange}
                placeholder="FL180"
                required
              />
            </label>
            <label className="input-group">
              Max FL
              <input
                type="text"
                name="maximumFlightLevel"
                value={formValues.maximumFlightLevel}
                onChange={handleChange}
                placeholder="FL300"
                required
              />
            </label>
            <label className="input-group">
              Min KCAS
              <input
                type="text"
                name="minimumKcas"
                value={formValues.minimumKcas}
                onChange={handleChange}
                placeholder="220"
                required
              />
            </label>
            <label className="input-group">
              Max KCAS
              <input
                type="text"
                name="maximumKcas"
                value={formValues.maximumKcas}
                onChange={handleChange}
                placeholder="300"
                required
              />
            </label>
            <label className="input-group">
              Fuel rate
              <input
                type="text"
                name="planningFuelTransferRate"
                value={formValues.planningFuelTransferRate}
                onChange={handleChange}
                placeholder="900 kg/min"
                required
              />
            </label>
          </div>
          <div className="engineer-form__actions">
            <button className="btn ghost" type="button" onClick={handleReset}>
              Leegmaken
            </button>
            <button className="btn primary" type="submit" disabled={!canSubmit}>
              Formulier opslaan
            </button>
          </div>
        </form>
      </section>

      <section className="role-card">
        <div className="role-card__header">
          <h2>Ingediende formulieren</h2>
          <span className="role-card__meta">
            {submissions.length} total
          </span>
        </div>
        {submissions.length === 0 ? (
          <p className="muted">Nog geen formulieren ingediend.</p>
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
                    <td className="engineer-table__status">
                      <span
                        className={`status-tag ${
                          submission.status === 'Goedgekeurd'
                            ? 'status-tag--approved'
                            : 'status-tag--pending'
                        }`}
                      >
                        {submission.status}
                      </span>
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
