export const GET = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  const url = new URL(request.url);
  const month = url.searchParams.get('month') || new Date().toISOString().slice(0, 7);

  try {
    const { results } = await db
      .prepare('SELECT * FROM events WHERE event_date LIKE ? ORDER BY event_date ASC, start_time ASC')
      .bind(`${month}-%`)
      .all();

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const POST = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  try {
    const data = await request.json();
    const { title, event_date, start_time, end_time, assigned_to, category, notes } = data;

    await db
      .prepare(
        'INSERT INTO events (title, event_date, start_time, end_time, assigned_to, category, notes) VALUES (?, ?, ?, ?, ?, ?, ?)'
      )
      .bind(
        title,
        event_date,
        start_time || null,
        end_time || null,
        assigned_to || 'All',
        category || 'General',
        notes || null
      )
      .run();

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
