import { describe, it, expect } from 'vitest';
import { calculateRubricTotal } from '../components/LiteratureWorkspace/RubricBuilderView';
import { createRubricFixture } from './fixtures';
import { RubricData, RubricCriterion } from '../types';

describe('Rubric Calculation Engine (Đánh giá theo chuẩn GDPT 2018)', () => {
  it('correctly calculates total points for standard 10.0 rubric fixture', () => {
    const rubric = createRubricFixture();
    const { calculatedTotal, isBalanced } = calculateRubricTotal(rubric);

    expect(calculatedTotal).toBeCloseTo(10.0, 2);
    expect(isBalanced).toBe(true);
  });

  it('detects unbalance when rubric points deviate from 10.0', () => {
    const rubric = createRubricFixture();
    // Reduce one criterion by 0.5
    rubric.criteria[0].maxPoints = 0.5;

    const { calculatedTotal, isBalanced } = calculateRubricTotal(rubric);
    expect(calculatedTotal).toBe(9.5);
    expect(isBalanced).toBe(false);

    // Increase another criterion so total becomes 10.5 (9.5 + 1.0)
    rubric.criteria[1].maxPoints = 2.0;
    const resOver = calculateRubricTotal(rubric);
    expect(resOver.calculatedTotal).toBe(10.5);
    expect(resOver.isBalanced).toBe(false);
  });

  it('handles empty criteria list gracefully with 0 total', () => {
    const emptyRubric: RubricData = {
      id: 'rubric-empty',
      title: 'Rubric rỗng',
      essayType: 'nl_van_hoc',
      totalPoints: 10,
      criteria: []
    };

    const { calculatedTotal, isBalanced } = calculateRubricTotal(emptyRubric);
    expect(calculatedTotal).toBe(0);
    expect(isBalanced).toBe(false);
  });

  it('handles floating point arithmetic precision safely', () => {
    const floatRubric: RubricData = {
      id: 'rubric-float',
      title: 'Rubric số lẻ',
      essayType: 'nl_xa_hoi',
      totalPoints: 10,
      criteria: [
        { id: 'c1', name: 'T1', weight: 10, maxPoints: 0.1, description: '', levels: [] },
        { id: 'c2', name: 'T2', weight: 20, maxPoints: 0.2, description: '', levels: [] },
        { id: 'c3', name: 'T3', weight: 70, maxPoints: 9.7, description: '', levels: [] }
      ]
    };

    const { calculatedTotal, isBalanced } = calculateRubricTotal(floatRubric);
    // 0.1 + 0.2 + 9.7 = 10.000000000000002 in binary float
    expect(calculatedTotal).toBeCloseTo(10.0, 5);
    expect(isBalanced).toBe(true);
  });

  it('validates minimum criteria protection (cannot delete last criterion)', () => {
    const singleCriterionRubric: RubricData = {
      id: 'rubric-single',
      title: 'Rubric 1 tiêu chí',
      essayType: 'nl_van_hoc',
      totalPoints: 10,
      criteria: [
        {
          id: 'c-last',
          name: 'Nội dung cốt lõi',
          weight: 100,
          maxPoints: 10.0,
          description: 'Tiêu chí duy nhất',
          levels: []
        }
      ]
    };

    // Simulate delete guard: if criteria.length <= 1 return
    const handleDelete = (rubric: RubricData, id: string): RubricData => {
      if (rubric.criteria.length <= 1) return rubric;
      return {
        ...rubric,
        criteria: rubric.criteria.filter(c => c.id !== id)
      };
    };

    const afterDelete = handleDelete(singleCriterionRubric, 'c-last');
    expect(afterDelete.criteria).toHaveLength(1);
    expect(afterDelete.criteria[0].id).toBe('c-last');
  });

  it('verifies criterion level achievement progression', () => {
    const rubric = createRubricFixture();
    const firstCrit = rubric.criteria[0];

    expect(firstCrit.levels.length).toBeGreaterThanOrEqual(3);
    // Verify scores are non-negative and do not exceed maxPoints
    firstCrit.levels.forEach(lvl => {
      expect(lvl.score).toBeGreaterThanOrEqual(0);
      expect(lvl.score).toBeLessThanOrEqual(firstCrit.maxPoints);
      expect(lvl.descriptor.trim().length).toBeGreaterThan(0);
    });
  });
});
