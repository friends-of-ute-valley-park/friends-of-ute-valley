import { describe, it, expect } from 'vitest';
import { isDateInList } from './date';

describe('isDateInList', () => {
  it('should return true if the date is in the list', () => {
    const date = new Date(2023, 5, 15); // June 15, 2023
    const list = [new Date(2023, 5, 10), new Date(2023, 5, 15), new Date(2023, 5, 20)];
    expect(isDateInList(date, list)).toBe(true);
  });

  it('should return false if the date is not in the list', () => {
    const date = new Date(2023, 5, 16);
    const list = [new Date(2023, 5, 10), new Date(2023, 5, 15), new Date(2023, 5, 20)];
    expect(isDateInList(date, list)).toBe(false);
  });

  it('should return true regardless of time components', () => {
    const date = new Date(2023, 5, 15, 10, 30, 0);
    const list = [new Date(2023, 5, 15, 14, 0, 0)];
    expect(isDateInList(date, list)).toBe(true);
  });

  it('should return false for different years', () => {
    const date = new Date(2023, 5, 15);
    const list = [new Date(2024, 5, 15)];
    expect(isDateInList(date, list)).toBe(false);
  });

  it('should return false for different months', () => {
    const date = new Date(2023, 5, 15);
    const list = [new Date(2023, 4, 15)];
    expect(isDateInList(date, list)).toBe(false);
  });

  it('should return false if list is empty', () => {
    const date = new Date(2023, 5, 15);
    const list: Date[] = [];
    expect(isDateInList(date, list)).toBe(false);
  });
});
