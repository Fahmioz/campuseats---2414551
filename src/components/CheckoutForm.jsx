import { useState } from 'react'

const MAHALLAHS = [
  'Ali',
  'Aminah',
  'Faruq',
  'Asiah',
  'Bilal',
  'Hafsa',
  'Uthman',
  'Zubair',
]

// A plain function: values in, errors object out. Empty object = valid.
function validate(values) {
  const errors = {}

  if (values.name.trim().length < 3) {
    errors.name = 'Enter your name (at least 3 characters).'
  }
  if (!values.mahallah) {
    errors.mahallah = 'Choose a Mahallah.'
  }
  if (!values.pickupTime || values.pickupTime < '07:00' || values.pickupTime > '22:00') {
    errors.pickupTime = 'Choose a pickup time between 07:00 and 22:00.'
  }

  return errors
}

function CheckoutForm({ onPlaceOrder }) {
  const [values, setValues] = useState({
    name: '',
    mahallah: '',
    pickupTime: '',
  })
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length === 0) {
      onPlaceOrder({ ...values, name: values.name.trim() })
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h3>Checkout</h3>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={values.name}
        onChange={handleChange}
        aria-invalid={Boolean(errors.name)}
        aria-describedby={errors.name ? 'name-error' : undefined}
      />
      {errors.name && (
        <p id="name-error" className="field-error">
          {errors.name}
        </p>
      )}

      <label htmlFor="mahallah">Mahallah</label>
      <select
        id="mahallah"
        name="mahallah"
        value={values.mahallah}
        onChange={handleChange}
        aria-invalid={Boolean(errors.mahallah)}
        aria-describedby={errors.mahallah ? 'mahallah-error' : undefined}
      >
        <option value="">Select…</option>
        {MAHALLAHS.map((mahallah) => (
          <option key={mahallah} value={mahallah}>
            {mahallah}
          </option>
        ))}
      </select>
      {errors.mahallah && (
        <p id="mahallah-error" className="field-error">
          {errors.mahallah}
        </p>
      )}

      <label htmlFor="pickupTime">Pickup time</label>
      <input
        id="pickupTime"
        type="time"
        name="pickupTime"
        min="07:00"
        max="22:00"
        value={values.pickupTime}
        onChange={handleChange}
        aria-invalid={Boolean(errors.pickupTime)}
        aria-describedby={errors.pickupTime ? 'pickupTime-error' : undefined}
      />
      {errors.pickupTime && (
        <p id="pickupTime-error" className="field-error">
          {errors.pickupTime}
        </p>
      )}

      <button type="submit" className="btn">
        Place order
      </button>
    </form>
  )
}

export default CheckoutForm