export const MISSION_LIST = [
  {
    key: 'aces',
    label: '에이스',
    explain: '1이 나온 주사위의 총합',
    score: '최대 5점',
  },
  {
    key: 'dual',
    label: '듀얼',
    explain: '2가 나온 주사위의 총합',
    score: '최대 10점',
  },
  {
    key: 'triple',
    label: '트리플',
    explain: '3이 나온 주사위의 총합',
    score: '최대 15점',
  },
  {
    key: 'quadruple',
    label: '쿼드',
    explain: '4가 나온 주사위의 총합',
    score: '최대 20점',
  },
  {
    key: 'penta',
    label: '펜타',
    explain: '5가 나온 주사위의 총합',
    score: '최대 25점',
  },
  {
    key: 'hexa',
    label: '헥사',
    explain: '6이 나온 주사위의 총합',
    score: '최대 30점',
  },
];

export const COMBINATION_LIST = [
  {
    key: 'choice',
    label: '초이스',
    explain: '조건이나 조합 없이, 5개 주사위의 총합',
    score: '최대 30점',
  },
  {
    key: 'fourKind',
    label: '포커',
    explain: '동일한 주사위 눈이 4개 이상일 때 5개 주사위의 총합. 그 외에는 0점',
    score: '최대 30점',
  },
  {
    key: 'fullHouse',
    label: '풀 하우스',
    explain:
      '3개의 주사위 값이 같고, 2개의 다른 주사위 값이 같을 때 5개 주사위의 총합. 그 외에는 0점',
    score: '최대 30점',
  },
  {
    key: 'smallStr',
    label: '스몰 스트레이트',
    explain: '연속해서 이어지는 주사위 눈이 4개 이상일 경우 고정 점수. 그 외에는 0점',
    score: '고정 15점',
  },
  {
    key: 'largeStr',
    label: '라지 스트레이트',
    explain: '연속해서 이어지는 주사위 눈이 5개일 경우 고정 점수. 그 외에는 0점',
    score: '고정 30점',
  },
  {
    key: 'yacht',
    label: '요트',
    explain: '5개 주사위의 눈이 모두 동일할 경우 고정 점수. 그 외에는 0점',
    score: '고정 50점',
  },
];
