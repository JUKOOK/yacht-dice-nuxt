<template>
  <VueFinalModal class="flex justify-center items-center">
    <div class="modal-contents">
      <div class="modal-header">
        <h1 class="title">RULES</h1>
        <button class="btn-close clickable-layer" @click="emit('confirm')">
          <CloseIcon :width="32" :height="32" />
        </button>
      </div>
      <div class="table-area">
        <table class="rule-table">
          <tbody>
            <tr class="header-row">
              <th class="label">미션</th>
              <th class="explain">설명</th>
              <th class="score">점수 계산</th>
            </tr>
            <tr class="item-row" v-for="rule in MISSION_LIST" :key="rule.key">
              <td class="label">{{ rule.label }}</td>
              <td class="explain">{{ rule.explain }}</td>
              <td class="score">{{ rule.score }}</td>
            </tr>
            <tr class="mission-bonus">
              <td class="label" colspan="3">
                <span class="bold">에이스</span>부터
                <span class="bold">헥사</span>까지의 점수 총합이
                <span class="bold highlight">63점 이상</span>일 때,
                <span class="bold highlight">35점</span>의 보너스 점수 추가
              </td>
            </tr>
            <tr class="header-row">
              <th class="label">조합</th>
              <th class="explain">설명</th>
              <th class="score">점수 계산</th>
            </tr>
            <tr class="item-row" v-for="rule in COMBINATION_LIST" :key="rule.key">
              <td class="label">{{ rule.label }}</td>
              <td class="explain">{{ rule.explain }}</td>
              <td class="score">{{ rule.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';
import { MISSION_LIST, COMBINATION_LIST } from '~/constants';

import CloseIcon from '~/components/icons/CloseIcon.vue';

const emit = defineEmits(['confirm']);
</script>

<style lang="scss" scoped>
.modal-contents {
  min-width: 100rem;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
  .title {
    font-size: 2.5em;
  }
  .btn-close {
    padding: 2px;
    position: absolute;
    top: 2.8rem;
    right: 3rem;
    border-radius: 4px;
  }
}

.rule-table {
  background-color: #f5f5f5;
  border-collapse: collapse;
  border-spacing: 2px;
  border-color: gray;
  .tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }
  th,
  td {
    border: 1px solid #ddd;
    font-weight: 500;
    .bold {
      font-weight: 700;
    }
  }
  .label {
    text-align: center;
  }
  .explain {
    padding-left: 1.6rem;
    text-align: left;
  }
  .score {
    text-align: center;
  }
}

.rule-table .header-row {
  background-color: #aaaaaa;
  font-size: 2.2rem;
  font-weight: 700;
  th {
    height: 4rem;
  }
  .label {
    width: 16rem;
    text-align: center;
  }
  .explain {
    width: 76rem;
    text-align: left;
  }
  .score {
    width: 16rem;
    text-align: center;
  }
}

.rule-table .mission-bonus {
  td {
    height: 5.4rem;
    font-size: 2.1rem;
    .highlight {
      color: orchid;
    }
  }
}

.rule-table .item-row {
  font-size: 1.8rem;
  td {
    height: 4.4rem;
  }
}
</style>
