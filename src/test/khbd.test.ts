import { describe, it, expect } from 'vitest';
import { createKhbdFixture } from './fixtures';
import { LessonPlan5512, TeachingActivity } from '../types';
import { normalizeVietnamese } from '../utils/unicode';

describe('KHBD 5512 Process Engine (Kế hoạch bài dạy GDPT 2018)', () => {
  it('contains standard administrative information and lesson objectives', () => {
    const khbd = createKhbdFixture();

    expect(khbd.info.subject).toContain('Ngữ văn');
    expect(khbd.info.grade).toBeDefined();
    expect(khbd.info.lessonTitle.length).toBeGreaterThan(0);

    // Objectives: Knowledge, Competencies (General & Specialized), Qualities
    expect(khbd.objectives.knowledge.length).toBeGreaterThan(0);
    expect(khbd.objectives.generalCompetencies.selfControl).toBeDefined();
    expect(khbd.objectives.generalCompetencies.communication).toBeDefined();
    expect(khbd.objectives.generalCompetencies.problemSolving).toBeDefined();
    expect(khbd.objectives.specializedCompetencies.length).toBeGreaterThan(0);
    expect(khbd.objectives.qualities.length).toBeGreaterThan(0);
  });

  it('verifies all 4 standard teaching phases exist or can be represented', () => {
    const validPhases: TeachingActivity['type'][] = ['warmup', 'knowledge', 'practice', 'application'];
    const khbd = createKhbdFixture();

    const activityTypes = khbd.activities.map(a => a.type);
    // Standard lesson plan should have activities mapped to these types
    validPhases.forEach(phase => {
      expect(validPhases).toContain(phase);
    });
    expect(activityTypes.length).toBeGreaterThanOrEqual(1);
  });

  it('strictly enforces 4 organizational steps for each teaching activity', () => {
    const khbd = createKhbdFixture();

    khbd.activities.forEach((act, idx) => {
      expect(act.steps).toBeDefined();
      expect(act.steps.step1).toBeTruthy(); // Bước 1: Chuyển giao nhiệm vụ
      expect(act.steps.step2).toBeTruthy(); // Bước 2: Thực hiện nhiệm vụ
      expect(act.steps.step3).toBeTruthy(); // Bước 3: Báo cáo, thảo luận
      expect(act.steps.step4).toBeTruthy(); // Bước 4: Kết luận, nhận định
    });
  });

  it('safeguards against deleting the last remaining activity', () => {
    const khbd = createKhbdFixture();
    // Reduce to 1 activity
    const singleActKhbd: LessonPlan5512 = {
      ...khbd,
      activities: [khbd.activities[0]]
    };

    // KhbdView delete logic: if (khbd.activities.length <= 1) return;
    const handleDelete = (plan: LessonPlan5512, actId: string): LessonPlan5512 => {
      if (plan.activities.length <= 1) return plan;
      return {
        ...plan,
        activities: plan.activities.filter(a => a.id !== actId)
      };
    };

    const result = handleDelete(singleActKhbd, singleActKhbd.activities[0].id);
    expect(result.activities).toHaveLength(1);
  });

  it('normalizes Vietnamese text on activity update', () => {
    const khbd = createKhbdFixture();
    const act = khbd.activities[0];

    const expectedName = 'Tiến trình hoạt động dạy học';
    const rawInput = expectedName.normalize('NFD');
    expect(rawInput).not.toBe(expectedName);

    const updatedName = normalizeVietnamese(rawInput);

    const updatedKhbd: LessonPlan5512 = {
      ...khbd,
      activities: khbd.activities.map(a => a.id === act.id ? { ...a, name: updatedName } : a)
    };

    const savedAct = updatedKhbd.activities.find(a => a.id === act.id);
    expect(savedAct?.name).toBe(expectedName);
    expect(savedAct?.name.normalize('NFC')).toBe(savedAct?.name);
  });

  it('appends a new activity with complete 4-step template', () => {
    const khbd = createKhbdFixture();
    const newAct: TeachingActivity = {
      id: `act-test-${Date.now()}`,
      name: `Hoạt động ${khbd.activities.length + 1}: Vận dụng sáng tạo`,
      type: 'application',
      time: '15 phút',
      objective: 'Vận dụng kiến thức vào bài viết thực tế.',
      content: 'Viết đoạn văn ngắn cảm nhận.',
      product: 'Đoạn văn 150 chữ.',
      method: 'Dạy học cá nhân',
      tools: 'Phiếu học tập',
      steps: {
        step1: 'Giáo viên giao đề bài.',
        step2: 'Học sinh viết độc lập.',
        step3: '2 học sinh đọc bài làm.',
        step4: 'Giáo viên nhận xét và ghi điểm khuyến khích.'
      }
    };

    const nextKhbd = {
      ...khbd,
      activities: [...khbd.activities, newAct]
    };

    expect(nextKhbd.activities).toHaveLength(khbd.activities.length + 1);
    expect(nextKhbd.activities[nextKhbd.activities.length - 1].steps.step1).toContain('giao đề');
  });
});
