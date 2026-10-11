import { ownerProfile } from '../config/ownerProfile';
import type { LessonPlan5512 } from '../types';

/** Update the former bundled identity without overwriting custom teacher data. */
export function migrateOwnerMetadata(plan: LessonPlan5512): LessonPlan5512 {
  const info = plan.info;
  if (!info) return plan;
  return {
    ...plan,
    info: {
      ...info,
      teacherName: info.teacherName === 'ThS. Trần Thị Thanh Tâm' ? ownerProfile.fullName : info.teacherName,
      school: info.school === 'TRƯỜNG THPT CHUYÊN LÊ HỒNG PHONG' ? ownerProfile.institution : info.school,
      department: info.school === 'TRƯỜNG THPT CHUYÊN LÊ HỒNG PHONG' && info.department === 'SỞ GD&ĐT THÀNH PHỐ HỒ CHÍ MINH' ? 'SỞ GD&ĐT VĨNH LONG' : info.department,
    },
  };
}
