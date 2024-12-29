import Airtable from 'airtable'

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_FAMILIES_TABLE, AIRTABLE_ASSIGNMENTS_TABLE } =
  process.env

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID)

const getAll = async (tableName: string): object[] => {
  const results = await base(tableName).select().all()
  return results.map((r) => r.fields)
}

export const getAssignments = async () => {
  const assignments = await getAll(AIRTABLE_ASSIGNMENTS_TABLE)
  return assignments.map((a) => ({
    year: a.Year,
    assignment: JSON.parse(a.Assignment),
    id: a.ID,
  }))
}

export const getFamilies = async () => {
  const families = await getAll(AIRTABLE_FAMILIES_TABLE)
  return families.map((f) => JSON.parse(f.Family))
}
