import React, { useState } from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GuidedTourProvider, useTour } from '../components/tour';
import { FULL_TOUR_STEPS } from '../config/tourSteps';
import { ActiveModule } from '../types';
import { TOUR_STORAGE_KEY, saveTourPreferences } from '../utils/tourUtils';
import { initialAppState } from '../data/presets';

// Harness component simulating App with GuidedTourProvider
function TourTestApp({
  initialModule = 'dashboard',
  onModuleChange,
}: {
  initialModule?: ActiveModule;
  onModuleChange?: (m: ActiveModule) => void;
}) {
  const [currentModule, setCurrentModule] = useState<ActiveModule>(initialModule);

  const handleModuleChange = (mod: ActiveModule) => {
    setCurrentModule(mod);
    if (onModuleChange) onModuleChange(mod);
  };

  return (
    <GuidedTourProvider
      currentModule={currentModule}
      setActiveModule={handleModuleChange}
      steps={FULL_TOUR_STEPS}
    >
      <TourTestAppInner currentModule={currentModule} />
    </GuidedTourProvider>
  );
}

function TourTestAppInner({ currentModule }: { currentModule: ActiveModule }) {
  const { openTour, startTour, stopTour, isActive, currentStepIndex } = useTour();

  return (
    <div>
      {/* TopBar mock */}
      <header>
        <button onClick={openTour} data-testid="topbar-tour-btn">
          Hướng dẫn
        </button>
        <div data-tour-id="lesson-switcher">Tác phẩm hiện tại</div>
        <div data-tour-id="autosave-status">Đã lưu</div>
        <button data-tour-id="focus-mode">Tập trung</button>
      </header>

      {/* Sidebar mock */}
      <aside data-tour-id="sidebar">
        <span>Menu bên trái</span>
      </aside>

      {/* Dynamic Views */}
      <main>
        {currentModule === 'dashboard' && (
          <div data-tour-id="dashboard-resume">Resume Card Dashboard</div>
        )}
        {currentModule === 'workspace' && (
          <div>
            <div data-tour-id="reader-tools">Thanh công cụ đọc</div>
            <article data-tour-id="reader-content">Nội dung tác phẩm</article>
          </div>
        )}
        {currentModule === 'genre_analysis' && (
          <div data-tour-id="genre-tabs">Các tab thể loại</div>
        )}
      </main>

      <div data-testid="active-status">{isActive ? 'ACTIVE' : 'INACTIVE'}</div>
      <div data-testid="current-step-index">{currentStepIndex}</div>
    </div>
  );
}

describe('Guided Tour - Interaction, Routing, A11y & Persistence Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    // Default seen intro to avoid auto-intro modal interfering with manual click tests
    localStorage.setItem(
      TOUR_STORAGE_KEY,
      JSON.stringify({ hasSeenIntro: true, dismissedIntro: true })
    );
  });

  it('TOUR-FUNC-001: Starts tour, renders popover, and navigates Next/Back', async () => {
    render(<TourTestApp initialModule="dashboard" />);

    // Click TopBar tour button
    const tourBtn = screen.getByTestId('topbar-tour-btn');
    fireEvent.click(tourBtn);

    // Popover should appear with Step 1
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Chào mừng đến với EduMaster Văn')).toBeInTheDocument();
      expect(screen.getByText(/Bước 1 \/ 25/)).toBeInTheDocument();
    });

    // Click "Tiếp theo"
    const nextBtn = screen.getByRole('button', { name: /Tiếp theo/i });
    fireEvent.click(nextBtn);

    // Should advance to Step 2 (Sidebar)
    await waitFor(() => {
      expect(screen.getByText('Các phân hệ chính')).toBeInTheDocument();
      expect(screen.getByText(/Bước 2 \/ 25/)).toBeInTheDocument();
    });

    // Click "Quay lại"
    const backBtn = screen.getByRole('button', { name: /Quay lại/i });
    fireEvent.click(backBtn);

    // Should return to Step 1
    await waitFor(() => {
      expect(screen.getByText('Chào mừng đến với EduMaster Văn')).toBeInTheDocument();
      expect(screen.getByText(/Bước 1 \/ 25/)).toBeInTheDocument();
    });
  });

  it('TOUR-INT-001: "Bỏ qua" button skips current step to next step without closing tour', async () => {
    render(<TourTestApp initialModule="dashboard" />);

    fireEvent.click(screen.getByTestId('topbar-tour-btn'));

    await waitFor(() => {
      expect(screen.getByText(/Bước 1 \/ 25/)).toBeInTheDocument();
    });

    // Click "Bỏ qua"
    const skipBtn = screen.getByRole('button', { name: /Bỏ qua/i });
    fireEvent.click(skipBtn);

    // Should advance to Step 2, and tour remains active
    await waitFor(() => {
      expect(screen.getByText(/Bước 2 \/ 25/)).toBeInTheDocument();
      expect(screen.getByTestId('active-status')).toHaveTextContent('ACTIVE');
    });
  });

  it('TOUR-INT-002: Stop tour button triggers confirmation dialog; continue resumes and stop closes', async () => {
    render(<TourTestApp initialModule="dashboard" />);

    fireEvent.click(screen.getByTestId('topbar-tour-btn'));

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Click stop / X button
    const stopBtn = screen.getByTitle('Dừng hướng dẫn');
    fireEvent.click(stopBtn);

    // Confirm dialog appears
    await waitFor(() => {
      expect(screen.getByText('Dừng hướng dẫn?')).toBeInTheDocument();
      expect(screen.getByText(/Bạn có thể mở lại hướng dẫn bất kỳ lúc nào/)).toBeInTheDocument();
    });

    // Click "Tiếp tục hướng dẫn"
    const continueBtn = screen.getByRole('button', { name: /Tiếp tục hướng dẫn/i });
    fireEvent.click(continueBtn);

    // Popover is back
    await waitFor(() => {
      expect(screen.queryByText('Dừng hướng dẫn?')).not.toBeInTheDocument();
      expect(screen.getByText('Chào mừng đến với EduMaster Văn')).toBeInTheDocument();
    });

    // Click stop again and confirm stop
    fireEvent.click(screen.getByTitle('Dừng hướng dẫn'));
    await waitFor(() => {
      expect(screen.getByText('Dừng hướng dẫn?')).toBeInTheDocument();
    });

    const confirmStopBtn = screen.getByRole('button', { name: /^Dừng$/i });
    fireEvent.click(confirmStopBtn);

    // Tour should be closed
    await waitFor(() => {
      expect(screen.getByTestId('active-status')).toHaveTextContent('INACTIVE');
    });
  });

  it('TOUR-ROUTE-001: Auto-navigates across modules when step target is in different route', async () => {
    const onModuleChange = vi.fn();
    render(<TourTestApp initialModule="dashboard" onModuleChange={onModuleChange} />);

    // Start tour directly at step 4 (last dashboard step)
    fireEvent.click(screen.getByTestId('topbar-tour-btn'));

    // Move from Step 1 to Step 5
    for (let i = 0; i < 4; i++) {
      await waitFor(() => screen.getByRole('button', { name: /Tiếp theo/i }));
      fireEvent.click(screen.getByRole('button', { name: /Tiếp theo/i }));
    }

    await waitFor(() => {
      expect(screen.getByText(/Bước 5 \/ 25/)).toBeInTheDocument();
      expect(screen.getByText('Tiếp tục công việc')).toBeInTheDocument();
    });

    // Next step is Step 6 (Literature Workspace, module: 'workspace')
    fireEvent.click(screen.getByRole('button', { name: /Tiếp theo/i }));

    // Should call module switch to 'workspace'
    await waitFor(() => {
      expect(onModuleChange).toHaveBeenCalledWith('workspace');
    });
  });

  it('TOUR-PERSIST-001: Offers resume option when re-opening tour with stored progress', async () => {
    // Seed existing progress at step 4
    saveTourPreferences({
      hasSeenIntro: true,
      lastStepIndex: 4,
      completedFullTour: false,
    });

    render(<TourTestApp initialModule="dashboard" />);

    // Click TopBar tour button
    fireEvent.click(screen.getByTestId('topbar-tour-btn'));

    // Resume modal appears
    await waitFor(() => {
      expect(screen.getByText('Tiếp tục hướng dẫn?')).toBeInTheDocument();
      expect(screen.getByText(/Bạn đã xem đến/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Tiếp tục/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Bắt đầu lại/i })).toBeInTheDocument();
    });

    // Click "Tiếp tục"
    fireEvent.click(screen.getByRole('button', { name: /Tiếp tục/i }));

    // Tour should resume at Step 5
    await waitFor(() => {
      expect(screen.getByText(/Bước 5 \/ 25/)).toBeInTheDocument();
    });
  });

  it('TOUR-A11Y-001: Provides accessible dialog attributes and keyboard navigation (ArrowRight, ArrowLeft, Escape)', async () => {
    render(<TourTestApp initialModule="dashboard" />);

    fireEvent.click(screen.getByTestId('topbar-tour-btn'));

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');
    });

    // ArrowRight advances step
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    await waitFor(() => {
      expect(screen.getByText(/Bước 2 \/ 25/)).toBeInTheDocument();
    });

    // ArrowLeft moves back
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    await waitFor(() => {
      expect(screen.getByText(/Bước 1 \/ 25/)).toBeInTheDocument();
    });

    // Escape opens stop confirmation
    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.getByText('Dừng hướng dẫn?')).toBeInTheDocument();
    });
  });

  it('TOUR-DATA-001: Tour operation does not modify preset or user lesson data', async () => {
    const originalLessonsSnapshot = JSON.stringify(initialAppState.lessons);

    render(<TourTestApp initialModule="dashboard" />);

    fireEvent.click(screen.getByTestId('topbar-tour-btn'));

    await waitFor(() => {
      expect(screen.getByText(/Bước 1 \/ 25/)).toBeInTheDocument();
    });

    // Navigate a few steps
    fireEvent.click(screen.getByRole('button', { name: /Tiếp theo/i }));
    await waitFor(() => {
      expect(screen.getByText(/Bước 2 \/ 25/)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Tiếp theo/i }));
    await waitFor(() => {
      expect(screen.getByText(/Bước 3 \/ 25/)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Bỏ qua/i }));
    await waitFor(() => {
      expect(screen.getByText(/Bước 4 \/ 25/)).toBeInTheDocument();
    });

    // Verify initial lesson data was never mutated
    expect(JSON.stringify(initialAppState.lessons)).toBe(originalLessonsSnapshot);
  });
});
