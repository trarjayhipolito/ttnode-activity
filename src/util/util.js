'use strict'

const jwtDecode = require('jwt-decode')

module.exports = {
  getToken
}

/**
 * Get token from the header
 * @param {*} req
 */
function getToken (req) {
  const token = req.get('TOKEN')
  let identity = null

  if (token) {
    try {
      identity = jwtDecode(token).identity
    } catch (err) {
      console.log('err', err)
    }
  }

  return identity
}

