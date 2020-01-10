import React from 'react'
import classnames from 'classnames'

const InputForm = ({
  name, placeholder, value, error, type, onChange, info, disabled
}) => {
  return (
    <div className="form-group">
      <input 
        type={type} 
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder} 
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

export default InputForm