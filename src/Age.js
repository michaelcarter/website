import React from 'react'

const calculateAge = function(birthday) {
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

function Age(props) {
  const { birthday } = props
  return (
    <span>{calculateAge(birthday)}</span>
  )
}

export default Age
