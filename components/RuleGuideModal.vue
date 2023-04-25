<template>
  <VueFinalModal class="flex justify-center items-center">
    <div class="modal-contents">
      <div class="modal-header">
        <h1 class="title">RULES</h1>
        <button class="btn-close clickable-layer" @click="emit('confirm')">
          <CloseIcon />
        </button>
      </div>
      <div class="table-area">
        <table class="rule-table">
          <tbody>
            <tr class="header-row">
              <th class="label">이름</th>
              <th class="explain">설명</th>
              <th class="score">점수 계산</th>
            </tr>
            <tr class="item-row" v-for="rule in MISSION_LIST" :key="rule.key">
              <td class="label">{{ rule.label }}</td>
              <td class="explain">{{ rule.explain }}</td>
              <td class="score">{{ rule.score }}</td>
            </tr>
            <tr class="header-row">
              <th class="label">이름</th>
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
  min-width: 90rem;
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
    top: 2.4rem;
    right: 2.4rem;
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
  font-size: 2rem;
  font-weight: 700;
  th {
    height: 3.2rem;
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

.rule-table .item-row {
  font-size: 1.7rem;
  td {
    height: 4rem;
  }
}
</style>
