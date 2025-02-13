import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Unicon from 'vue-unicons'
import axios from "./plugins/axios";
import ClickOutside from "./helpers/clickOutside";
import VueAxios from 'vue-axios'
import { vue3Debounce } from 'vue-debounce'
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import vue3GoogleLogin from 'vue3-google-login'
import {
  uniPlus,uniPlusSquare,uniTag,uniUsersAlt,uniAngleRight,uniSignout,
  uniPadlock, uniCog, uniLayerGroupMonochrome, uniEstate,uniCarWash, 
  uniBars,uniAngleDown, uniAngleLeft,uniAngleUp, uniApps, uniGraduationCap, uniBag, uniSetting,
  uniBell, uniEllipsisV, uniHouseUserSolid, uniEdit, uniTrashAlt, uniPen,
  uniUploadAlt, uniSave, uniCancel, uniPlusCircle, uniTimesSquare,uniTimes, uniEnvelope, uniCalender,
  uniUserCircle,uniBookOpen,uniHouseUser, uniBug, uniCloudExclamation, uniUnlock, uniAwardAlt, uniServerNetwork,
  uniBan, uniCheckCircle, uniExternalLinkAlt, uniFileLandscape, uniFileLandscapeAlt, uniBrightness, uniMoon, uniExclamationCircle,
  uniArrowRight, uniEyeSlash, uniEye, uniAngleLeftB, uniPresentationLine, 
  uniLockAccess, uniAbacus, uniFileCheckAlt, uniUserCheck, uniCopyLandscape, uniPresentationPlay, uniDataSharing,
  uniUserSquare, uniUserExclamation,uniRefresh, uniEditAlt, uniClock,uniCompressAlt,uniBrain,
  uniFileExclamation, uniVenus, uniMars, uniSlidersVAlt,uniPresentationCheck,uniFileAlt,
  uniFileDownloadAlt,uniGoogle,uniChatInfo,uniMessage,uniSignOutAlt
 } from 'vue-unicons/dist/icons'
import store from './store'
import './firebase';

const app = createApp(App)
app.provide('echo', window.Echo)
app.directive('click-outside', ClickOutside);

Unicon.add([
  uniPlus,uniPlusSquare,uniTag,uniUsersAlt,uniAngleRight,uniSignout,
  uniPadlock, uniCog, uniLayerGroupMonochrome, uniEstate,uniCarWash, 
  uniBars,uniAngleDown, uniAngleLeft,uniAngleUp, uniApps, uniGraduationCap, uniBag, uniSetting,
  uniBell, uniEllipsisV, uniHouseUserSolid, uniEdit, uniTrashAlt, uniPen,
  uniUploadAlt, uniSave, uniCancel, uniPlusCircle, uniTimesSquare,uniTimes, uniEnvelope, uniCalender,
  uniUserCircle,uniBookOpen,uniHouseUser, uniBug, uniCloudExclamation, uniUnlock, uniAwardAlt, uniServerNetwork,
  uniBan, uniCheckCircle, uniExternalLinkAlt, uniFileLandscape, uniFileLandscapeAlt, uniBrightness, uniMoon, uniExclamationCircle,
  uniArrowRight, uniEyeSlash, uniEye, uniAngleLeftB, uniPresentationLine, 
  uniLockAccess, uniAbacus, uniFileCheckAlt, uniUserCheck, uniCopyLandscape, uniPresentationPlay, uniDataSharing,
  uniUserSquare, uniUserExclamation,uniRefresh, uniEditAlt, uniClock,uniCompressAlt,uniBrain,uniFileExclamation, uniVenus, uniMars, uniSlidersVAlt,uniFileDownloadAlt,
  uniPresentationCheck,uniFileAlt,uniGoogle,uniChatInfo,uniMessage,uniSignOutAlt
])


app
.use(store)
.use(router)
.use(Unicon)
.use(VueAxios, axios)
.use(Vue3Toasity,
    {
      autoClose: 3000,
       dangerouslyHTMLString: true,
      // ...
    }, // global options type definition --> ToastContainerOptions
)
.use(vue3GoogleLogin, {
  clientId: '6998882232-ohkkur9k2a4ltdrr0b8d9or4nag1e5dk.apps.googleusercontent.com'
})
.provide("axios", app.config.globalProperties.axios).directive('debounce', vue3Debounce({ lock: true })).mount('#app')
