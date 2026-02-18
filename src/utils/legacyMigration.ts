import apiClient from "../services/apiClient";

export async function migrateLegacyData() {
    console.log('Starting migration of legacy data...');

    // 1. Read data from localStorage
    const assessmentsRaw = localStorage.getItem('lms_assessments');
    const interventionsRaw = localStorage.getItem('lms_interventions');
    const profileRaw = localStorage.getItem('lms_mindprint_profile');
    const userRaw = localStorage.getItem('lms_user');

    let mindprintProfile = profileRaw ? JSON.parse(profileRaw) : null;
    if (!mindprintProfile && userRaw) {
        const user = JSON.parse(userRaw);
        if (user.mindPrintProfile) {
            mindprintProfile = user.mindPrintProfile;
        }
    }

    const payload = {
        assessments: assessmentsRaw ? JSON.parse(assessmentsRaw) : [],
        interventions: interventionsRaw ? JSON.parse(interventionsRaw) : [],
        mindprintProfile
    };

    console.log(`Found ${payload.assessments.length} assessments and ${payload.interventions.length} interventions.`);

    if (payload.assessments.length === 0 && payload.interventions.length === 0 && !payload.mindprintProfile) {
        return { success: true, message: 'No legacy data found to migrate.' };
    }

    // 2. Send to backend
    try {
        const { data } = await apiClient.post('/students/migrate-data', payload);
        console.log('Migration successful:', data);
        return { success: true, message: 'Migration successful', details: data };
    } catch (error) {
        console.error('Migration failed:', error);
        return { success: false, message: 'Migration failed', error };
    }
}
