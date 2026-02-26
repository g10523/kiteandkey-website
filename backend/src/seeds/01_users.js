const { hashPassword } = require('../utils/auth');
const { hashSecurityKey, generateSecurityKey } = require('../utils/securityKeys');

/**
 * ═══════════════════════════════════════════════════════════════
 *  SEED: Kite & Key Academy — Real Accounts
 * ═══════════════════════════════════════════════════════════════
 * 
 *  ACCOUNTS:
 *  ─────────────────
 *  1x Admin     Username: Admin123 / Password: Admin123!
 * 
 *  2x Parent    : debbie123@kiteandkey.academy        / Debbie123!
 *                 kamakshi123@kiteandkey.academy       / Kamakshi123!
 * 
 *  2x Student   : joshua123@kiteandkey.academy        / Joshua123!
 *                 kaavy123@kiteandkey.academy          / Kaavy123!
 * 
 *  2x Tutor     : flynn123@kiteandkey.academy         / Flynn123!
 *                 duvindu123@kiteandkey.academy        / Duvindu123!
 * 
 *  RELATIONSHIPS:
 *  ─────────────────
 *  Joshua (Year 10) → Parent: Debbie, Tutor: Flynn
 *  Kaavy  (Year 5)  → Parent: Kamakshi, Tutor: Duvindu
 */

exports.seed = async function (knex) {
    // ─── Clear existing data (in dependency order) ───
    await knex('token_usage_logs').del().catch(() => { });
    await knex('session_logs').del().catch(() => { });
    await knex('assigned_interventions').del().catch(() => { });
    await knex('intervention_protocols').del().catch(() => { });
    await knex('assessments').del().catch(() => { });
    await knex('mindprint_profiles').del().catch(() => { });
    await knex('login_attempts').del().catch(() => { });
    await knex('security_events').del().catch(() => { });
    await knex('security_keys').del().catch(() => { });
    await knex('registration_tokens').del().catch(() => { });
    await knex('admin_profiles').del().catch(() => { });
    await knex('student_profiles').del().catch(() => { });
    await knex('tutor_profiles').del().catch(() => { });
    await knex('parent_profiles').del().catch(() => { });
    await knex('users').del().catch(() => { });

    console.log('\n═══════════════════════════════════════════════════');
    console.log('  🔐 SEEDING KITE & KEY ACADEMY');
    console.log('═══════════════════════════════════════════════════\n');

    // ═══════════════════════════════════════
    //  1. ADMIN ACCOUNT
    // ═══════════════════════════════════════
    const adminPassword = await hashPassword('Admin123!');
    const [admin] = await knex('users').insert({
        username: 'Admin123',
        email: 'admin@kiteandkey.academy',
        password_hash: adminPassword,
        role: 'admin',
        first_name: 'System',
        last_name: 'Administrator',
        is_active: true,
        is_verified: true
    }).returning('*');

    await knex('admin_profiles').insert({
        user_id: admin.id,
        can_create_tokens: true,
        can_manage_users: true,
        can_view_analytics: true,
        department: 'Academic Operations'
    });

    console.log('  ✅ Admin');
    console.log('     admin@kiteandkey.academy / Admin123!');
    console.log('');

    // ═══════════════════════════════════════
    //  2. PARENT ACCOUNTS
    // ═══════════════════════════════════════
    const debbiePassword = await hashPassword('Debbie123!');
    const [debbie] = await knex('users').insert({
        username: 'Debbie123',
        email: 'debbie123@kiteandkey.academy',
        password_hash: debbiePassword,
        role: 'parent',
        first_name: 'Debbie',
        last_name: 'Helvadjian',
        is_active: true,
        is_verified: true,
        created_by: admin.id
    }).returning('*');

    await knex('parent_profiles').insert({
        user_id: debbie.id,
        child_ids: [],
        communication_preferences: JSON.stringify({
            emailNotifications: true,
            smsAlerts: true,
            weeklyReport: true
        })
    });

    const kamakshiPassword = await hashPassword('Kamakshi123!');
    const [kamakshi] = await knex('users').insert({
        username: 'Kamakshi123',
        email: 'kamakshi123@kiteandkey.academy',
        password_hash: kamakshiPassword,
        role: 'parent',
        first_name: 'Kamakshi',
        last_name: 'Rathore',
        is_active: true,
        is_verified: true,
        created_by: admin.id
    }).returning('*');

    await knex('parent_profiles').insert({
        user_id: kamakshi.id,
        child_ids: [],
        communication_preferences: JSON.stringify({
            emailNotifications: true,
            smsAlerts: true,
            weeklyReport: true
        })
    });

    console.log('  ✅ Parents');
    console.log('     Debbie123   / Debbie123!    (Joshua\'s mum)');
    console.log('     Kamakshi123 / Kamakshi123!  (Kaavy\'s mum)');
    console.log('');

    // ═══════════════════════════════════════
    //  3. STUDENT ACCOUNTS
    // ═══════════════════════════════════════
    const joshuaPassword = await hashPassword('Joshua123!');
    const [joshua] = await knex('users').insert({
        username: 'Joshua123',
        email: 'joshua123@kiteandkey.academy',
        password_hash: joshuaPassword,
        role: 'student',
        first_name: 'Joshua',
        last_name: 'Helvadjian',
        date_of_birth: '2010-03-15',
        grade_level: 10,
        is_active: true,
        is_verified: true,
        created_by: admin.id
    }).returning('*');

    await knex('student_profiles').insert({
        user_id: joshua.id,
        enrolled_subjects: ['Mathematics', 'English', 'Science'],
        parent_id: debbie.id,
        notes: 'Year 10 student'
    });

    const kaavyPassword = await hashPassword('Kaavy123!');
    const [kaavy] = await knex('users').insert({
        username: 'Kaavy123',
        email: 'kaavy123@kiteandkey.academy',
        password_hash: kaavyPassword,
        role: 'student',
        first_name: 'Kaavy',
        last_name: 'Rathore',
        date_of_birth: '2015-07-22',
        grade_level: 5,
        is_active: true,
        is_verified: true,
        created_by: admin.id
    }).returning('*');

    await knex('student_profiles').insert({
        user_id: kaavy.id,
        enrolled_subjects: ['Mathematics', 'English'],
        parent_id: kamakshi.id,
        notes: 'Year 5 student'
    });

    // Link children to parents
    await knex('parent_profiles')
        .where({ user_id: debbie.id })
        .update({ child_ids: [joshua.id] });

    await knex('parent_profiles')
        .where({ user_id: kamakshi.id })
        .update({ child_ids: [kaavy.id] });

    console.log('  ✅ Students (linked to parents)');
    console.log('     Joshua123  / Joshua123!    Year 10 → Debbie');
    console.log('     Kaavy123   / Kaavy123!     Year 5  → Kamakshi');
    console.log('');

    // ═══════════════════════════════════════
    //  4. TUTOR ACCOUNTS
    // ═══════════════════════════════════════
    const flynnPassword = await hashPassword('Flynn123!');
    const [flynn] = await knex('users').insert({
        username: 'Flynn123',
        email: 'flynn123@kiteandkey.academy',
        password_hash: flynnPassword,
        role: 'tutor',
        first_name: 'Flynn',
        last_name: 'Thomas',
        is_active: true,
        is_verified: true,
        created_by: admin.id
    }).returning('*');

    await knex('tutor_profiles').insert({
        user_id: flynn.id,
        subjects_teaching: ['Mathematics', 'English', 'Science'],
        bio: 'Senior tutor specialising in Year 10 curriculum',
        qualifications: ['B.Ed Secondary Education'],
        specialization: 'Senior Secondary',
        assigned_student_ids: [joshua.id]
    });

    const duvinduPassword = await hashPassword('Duvindu123!');
    const [duvindu] = await knex('users').insert({
        username: 'Duvindu123',
        email: 'duvindu123@kiteandkey.academy',
        password_hash: duvinduPassword,
        role: 'tutor',
        first_name: 'Duvindu',
        last_name: 'Liyanage',
        is_active: true,
        is_verified: true,
        created_by: admin.id
    }).returning('*');

    await knex('tutor_profiles').insert({
        user_id: duvindu.id,
        subjects_teaching: ['Mathematics', 'English'],
        bio: 'Primary school specialist with a focus on foundational skills',
        qualifications: ['B.Ed Primary Education'],
        specialization: 'Primary & Junior',
        assigned_student_ids: [kaavy.id]
    });

    console.log('  ✅ Tutors (assigned to students)');
    console.log('     Flynn123   / Flynn123!     → Joshua');
    console.log('     Duvindu123 / Duvindu123!   → Kaavy');
    console.log('');

    // ═══════════════════════════════════════
    //  5. SECURITY KEYS (for future registrations)
    // ═══════════════════════════════════════
    console.log('  🔑 GENERATING SECURITY KEYS...');
    console.log('  ─────────────────────────────────────────────');

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 365);

    const keyDefinitions = [
        { role: 'admin', label: 'Admin Key #1', index: 1 },
        { role: 'parent', label: 'Parent Key #1', index: 2 },
        { role: 'parent', label: 'Parent Key #2', index: 3 },
        { role: 'student', label: 'Student Key #1', index: 4 },
        { role: 'student', label: 'Student Key #2', index: 5 },
        { role: 'tutor', label: 'Tutor Key #1', index: 6 },
        { role: 'tutor', label: 'Tutor Key #2', index: 7 },
    ];

    for (const def of keyDefinitions) {
        const plaintextKey = generateSecurityKey(def.role);
        const keyHash = await hashSecurityKey(plaintextKey);

        await knex('security_keys').insert({
            key_hash: keyHash,
            key_label: def.label,
            role: def.role,
            is_used: false,
            is_active: true,
            expires_at: expiresAt,
            created_by: admin.id
        });

        console.log(`  ${def.index}. [${def.role.toUpperCase().padEnd(7)}] ${def.label.padEnd(16)} → ${plaintextKey}`);
    }

    console.log('  ─────────────────────────────────────────────');
    console.log('');

    // ═══════════════════════════════════════
    //  SUMMARY
    // ═══════════════════════════════════════
    console.log('═══════════════════════════════════════════════════');
    console.log('  📊 SEED SUMMARY');
    console.log('═══════════════════════════════════════════════════');
    console.log('  Accounts: 7 total');
    console.log('    1 admin, 2 parents, 2 students, 2 tutors');
    console.log('');
    console.log('  Relationships:');
    console.log('    Joshua (Yr 10) → Mum: Debbie, Tutor: Flynn');
    console.log('    Kaavy  (Yr 5)  → Mum: Kamakshi, Tutor: Duvindu');
    console.log('');
    console.log('  Security Keys: 7 (for future registrations)');
    console.log('  ⚠️  Copy the keys above — they cannot be recovered!');
    console.log('═══════════════════════════════════════════════════\n');
};
