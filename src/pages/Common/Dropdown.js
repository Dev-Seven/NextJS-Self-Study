import React from 'react'

import { Field } from 'formik'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

function Dropdown({ options, label, name, form }) {
  const { setFieldValue } = form

  const handleBlur = event => {
    const selectedOption = event.target.value
    const selectedOptionObject = options.find(option => option.value === selectedOption)
    const selectedOptionId = selectedOptionObject ? selectedOptionObject.id : null

    setFieldValue(`${name}.id`, selectedOptionId)
  }

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Field name={name}>
        {({ field }) => (
          <Select {...field} onBlur={handleBlur}>
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      </Field>
    </FormControl>
  )
}

export default Dropdown
