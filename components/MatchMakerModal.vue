<template>
  <VueFinalModal
    class="flex justify-center items-center"
    @opened="checkPrevGameSnapshot"
  >
    <div class="modal-contents">
      <div class="modal-header">
        <h2 class="title">게임을 생성합니다</h2>
      </div>
      <div class="modal-body">
        <div class="player">
          <div class="label">플레이어 1 (1st)</div>
          <input
            v-model="p1Name"
            type="text"
            class="player-name-input"
            spellcheck="false"
            autocomplete="off"
            minlength="1"
            maxlength="5"
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div class="player">
          <div class="label">플레이어 2 (2nd)</div>
          <input
            v-model="p2Name"
            type="text"
            class="player-name-input"
            spellcheck="false"
            autocomplete="off"
            minlength="1"
            maxlength="5"
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div class="collapse-player3"></div>
        <div class="player">
          <div class="label">플레이어 3 (3rd, optional)</div>
          <input
            v-model="p3Name"
            type="text"
            class="player-name-input"
            spellcheck="false"
            autocomplete="off"
            minlength="1"
            maxlength="5"
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div class="match-type">
          <div class="label">대결 방식</div>
          <div class="select-wrapper">
            <div
              class="select-item clickable-layer"
              :class="{ active: matchType === option.key }"
              v-for="option in MATCH_TYPE_OPTIONS"
              @click="matchType = option.key"
            >
              <span class="name">{{ option.label }}</span>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="btn-start"
        @click="startMatch"
        :disabled="startDisabled"
      >
        새 게임 시작
      </button>
      <button
        type="button"
        class="btn-load"
        @click="loadMatch"
        :disabled="!prevGameSnapshot"
      >
        게임 불러오기
      </button>
    </div>
  </VueFinalModal>
</template>

<script setup>
import { ref, computed } from 'vue';
import { VueFinalModal } from 'vue-final-modal';

const MATCH_TYPE_OPTIONS = [
  {
    key: 'first1',
    label: '단판',
  },
  {
    key: 'first2',
    label: '2선승',
  },
  {
    key: 'first3',
    label: '3선승',
  },
];

const p1Name = ref('');
const p2Name = ref('');
const p3Name = ref('');
const matchType = ref('first1');
const prevGameSnapshot = ref(null);

const startDisabled = computed(
  () =>
    !p1Name.value ||
    !p2Name.value ||
    p1Name.value === p2Name.value ||
    p1Name.value === p3Name.value ||
    p2Name.value === p3Name.value
);

const emit = defineEmits(['confirm']);

function checkPrevGameSnapshot() {
  prevGameSnapshot.value = JSON.parse(localStorage.getItem('yacht-dice-snapshot'));
}
function startMatch() {
  const newGameInfo = {
    matchType: matchType.value,
    p1Info: { name: p1Name.value },
    p2Info: { name: p2Name.value },
    p3Info: { name: p3Name.value },
  };
  emit('confirm', { type: 'new-game', gameInfo: newGameInfo });
}
function loadMatch() {
  const loadGameInfo = JSON.parse(localStorage.getItem('yacht-dice-snapshot'));
  emit('confirm', { type: 'load-game', gameInfo: loadGameInfo });
}
</script>

<style lang="scss" scoped>
.modal-contents {
  padding: 3.2rem;
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-contents .modal-header {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2.4rem 0 4.8rem;
  .title {
    width: 100%;
    font-size: 2.8em;
    text-align: center;
    margin: 0;
  }
}

.modal-body {
  width: 42rem;
  margin-bottom: 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .player {
    flex: 1;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
    .label {
      font-size: 1.6rem;
      margin-bottom: 8px;
      font-weight: 500;
      line-height: 4rem;
    }
    .player-name-input {
      width: 19.2rem;
      height: 4rem;
      font-size: 1.7rem;
      line-height: 2.4rem;
      padding: 7px 1.6rem;
      border-radius: 4px;
      border: 1px solid #e5e5e5;
      background-color: transparent;
      outline: 0;
      &:hover {
        border-color: #999999 !important;
      }
      &:focus {
        border-color: #d01411 !important;
      }
    }
  }
  .match-type {
    width: 100%;
    margin-top: 2.4rem;
    .label {
      font-size: 1.6rem;
      margin-bottom: 4px;
      font-weight: 500;
    }
    .select-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2.4rem;
      .select-item {
        flex: 1;
        height: 5.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        font-size: 2.2rem;
        &.active {
          border-color: #d01411 !important;
          font-weight: bold;
        }
      }
    }
  }
}

.modal-contents .btn-start,
.modal-contents .btn-load {
  font-size: 3rem;
  color: orangered;
  border: 0;
  padding: 0;
  background-color: unset;
  cursor: pointer;
  display: block;
  margin: 1.2rem 2px 0 auto;
  font-weight: bold;
  &:not(:disabled):hover {
    text-decoration: underline;
  }
  &:disabled {
    color: #999999;
    cursor: default;
    font-weight: normal;
  }
}
</style>
