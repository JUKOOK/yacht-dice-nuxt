import Swal from 'sweetalert2';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('swal', Swal);
});

// import { createVfm } from 'vue-final-modal';

// export default defineNuxtPlugin((nuxtApp) => {
//   const vfm = createVfm() as any;

//   nuxtApp.vueApp.use(vfm);
// });
