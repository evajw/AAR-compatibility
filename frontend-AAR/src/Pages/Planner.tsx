import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import '../Styles/role-pages.css'
import { searchPlanner, submitPlannerRequest } from '../Services/plannerService'

type PlannerPageProps = {
  onLogout: () => void
}

type PlannerFormValues = {
  tankerNation: string
  tankerType: string
  tankerModel: string
  receiverNation: string
  receiverType: string
  receiverModel: string
}

type PlannerResultRow = {
  nationOrg: string
  tanker_type: string
  tanker_model: string
  receiver_nation: string
  receiver_type: string
  receiver_model: string
  c_tanker: string
  c_receiver: string
  v_srd_tanker: string
  v_srd_receiver: string
  boom_pod_BDA: string
  min_alt: string
  max_alt: string
  min_as: string
  max_as_kcas: string
  max_as_m: string
  fuel_flow_rate: string
  notes: string
}

const EMPTY_FORM: PlannerFormValues = {
  tankerNation: '',
  tankerType: '',
  tankerModel: '',
  receiverNation: '',
  receiverType: '',
  receiverModel: '',
}

const NATION_OPTIONS = ['MMF','Australie']
const TANKER_TYPE_OPTIONS = ['A330 MRTT']
const TANKER_MODEL_OPTIONS: Record<string, string[]> = {
  'A330 MRTT': ['KC-30M', 'KC-30A'],
  }
const RECEIVER_TYPE_OPTIONS = ['F-16', 'F-35', 'C-17', ]
const RECEIVER_MODEL_OPTIONS: Record<string, string[]> = {
  'F-16': ['A', 'B', 'C'],
  'F-35': ['A'],
  'C-17': ['A'],
}
// Show the planner page.
export default function PlannerPage({ onLogout }: PlannerPageProps) {
  const [formValues, setFormValues] = useState<PlannerFormValues>(EMPTY_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [compatibility, setCompatibility] = useState('')

  // Update the form fields when the user changes a selection.
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setError('')
    setCompatibility('')
    setFormValues((prev) => {
      if (name === 'tankerType') {
        return { ...prev, tankerType: value, tankerModel: '' }
      }
      if (name === 'receiverType') {
        return { ...prev, receiverType: value, receiverModel: '' }
      }
      return { ...prev, [name]: value }
    })
  }

  // Build the table row based on the selected fields.
  const buildResultRow = (values: PlannerFormValues) => ({
    nationOrg: [values.tankerNation, values.receiverNation]
      .filter(Boolean)
      .join(' / '),
    tanker_type: values.tankerType,
    tanker_model: values.tankerModel,
    receiver_nation: values.receiverNation,
    receiver_type: values.receiverType,
    receiver_model: values.receiverModel,
    c_tanker: '',
    c_receiver: '',
    v_srd_tanker: '',
    v_srd_receiver: '',
    boom_pod_BDA: '',
    min_alt: '',
    max_alt: '',
    min_as: '',
    max_as_kcas: '',
    max_as_m: '',
    fuel_flow_rate: '',
    notes: '',
  })

  // Create the status row from the current selections.
  const liveRow = useMemo(() => buildResultRow(formValues), [formValues])

  // Run the search request for the current selections.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await searchPlanner(formValues)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed.')
    } finally {
      setIsLoading(false)
    }
  }

  // Submit the request so it can be stored in the database.
  const handleSubmitRequest = async () => {
    setIsSubmitting(true)
    setError('')
    try {
      await submitPlannerRequest(formValues)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submit failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Build model options based on the selected tanker type.
  const tankerModelOptions = useMemo(() => {
    if (formValues.tankerType) {
      return TANKER_MODEL_OPTIONS[formValues.tankerType] ?? []
    }
    return Object.values(TANKER_MODEL_OPTIONS).flat()
  }, [formValues.tankerType])
  // Build model options based on the selected receiver type.
  const receiverModelOptions = useMemo(() => {
    if (formValues.receiverType) {
      return RECEIVER_MODEL_OPTIONS[formValues.receiverType] ?? []
    }
    return Object.values(RECEIVER_MODEL_OPTIONS).flat()
  }, [formValues.receiverType])

  return (
    <div className="role-page">
      <header className="role-page__header">
        <div>
          <span className="role-pill">Planner</span>
          <h1 className="role-page__title">Viewer</h1>
        </div>
        <button className="btn ghost" type="button" onClick={onLogout}>
          Uitloggen
        </button>
      </header>

      <section className="role-card">
        <p className="planner-intro">
          Enter the tanker and receiver details below, then press Search to
          review compatible options.
        </p>
        <form className="planner-form" onSubmit={handleSubmit}>
          <div className="planner-form__grid">
            <label className="planner-field">
              <span>Tanker Nation:</span>
              <select
                name="tankerNation"
                value={formValues.tankerNation}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                {NATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="planner-field">
              <span>Tanker Type:</span>
              <select
                name="tankerType"
                value={formValues.tankerType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                {TANKER_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="planner-field">
              <span>Tanker Model:</span>
              <select
                name="tankerModel"
                value={formValues.tankerModel}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                {tankerModelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="planner-field">
              <span>Receiver Nation:</span>
              <select
                name="receiverNation"
                value={formValues.receiverNation}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                {NATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="planner-field">
              <span>Receiver Type:</span>
              <select
                name="receiverType"
                value={formValues.receiverType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                {RECEIVER_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="planner-field">
              <span>Receiver Model:</span>
              <select
                name="receiverModel"
                value={formValues.receiverModel}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                {receiverModelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {error && <p className="planner-error">{error}</p>}
          <div className="planner-form__footer">
            <button className="btn primary" type="submit">
              {isLoading ? 'Searching...' : 'Search'}
            </button>
            <button
              className="btn ghost"
              type="button"
              onClick={handleSubmitRequest}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </section>

      <section className="role-card">
        <p className="planner-intro">Results based on your selections.</p>
        <div className="table-wrap">
          <table className="engineer-table planner-table">
            <colgroup>
              <col className="col-nation" />
              <col className="col-type" />
              <col className="col-model" />
              <col className="col-recv" />
              <col className="col-type" />
              <col className="col-model" />
              <col className="col-minfl" />
              <col className="col-minfl" />
              <col className="col-tanker" />
              <col className="col-recv" />
              <col className="col-refuel" />
              <col className="col-minfl" />
              <col className="col-maxfl" />
              <col className="col-minkcas" />
              <col className="col-maxkcas" />
              <col className="col-minkcas" />
              <col className="col-fuel" />
              <col className="col-status" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <span title="Nation / Organisation">nation/org</span>
                </th>
                <th>
                  <span title="Tanker type">T_type</span>
                </th>
                <th>
                  <span title="Tanker model">T_model</span>
                </th>
                <th>
                  <span title="Receiver nation">R_nation</span>
                </th>
                <th>
                  <span title="Receiver type">R_type</span>
                </th>
                <th>
                  <span title="Receiver model">R_model</span>
                </th>
                <th>
                  <span title="Compatibility tanker code">C_tanker</span>
                </th>
                <th>
                  <span title="Compatibility receiver code">C_receiver</span>
                </th>
                <th>
                  <span title="Valid SRD tanker">v_srd_tanker</span>
                </th>
                <th>
                  <span title="Valid SRD receiver">v_srd_receiver</span>
                </th>
                <th>
                  <span title="Boom/Pod/BDA">boom_pod_BDA</span>
                </th>
                <th>
                  <span title="Minimum altitude">min_alt</span>
                </th>
                <th>
                  <span title="Maximum altitude">max_alt</span>
                </th>
                <th>
                  <span title="Minimum airspeed">min_as</span>
                </th>
                <th>
                  <span title="Maximum airspeed (KCAS)">max_as_kcas</span>
                </th>
                <th>
                  <span title="Maximum airspeed (Mach)">max_as_m</span>
                </th>
                <th>
                  <span title="Fuel flow rate">fuel_flow_rate</span>
                </th>
                <th>
                  <span title="Notes">notes</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="nation/org">{liveRow.nationOrg}</td>
                <td data-label="tanker_type">{liveRow.tanker_type}</td>
                <td data-label="tanker_model">{liveRow.tanker_model}</td>
                <td data-label="receiver_nation">{liveRow.receiver_nation}</td>
                <td data-label="receiver_type">{liveRow.receiver_type}</td>
                <td data-label="receiver_model">{liveRow.receiver_model}</td>
                <td data-label="c_tanker">{liveRow.c_tanker}</td>
                <td data-label="c_receiver">{liveRow.c_receiver}</td>
                <td data-label="v_srd_tanker">{liveRow.v_srd_tanker}</td>
                <td data-label="v_srd_receiver">{liveRow.v_srd_receiver}</td>
                <td data-label="boom_pod_BDA">{liveRow.boom_pod_BDA}</td>
                <td data-label="min_alt">{liveRow.min_alt}</td>
                <td data-label="max_alt">{liveRow.max_alt}</td>
                <td data-label="min_as">{liveRow.min_as}</td>
                <td data-label="max_as_kcas">{liveRow.max_as_kcas}</td>
                <td data-label="max_as_m">{liveRow.max_as_m}</td>
                <td data-label="fuel_flow_rate">{liveRow.fuel_flow_rate}</td>
                <td data-label="notes">{liveRow.notes}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
