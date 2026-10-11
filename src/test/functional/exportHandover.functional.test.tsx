import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExportHandoverView } from '../../components/ExportHandoverView';
import { createAppStateFixture } from '../fixtures';
import { AppState } from '../../types';

describe('Functional: Export Handover & State Backup/Restore', () => {
  let mockAppState: AppState;
  let onRestoreState: any;

  beforeEach(() => {
    mockAppState = createAppStateFixture();
    onRestoreState = vi.fn();
    vi.clearAllMocks();
  });

  it('renders JSON handover block containing current state data', () => {
    render(
      <ExportHandoverView
        appState={mockAppState}
        onRestoreState={onRestoreState}
      />
    );

    expect(screen.getByText(/Xuất tài liệu & Sao lưu dữ liệu/i)).toBeInTheDocument();
    expect(screen.getByText(/Đầy đủ hệ sinh thái Ngữ văn THPT/i)).toBeInTheDocument();
  });

  it('copies JSON state to clipboard when clicking "Sao chép bản sao lưu"', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    render(
      <ExportHandoverView
        appState={mockAppState}
        onRestoreState={onRestoreState}
      />
    );

    const copyBtn = screen.getAllByRole('button', { name: /Sao chép bản sao lưu/i })[0];
    fireEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledTimes(1);
    expect(writeTextMock).toHaveBeenCalledWith(
      expect.stringContaining('"version"')
    );
  });

  it('downloads JSON backup file when clicking "Tải bản sao lưu"', () => {
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    render(
      <ExportHandoverView
        appState={mockAppState}
        onRestoreState={onRestoreState}
      />
    );

    const downloadBtn = screen.getByRole('button', { name: /Tải bản sao lưu/i });
    fireEvent.click(downloadBtn);

    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
  });

  describe('JSON Restore Form Validation', () => {
    it('restores state successfully when valid JSON is provided', () => {
      render(
        <ExportHandoverView
          appState={mockAppState}
          onRestoreState={onRestoreState}
        />
      );

      const validJson = JSON.stringify({
        ...mockAppState,
        currentLessonId: 'restored-lesson-id'
      });

      const textarea = screen.getByPlaceholderText(/Dán nội dung tệp sao lưu/i);
      fireEvent.change(textarea, { target: { value: validJson } });

      const restoreBtn = screen.getByRole('button', { name: /Khôi phục dữ liệu/i });
      fireEvent.click(restoreBtn);

      expect(onRestoreState).toHaveBeenCalledTimes(1);
      const restored = onRestoreState.mock.calls[0][0];
      expect(restored.currentLessonId).toBe('restored-lesson-id');
    });

    it('displays error message when invalid/malformed JSON is submitted', () => {
      render(
        <ExportHandoverView
          appState={mockAppState}
          onRestoreState={onRestoreState}
        />
      );

      const textarea = screen.getByPlaceholderText(/Dán nội dung tệp sao lưu/i);
      fireEvent.change(textarea, { target: { value: '{ invalid_json_syntax: true, }' } });

      const restoreBtn = screen.getByRole('button', { name: /Khôi phục dữ liệu/i });
      fireEvent.click(restoreBtn);

      expect(onRestoreState).not.toHaveBeenCalled();
      expect(screen.getByText(/Expected property name|Unexpected token|position/i)).toBeInTheDocument();
    });

    it('displays validation error when JSON is missing core subsystems (khbd, exam, slides)', () => {
      render(
        <ExportHandoverView
          appState={mockAppState}
          onRestoreState={onRestoreState}
        />
      );

      // JSON missing khbd, exam, slides
      const incompleteJson = JSON.stringify({
        version: '3.0.0',
        lessons: []
      });

      const textarea = screen.getByPlaceholderText(/Dán nội dung tệp sao lưu/i);
      fireEvent.change(textarea, { target: { value: incompleteJson } });

      const restoreBtn = screen.getByRole('button', { name: /Khôi phục dữ liệu/i });
      fireEvent.click(restoreBtn);

      expect(onRestoreState).not.toHaveBeenCalled();
      expect(screen.getByText(/thiếu các phân hệ cốt lõi/i)).toBeInTheDocument();
    });
  });
});
