export const DELETE = async ({ params, locals }) => {
  const db = locals.runtime.env.DB;
  const { id } = params;

  try {
    await db.prepare('DELETE FROM events WHERE id = ?').bind(id).run();
    return new Response(JSON.stringify({ deleted: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};