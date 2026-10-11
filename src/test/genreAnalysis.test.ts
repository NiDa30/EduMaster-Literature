import { describe, it, expect } from 'vitest';
import { createLessonFixture } from './fixtures';
import { ArgumentMap, PoetryAnalysis, StoryAnalysis } from '../types';

describe('Genre Analysis & Argument Map Engine', () => {
  it('correctly loads and validates PoetryAnalysis structure', () => {
    const lesson = createLessonFixture();
    expect(lesson.genre).toBe('poetry');
    expect(lesson.poetryAnalysis).toBeDefined();

    const poetry = lesson.poetryAnalysis!;
    expect(poetry.theme.length).toBeGreaterThan(0);
    expect(poetry.imagery.length).toBeGreaterThanOrEqual(1);
    expect(poetry.keywords.length).toBeGreaterThanOrEqual(1);
    expect(poetry.emotionalFlow.length).toBeGreaterThan(0);
    expect(poetry.rhetoricalDevices.length).toBeGreaterThanOrEqual(1);
    expect(poetry.contentValue.length).toBeGreaterThan(0);
    expect(poetry.artisticValue.length).toBeGreaterThan(0);
  });

  it('validates StoryAnalysis structure when genre is story', () => {
    const storyAnalysis: StoryAnalysis = {
      characters: [
        {
          name: 'Tràng',
          role: 'Nhân vật chính',
          traits: ['Chất phác', 'Nhân hậu', 'Khát khao hạnh phúc'],
          psychologicalShift: 'Từ ngỡ ngàng, lo lắng đến trách nhiệm và tràn đầy niềm hy vọng.',
          quote: 'Tràng cười: "Làm đếch gì có vợ!"'
        }
      ],
      events: ['Tràng dẫn thị về nhà', 'Bà cụ Tứ gặp con dâu mới', 'Bữa cơm ngày đói đón giao thừa'],
      storySituation: 'Nhặt được vợ trong cảnh đói khát cùng cực.',
      psychologicalShift: 'Sự biến chuyển tâm lý kỳ diệu của các nhân vật trước ngưỡng cửa hạnh phúc.',
      pointOfView: 'Ngôi thứ ba khách quan, giàu cảm thông.',
      narrator: 'Người kể chuyện giấu mình.',
      artisticDetails: ['Nồi cháo cám chát xít', 'Tiếng trống thúc thuế dồn dập'],
      themes: ['Tình người trong nạn đói', 'Sức sống bất diệt của con người'],
      message: 'Trong bóng tối của nạn đói, con người vẫn hướng về sự sống và ánh sáng tương lai.'
    };

    expect(storyAnalysis.characters).toHaveLength(1);
    expect(storyAnalysis.characters[0].traits).toHaveLength(3);
    expect(storyAnalysis.artisticDetails).toHaveLength(2);
    expect(storyAnalysis.message.length).toBeGreaterThan(0);
  });

  describe('Argument Map Tree Operations', () => {
    const initialMap: ArgumentMap = {
      thesis: 'Khắc họa bức tượng đài bi tráng về người lính Tây Tiến.',
      claims: [
        {
          id: 'c-1',
          title: 'Luận điểm 1: Vẻ đẹp bi tráng trên nền thiên nhiên miền Tây hùng vĩ',
          reasons: [
            {
              id: 'r-1',
              text: 'Thiên nhiên hoang sơ hiểm trở tôn vinh tầm vóc người lính',
              evidences: [
                {
                  id: 'e-1',
                  text: 'Dốc lên khúc khuỷu dốc thăm thẳm',
                  quote: 'Dốc lên khúc khuỷu dốc thăm thẳm / Heo hút cồn mây súng ngửi trời'
                }
              ]
            }
          ]
        }
      ],
      conclusion: 'Tây Tiến là kiệt tác thơ ca kháng chiến chống Pháp.'
    };

    it('adds a new claim with sub-reasons and evidences to Argument Map', () => {
      const newClaim = {
        id: 'c-2',
        title: 'Luận điểm 2: Tâm hồn hào hoa và tinh thần bất tử',
        reasons: [
          {
            id: 'r-2',
            text: 'Dù gian khổ hy sinh, người lính vẫn tràn đầy mộng đẹp',
            evidences: [
              {
                id: 'e-2',
                text: 'Mắt trừng gửi mộng qua biên giới',
                quote: 'Mắt trừng gửi mộng qua biên giới / Đêm mơ Hà Nội dáng kiều thơm'
              }
            ]
          }
        ]
      };

      const updatedMap: ArgumentMap = {
        ...initialMap,
        claims: [...initialMap.claims, newClaim]
      };

      expect(updatedMap.claims).toHaveLength(2);
      expect(updatedMap.claims[1].title).toBe('Luận điểm 2: Tâm hồn hào hoa và tinh thần bất tử');
      expect(updatedMap.claims[1].reasons[0].evidences[0].quote).toContain('dáng kiều thơm');
    });

    it('adds a reason with evidence into an existing claim', () => {
      const mapCopy = JSON.parse(JSON.stringify(initialMap)) as ArgumentMap;
      const targetClaim = mapCopy.claims[0];

      targetClaim.reasons.push({
        id: 'r-1-b',
        text: 'Nghệ thuật tương phản giữa hoang vu và ấm áp tình quân dân',
        evidences: [
          {
            id: 'e-1-b',
            text: 'Mường Lát hoa về trong đêm hơi',
            quote: 'Nhớ ôi Tây Tiến cơm lên khói / Mai Châu mùa em thơm nếp xôi'
          }
        ]
      });

      expect(targetClaim.reasons).toHaveLength(2);
      expect(targetClaim.reasons[1].id).toBe('r-1-b');
      expect(targetClaim.reasons[1].text).toContain('tương phản');
      expect(targetClaim.reasons[1].evidences[0].text).toContain('Mường Lát');
    });

    it('safeguards against deleting the last remaining claim', () => {
      const handleDeleteClaim = (map: ArgumentMap, idx: number): ArgumentMap => {
        if (map.claims.length <= 1) return map;
        return {
          ...map,
          claims: map.claims.filter((_, i) => i !== idx)
        };
      };

      const result = handleDeleteClaim(initialMap, 0);
      expect(result.claims).toHaveLength(1);
      expect(result.claims[0].id).toBe('c-1');
    });
  });
});
