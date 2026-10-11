import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge } from '../components/common/Badge';
import { StatCard } from '../components/common/StatCard';
import { EmptyState } from '../components/common/EmptyState';
import { BookOpen, Check } from 'lucide-react';

describe('Reusable UI Components (Testing Library)', () => {
  describe('Badge', () => {
    it('renders children text correctly', () => {
      render(<Badge>Nhận biết</Badge>);
      expect(screen.getByText('Nhận biết')).toBeInTheDocument();
    });

    it('applies variant classes correctly', () => {
      const { container } = render(<Badge variant="burgundy">Công văn 7991</Badge>);
      expect(container.firstChild).toHaveClass('badge-soft-burgundy');
    });

    it('renders dot indicator when dot prop is true', () => {
      const { container } = render(<Badge dot variant="emerald">Hoàn thành</Badge>);
      const dot = container.querySelector('.rounded-full.bg-emerald-600');
      expect(dot).toBeInTheDocument();
    });

    it('renders optional icon when provided', () => {
      render(
        <Badge icon={<Check data-testid="check-icon" className="w-3 h-3" />}>
          Đã xác thực
        </Badge>
      );
      expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    });

    it('renders md size with larger padding class', () => {
      const { container } = render(<Badge size="md">Kích thước lớn</Badge>);
      expect(container.firstChild).toHaveClass('px-2.5');
    });
  });

  describe('StatCard', () => {
    it('renders label, value and subtitle', () => {
      render(
        <StatCard
          label="Tổng số câu hỏi"
          value={28}
          subtitle="Đạt chuẩn 10.0 điểm"
        />
      );

      expect(screen.getByText('Tổng số câu hỏi')).toBeInTheDocument();
      expect(screen.getByText('28')).toBeInTheDocument();
      expect(screen.getByText('Đạt chuẩn 10.0 điểm')).toBeInTheDocument();
    });

    it('renders badge text when badgeText is provided', () => {
      render(
        <StatCard
          label="Tiến độ bài học"
          value="85%"
          badgeText="Sẵn sàng"
          badgeVariant="emerald"
        />
      );

      expect(screen.getByText('Sẵn sàng')).toBeInTheDocument();
    });

    it('renders progress bar when progressPercent is passed', () => {
      const { container } = render(
        <StatCard
          label="Hoàn thiện KHBD"
          value="75%"
          progressPercent={75}
        />
      );

      const progressBar = container.querySelector('[style*="width: 75%"]');
      expect(progressBar).toBeInTheDocument();
    });

    it('handles click callback when card is interactive', () => {
      const handleClick = vi.fn();
      render(
        <StatCard
          label="Thẻ tương tác"
          value="10"
          onClick={handleClick}
        />
      );

      const card = screen.getByText('Thẻ tương tác').closest('div.card-interactive');
      expect(card).toBeInTheDocument();
      fireEvent.click(card!);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('EmptyState', () => {
    it('renders title, description and calls onAction button click', () => {
      const handleAction = vi.fn();
      render(
        <EmptyState
          icon={BookOpen}
          title="Chưa có dữ liệu bài học"
          description="Hãy tạo một bài học mới để bắt đầu thiết kế kế hoạch dạy học."
          actionText="Tạo bài học mới"
          onAction={handleAction}
        />
      );

      expect(screen.getByText('Chưa có dữ liệu bài học')).toBeInTheDocument();
      expect(screen.getByText(/Hãy tạo một bài học mới/)).toBeInTheDocument();

      const button = screen.getByRole('button', { name: 'Tạo bài học mới' });
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(handleAction).toHaveBeenCalledTimes(1);
    });

    it('omits action button when actionText or onAction is not provided', () => {
      render(
        <EmptyState
          icon={BookOpen}
          title="Không có kết quả"
          description="Vui lòng thử lại với từ khóa tìm kiếm khác."
        />
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
