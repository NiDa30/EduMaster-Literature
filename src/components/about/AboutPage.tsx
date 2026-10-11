import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Copy, Mail, MapPin } from 'lucide-react';
import { ownerProfile as owner, systemInfo } from '../../config/ownerProfile';

export function AboutPage() {
  const [message, setMessage] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, []);
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(''), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(owner.email);
      setMessage('Đã sao chép địa chỉ email.');
    } catch {
      setMessage('Không thể sao chép. Vui lòng chọn và sao chép địa chỉ email bên dưới.');
    }
  }

  const details = [
    ['Họ và tên', owner.fullName], ['Chức danh', owner.role],
    ['Đơn vị công tác', owner.institution], ['Địa chỉ', owner.address],
    ['Vai trò với hệ thống', owner.systemRole],
  ];

  return (
    <div className="about-scroll">
      <article className="about-page" aria-labelledby="about-title">
        <header className="about-intro">
          <p className="about-eyebrow"><BookOpen size={18} aria-hidden="true" />{systemInfo.name}</p>
          <h1 id="about-title" ref={heading} tabIndex={-1}>Giới thiệu &amp; Chủ sở hữu</h1>
          <p>Thông tin về hệ thống EduMaster Văn và giáo viên trực tiếp quản lý, sử dụng hệ thống trong hoạt động chuyên môn.</p>
        </header>
        <section aria-labelledby="about-system">
          <h2 id="about-system">Về EduMaster Văn</h2>
          <p>EduMaster Văn là không gian hỗ trợ giáo viên Ngữ văn trong quá trình đọc tác phẩm, phân tích nội dung, xây dựng kế hoạch bài dạy, thiết kế câu hỏi, ma trận, đề kiểm tra, rubric và trình chiếu bài giảng.</p>
          <ol className="about-workflow" aria-label="Quy trình chuyên môn">
            {['Đọc tác phẩm', 'Phân tích', 'KHBD', 'Câu hỏi', 'Ma trận', 'Đề kiểm tra', 'Rubric', 'Slides', 'Xuất tài liệu'].map(step => <li key={step}>{step}</li>)}
          </ol>
        </section>
        <section aria-labelledby="about-owner">
          <h2 id="about-owner">Chủ sở hữu &amp; quản lý</h2>
          <div className="about-owner-layout">
            <div className="about-initials" aria-hidden="true">TĐ</div>
            <div>
              <h3 className="about-owner-name">{owner.fullName}</h3>
              <dl className="about-details">{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            </div>
          </div>
          <blockquote className="about-statement">{systemInfo.name} là hệ thống hỗ trợ soạn giảng và khảo thí Ngữ văn THPT do cô {owner.fullName}, {owner.role} {owner.institution}, quản lý và sử dụng trong hoạt động chuyên môn.</blockquote>
        </section>
        <section aria-labelledby="about-contact">
          <h2 id="about-contact">Liên hệ</h2>
          <p className="about-muted">Thông tin nhận diện chủ sở hữu</p>
          <div className="about-contact-grid">
            <div>
              <p className="about-contact-line"><Mail size={18} aria-hidden="true" /><a href={`mailto:${owner.email}`} aria-label={`Gửi email đến ${owner.fullName}: ${owner.email}`}>{owner.email}</a></p>
              <div className="about-actions">
                <a className="about-button about-button-primary" href={`mailto:${owner.email}`}>Gửi email</a>
                <button className="about-button" onClick={copyEmail} aria-label="Sao chép email"><Copy size={16} aria-hidden="true" />Sao chép email</button>
              </div>
              <p role="status" aria-live="polite" className="about-copy-status">{message}</p>
            </div>
            <div className="about-contact-line"><MapPin size={18} aria-hidden="true" /><div><p>{owner.institution}</p><p className="about-muted">{owner.address}</p></div></div>
          </div>
        </section>
        <div className="about-legal-grid">
          <section aria-labelledby="about-copyright"><h2 id="about-copyright">Bản quyền</h2><p>© {owner.copyrightYear} {owner.fullName}. Mọi quyền được bảo lưu.</p><p className="about-muted">EduMaster Văn được sử dụng phục vụ hoạt động chuyên môn và giảng dạy.</p></section>
          <section aria-labelledby="about-version"><h2 id="about-version">Thông tin hệ thống</h2><dl className="about-details"><div><dt>Ứng dụng</dt><dd>{systemInfo.name}</dd></div><div><dt>Phiên bản</dt><dd>{systemInfo.version}</dd></div></dl></section>
        </div>
      </article>
    </div>
  );
}
