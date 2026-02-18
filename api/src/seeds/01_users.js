const { hashPassword } = require('../utils/auth');

exports.seed = async function (knex) {
    // Clear existing data
    await knex('token_usage_logs').del();
    await knex('session_logs').del();
    await knex('assigned_interventions').del();
    await knex('intervention_protocols').del();
    await knex('assessments').del();
    await knex('mindprint_profiles').del();
    await knex('registration_tokens').del();
    await knex('admin_profiles').del();
    await knex('student_profiles').del();
    await knex('tutor_profiles').del();
    await knex('parent_profiles').del();
    await knex('users').del();

    // Create admin user
    const adminPassword = await hashPassword('Admin@123');
    const [admin] = await knex('users').insert({
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

    // Create tutor
    const tutorPassword = await hashPassword('Tutor@123');
    const [tutor] = await knex('users').insert({
        email: 'sarah.chen@kiteandkey.academy',
        password_hash: tutorPassword,
        role: 'tutor',
        first_name: 'Sarah',
        last_name: 'Chen',
        phone: '+61 400 123 456',
        is_active: true,
        is_verified: true,
        created_by: admin.id
    }).returning('*');

    await knex('tutor_profiles').insert({
        user_id: tutor.id,
        subjects_teaching: ['Mathematics', 'English'],
        bio: 'Specialist in cognitive interventions for working memory deficits',
        qualifications: ['M.Ed in Special Education', 'Certified Cognitive Interventionist'],
        specialization: 'Working Memory & Executive Function',
        assigned_student_ids: []
    });

    // Create students
    const student1Password = await hashPassword('Student@123');
    const [student1] = await knex('users').insert({
        email: 'alex.martinez@student.kk.edu',
        password_hash: student1Password,
        role: 'student',
        first_name: 'Alex',
        last_name: 'Martinez',
        date_of_birth: '2014-03-15',
        grade_level: 10,
        is_active: true,
        is_verified: true,
        created_by: admin.id
    }).returning('*');

    await knex('student_profiles').insert({
        user_id: student1.id,
        enrolled_subjects: ['Mathematics', 'English', 'Science'],
        notes: 'Shows promise in pattern recognition, struggles with working memory tasks'
    });

    const [student2] = await knex('users').insert({
        email: 'emma.wong@student.kk.edu',
        password_hash: await hashPassword('Student@123'),
        role: 'student',
        first_name: 'Emma',
        last_name: 'Wong',
        date_of_birth: '2013-07-22',
        grade_level: 10,
        is_active: true,
        is_verified: true,
        created_by: admin.id
    }).returning('*');

    await knex('student_profiles').insert({
        user_id: student2.id,
        enrolled_subjects: ['Mathematics', 'Chemistry', 'Physics']
    });

    // Update tutor with assigned students
    await knex('tutor_profiles')
        .where({ user_id: tutor.id })
        .update({
            assigned_student_ids: [student1.id, student2.id]
        });

    console.log('✅ Seeded users successfully');
    console.log('   Admin: admin@kiteandkey.academy / Admin@123');
    console.log('   Tutor: sarah.chen@kiteandkey.academy / Tutor@123');
    console.log('   Student: alex.martinez@student.kk.edu / Student@123');
};
