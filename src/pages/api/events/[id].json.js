export const PUT = async ({ params, request, locals }) => {
  const db = locals.runtime.env.DB
  const { id } = params

  try {
    const data = await request.json()
    const { title, event_date, start_time, assigned_to, category, notes } = data

    await db
      .prepare(
        `UPDATE events 
         SET title = ?, event_date = ?, start_time = ?, assigned_to = ?, category = ?, notes = ? 
         WHERE id = ?`
      )
      .bind(
        title, 
        event_date, 
        start_time || null, 
        assigned_to || 'Family', 
        category || 'General', 
        notes || null, 
        id
      )
      .run()

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

export const DELETE = async ({ params, locals }) => {
  const db = locals.runtime.env.DB
  const { id } = params

  try {
    await db.prepare('DELETE FROM events WHERE id = ?').bind(id).run()
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
