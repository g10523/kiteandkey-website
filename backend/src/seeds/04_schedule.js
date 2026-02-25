/**
 * Seed: Initial class schedule
 *
 * Joshua (Year 10) — tutor Flynn
 *   Maths      → Monday    4:00–5:00 PM
 *   English    → Wednesday 4:00–5:00 PM
 *   Science    → Friday    4:00–5:00 PM
 *
 * Kaavy (Year 5) — tutor Duvindu
 *   Maths      → Tuesday   4:00–5:00 PM
 *   English    → Thursday  4:00–5:00 PM
 */
exports.seed = async function (knex) {
    // Clear existing schedule data
    await knex('schedule_change_requests').del();
    await knex('scheduled_classes').del();

    // Look up user IDs
    const joshua = await knex('users').where({ username: 'Joshua123' }).first();
    const kaavy = await knex('users').where({ username: 'Kaavy123' }).first();
    const flynn = await knex('users').where({ username: 'Flynn123' }).first();
    const duvindu = await knex('users').where({ username: 'Duvindu123' }).first();

    if (!joshua || !kaavy || !flynn || !duvindu) {
        console.log('  ⚠️  Skipping schedule seed — required users not found. Run 01_users seed first.');
        return;
    }

    // ═══════════════════════════════════════
    //  Joshua's Schedule (Flynn)
    // ═══════════════════════════════════════
    await knex('scheduled_classes').insert([
        {
            student_id: joshua.id,
            tutor_id: flynn.id,
            subject: 'Mathematics',
            day_of_week: 0, // Monday
            start_time: '16:00',
            end_time: '17:00',
            location: 'Online — Zoom',
            color: '#60a5fa',
            is_active: true,
        },
        {
            student_id: joshua.id,
            tutor_id: flynn.id,
            subject: 'English',
            day_of_week: 2, // Wednesday
            start_time: '16:00',
            end_time: '17:00',
            location: 'Online — Zoom',
            color: '#a78bfa',
            is_active: true,
        },
        {
            student_id: joshua.id,
            tutor_id: flynn.id,
            subject: 'Science',
            day_of_week: 4, // Friday
            start_time: '16:00',
            end_time: '17:00',
            location: 'Online — Zoom',
            color: '#34d399',
            is_active: true,
        },
    ]);

    // ═══════════════════════════════════════
    //  Kaavy's Schedule (Duvindu)
    // ═══════════════════════════════════════
    await knex('scheduled_classes').insert([
        {
            student_id: kaavy.id,
            tutor_id: duvindu.id,
            subject: 'Mathematics',
            day_of_week: 1, // Tuesday
            start_time: '16:00',
            end_time: '17:00',
            location: 'Online — Zoom',
            color: '#60a5fa',
            is_active: true,
        },
        {
            student_id: kaavy.id,
            tutor_id: duvindu.id,
            subject: 'English',
            day_of_week: 3, // Thursday
            start_time: '16:00',
            end_time: '17:00',
            location: 'Online — Zoom',
            color: '#a78bfa',
            is_active: true,
        },
    ]);

    console.log('');
    console.log('  ✅ Schedule seeded');
    console.log('     Joshua → Mon (Maths), Wed (English), Fri (Science) — Flynn');
    console.log('     Kaavy  → Tue (Maths), Thu (English) — Duvindu');
    console.log('');
};
