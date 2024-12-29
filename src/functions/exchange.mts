import type { Handler, HandlerEvent } from '@netlify/functions'
import { getAssignments, getFamilies } from './utils/_airtable.mts'

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
    }
  }

  if (event.httpMethod === 'GET') {
    const families = await getFamilies()
    const assignments = await getAssignments()

    return {
      statusCode: 200,
      body: JSON.stringify({ families, assignments }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ msg: 'Incorrect use of the API' }),
  }
}

export { handler }
