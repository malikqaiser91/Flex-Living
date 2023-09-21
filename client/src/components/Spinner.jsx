import React from 'react'

const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center text-center margin-auto"
      style={{ margin: 'auto' }}
    >
      <div
        class="spinner-border"
        role="status"
        style={{ margin: 'auto', textAlign: 'center' }}
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
