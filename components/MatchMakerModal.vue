<template>
  <VueFinalModal class="flex justify-center items-center">
    <div class="modal-contents">
      <div class="modal-header">
        <h2 class="title">게임을 생성합니다.</h2>
      </div>
      <div class="modal-body">
        <div class="player">
          <div class="label">플레이어 1</div>
          <input
            id="player-1-name"
            v-model="p1Name"
            type="text"
            class="player-name-input"
            spellcheck="false"
            minlength="1"
            maxlength="6"
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div class="player">
          <div class="label">플레이어 2</div>
          <input
            id="player-2-name"
            v-model="p2Name"
            type="text"
            class="player-name-input"
            spellcheck="false"
            minlength="1"
            maxlength="6"
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
      <button type="submit" class="btn-start" @click="startMatch">Game Start</button>
    </div>
  </VueFinalModal>
</template>

<script setup>
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';

const MATCH_TYPE_OPTIONS = [
  {
    key: 'single',
    label: '단판',
  },
  {
    key: '3of2',
    label: '3판 2선',
  },
  {
    key: '5of3',
    label: '5판 3선',
  },
];

const p1Name = ref('');
const p2Name = ref('');
const matchType = ref('single');

const emit = defineEmits(['confirm']);

function startMatch() {
  if (!p1Name.value || !p2Name.value) return;

  emit('confirm', {
    p1Name: p1Name.value,
    p2Name: p2Name.value,
    matchType: matchType.value,
  });
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
  height: 2.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4.8rem;
  .title {
    width: 100%;
    font-size: 2.5em;
    text-align: center;
  }
}

.modal-body {
  width: 42rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .player {
    .label {
      font-size: 1.6rem;
      margin-bottom: 4px;
      font-weight: 500;
    }
    .player-name-input {
      width: 19.2rem;
      height: 4rem;
      font-size: 1.6rem;
      line-height: 2.4rem;
      padding: 8px 1.6rem;
      margin-bottom: 2.4rem;
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
        font-size: 2rem;
        &.active {
          border-color: #d01411 !important;
          font-weight: bold;
        }
      }
    }
  }
}

.modal-contents .btn-start {
  font-size: 3.2rem;
  color: orangered;
  border: 0;
  padding: 0;
  background-color: unset;
  cursor: pointer;
  display: block;
  margin: 4.8rem 2px 0 auto;
  font-weight: bold;
}
</style>
