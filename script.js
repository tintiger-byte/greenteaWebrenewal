// 선택된 취향 상태 객체
const selections = {};

// 차 정보 데이터베이스
const teas = {
  'sweet-low-cold': { name: '말차 딸기 라떼', desc: '달콤한 딸기 시럽과 부드러운 말차의 만남. 카페인 없이 달콤하게 즐기는 여름 음료.' },
  'sweet-high-cold': { name: '말차 크림 콜드브루', desc: '달콤한 크림 위로 진한 말차와 콜드브루를 레이어드. 에너지 충전 + 인스타 감성 완벽!' },
  'sweet-low-hot': { name: '허니 그린 밀크티', desc: '꿀의 달콤함과 보성 녹차의 향이 어우러진 따뜻한 허니 밀크티.' },
  'sweet-high-hot': { name: '말차 아포가토', desc: '뜨거운 에스프레소 위에 말차 아이스크림. 달콤하고 진한 카페인 폭발.' },
  'bitter-low-cold': { name: '아이스 보성 그린티', desc: '보성산 유기농 녹차 원엽을 저온에서 12시간 우린 깔끔하고 쌉쌀한 냉침 녹차.' },
  'bitter-high-cold': { name: '말차 에스프레소 샷', desc: '농축 말차 에스프레소를 얼음 위에 그냥 즐기는 쌉쌀한 극강의 카페인.' },
  'bitter-low-hot': { name: '정통 보성 녹차', desc: '70도에서 우린 보성 일번지 찻잎. 쌉쌀함 뒤에 오는 단맛이 진짜 녹차의 맛.' },
  'bitter-high-hot': { name: '말차 아메리카노', desc: '진한 말차 에스프레소에 뜨거운 물을 더한 녹차 아메리카노. 쌉쌀하고 깊은 풍미.' },
  'mild-low-cold': { name: '그린 요거트 스무디', desc: '보성 녹차와 그릭 요거트를 블렌딩한 부드럽고 건강한 스무디볼.' },
  'mild-high-cold': { name: '녹차 콜드브루 블렌드', desc: '은은한 녹차 향과 부드러운 콜드브루의 조화. 카페인은 있지만 자극 없이 부드럽게.' },
  'mild-low-hot': { name: '보성 녹차 허브 블렌드', desc: '라벤더, 캐모마일과 블렌딩한 보성 녹차. 저녁에 마시기 완벽한 릴렉싱 차.' },
  'mild-high-hot': { name: '그린 밀크 라떼', desc: '말차를 부드러운 오트밀크로 희석한 따뜻하고 순한 말차 라떼. 속이 편안해요.' },
};

// 문서가 로드된 후 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. 취향 칩(Chip) 클릭 이벤트 등록
  const chips = document.querySelectorAll('.finder-chips .chip');
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      const targetChip = e.target;
      const groupElement = targetChip.closest('[data-group]');
      const groupName = groupElement.dataset.group;
      
      // 동일 그룹 내 다른 칩 비활성화 후 클릭한 칩 활성화
      groupElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      targetChip.classList.add('active');
      
      // 데이터 저장
      selections[groupName] = targetChip.dataset.val;
    });
  });

  // 2. '나의 차 찾기' 버튼 클릭 이벤트 등록
  const findTeaBtn = document.getElementById('findTeaBtn');
  if (findTeaBtn) {
    findTeaBtn.addEventListener('click', findTea);
  }

  // 3. 네비게이션 및 내부 앵커 링크 부드러운 스크롤(Smooth Scroll) 효과
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 4. 스크롤 위치에 따른 네비게이션 바 그림자 효과 추가
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.style.boxShadow = '0 4px 24px rgba(27,77,62,0.12)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
});

// 차 추천 로직 구현 함수
function findTea() {
  const { taste, caffeine, temp } = selections;
  
  // 예외 처리: 모든 항목을 선택하지 않았을 때 알림
  if (!taste || !caffeine || !temp) {
    alert('취향을 모두 선택해 주세요! 🍵');
    return;
  }
  
  const key = `${taste}-${caffeine}-${temp}`;
  const result = teas[key] || { 
    name: '보성 시그니처 블렌드', 
    desc: '선택하신 취향에 맞는 특별한 시그니처 블렌드를 현장에서 추천받아 보세요!' 
  };
  
  // DOM 결과 업데이트 및 시각화 효과 추가
  const resultContainer = document.getElementById('finderResult');
  document.getElementById('resultName').textContent = '✨ ' + result.name;
  document.getElementById('resultDesc').textContent = result.desc;
  
  resultContainer.classList.add('show');
  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}