import apiClient from './apiClient';
import type { WmReportPayload, WmStartAttemptResponse, WmStatus, WmTimelinePoint } from '../types/workingMemory';

const LOCAL_PREFIX = 'wm_local_';

function localKey(studentId: string) {
  return `${LOCAL_PREFIX}${studentId}`;
}

function getLocalReports(studentId: string) {
  try {
    return JSON.parse(localStorage.getItem(localKey(studentId)) || '[]');
  } catch {
    return [];
  }
}

function saveLocalReports(studentId: string, reports: any[]) {
  localStorage.setItem(localKey(studentId), JSON.stringify(reports));
}

export const workingMemoryApiService = {
  async getStatus(studentId: string): Promise<WmStatus> {
    try {
      const { data } = await apiClient.get(`/mindprint/working-memory/status/${studentId}`);
      return data;
    } catch {
      const local = getLocalReports(studentId);
      const timeline = local.map((r: any) => ({ score: r.score, band: r.band, date: r.completedAt }));
      return {
        student: { id: studentId, firstName: 'Student', yearLevel: 8, learningCharacteristic: 2 },
        eligibility: { eligible: true, reason: 'offline_mode', daysRemaining: 0, nextEligibleAt: new Date().toISOString() },
        baselineCompleted: timeline.length > 0,
        lastCompletedAt: timeline.length ? timeline[timeline.length - 1].date : null,
        timeline
      };
    }
  },

  async startAttempt(studentId: string, attemptType: 'baseline' | 'checkin'): Promise<WmStartAttemptResponse> {
    const { data } = await apiClient.post('/mindprint/working-memory/start', { studentId, attemptType });
    return data;
  },

  async submitResponse(attemptId: string, itemId: string, response: any, timeMs: number, practice = false) {
    const { data } = await apiClient.post(`/mindprint/working-memory/${attemptId}/response`, {
      itemId,
      response,
      timeMs,
      practice
    });
    return data;
  },

  async completeAttempt(attemptId: string) {
    const { data } = await apiClient.post(`/mindprint/working-memory/${attemptId}/complete`);
    return data;
  },

  async getReport(attemptId: string): Promise<WmReportPayload> {
    const { data } = await apiClient.get(`/mindprint/working-memory/report/${attemptId}`);
    return data;
  },

  async getTimeline(studentId: string): Promise<WmTimelinePoint[]> {
    const { data } = await apiClient.get(`/mindprint/working-memory/timeline/${studentId}`);
    return data.timeline;
  },

  async unlock(studentId: string, reason: string) {
    const { data } = await apiClient.post(`/mindprint/working-memory/unlock/${studentId}`, { reason });
    return data;
  },

  persistOfflineReport(studentId: string, payload: { score: number; band: string; completedAt: string }) {
    const reports = getLocalReports(studentId);
    reports.push(payload);
    saveLocalReports(studentId, reports);
  }
};
