import { createHash } from 'node:crypto'
import type { Handler, HandlerEvent } from '@netlify/functions'

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
    }
  }

  if (event.httpMethod === 'POST') {
    const { pwd = '' } = JSON.parse(event.body)
    const hash = createHash('sha256')
    hash.update(pwd)
    const value = hash.digest('hex')
    const authenticated = [process.env.FAMILY_HASH, process.env.ADMIN_HASH].includes(value)

    const admin = process.env.ADMIN_HASH === value

    return {
      statusCode: 200,
      body: JSON.stringify({ authenticated, admin }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ msg: 'Incorrect use of the API' }),
  }
}

export { handler }
