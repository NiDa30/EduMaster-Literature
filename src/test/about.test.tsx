import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AboutPage } from '../components/about/AboutPage';
import { ownerProfile } from '../config/ownerProfile';
import { resolveModuleAlias } from '../App';

describe('About page', () => {
  it('resolves the global hash route and renders owner identity and version', () => {
    expect(resolveModuleAlias('#/about')).toBe('about');
    render(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();
    for (const value of [ownerProfile.fullName, ownerProfile.institution, ownerProfile.address]) {
      expect(screen.getAllByText(value).length).toBeGreaterThan(0);
    }
    expect(screen.getByText('v4.0')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Gửi email' })).toHaveAttribute('href', `mailto:${ownerProfile.email}`);
  });
  it('copies the actual email and announces success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(<AboutPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Sao chép email' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Đã sao chép địa chỉ email.'));
    expect(writeText).toHaveBeenCalledWith(ownerProfile.email);
  });
  it('announces clipboard failure without claiming success', async () => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) } });
    render(<AboutPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Sao chép email' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Không thể sao chép.'));
  });
});
