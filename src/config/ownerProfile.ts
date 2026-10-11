export interface OwnerProfile {
  fullName: string;
  role: string;
  institution: string;
  address: string;
  email: string;
  systemRole: string;
  copyrightYear: number;
}

export const systemInfo = { name: 'EduMaster Văn', version: 'v4.0' } as const;

export const ownerProfile: Readonly<OwnerProfile> = {
  fullName: 'Trầm Thị Đổi',
  role: 'Giáo viên',
  institution: 'Trung tâm GDNN - GDTX Duyên Hải',
  address: 'Ấp Rạch, xã Hiệp Mỹ, Vĩnh Long',
  email: 'tramthidoi0099@gmail.com',
  systemRole: `Chủ sở hữu & quản lý ${systemInfo.name}`,
  copyrightYear: 2026,
};
