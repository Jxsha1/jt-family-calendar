export const POST = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  try {
    const { year_month, content } = await request.json();
    await db
      .prepare(
        'INSERT INTO monthly_notes (year_month, content, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(year_month) DO UPDATE SET content = excluded.content, updated_at = CURRENT_TIMESTAMP'
      )
      .bind(year_month, content)
      .run();

    return new Response(JSON.stringify({ saved: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};