// Utilities
import { defineStore } from 'pinia'
import {genTestUserSig} from "@/utils/generateTestUserSig";
import TRTC from "trtc-sdk-v5";

export const useAppStore = defineStore('app', () => {
  // state
  const sdkAppId = ref(import.meta.env.VITE_SDK_APP_ID || '')
  const sdkSecretKey = ref(import.meta.env.VITE_SDK_SECRET_KEY || '')
  const userId = ref(import.meta.env.VITE_USER_ID || '')
  const channelId = ref(parseInt(import.meta.env.VITE_CHANNEL_ID, 10) || 888)

  const connected = ref(false)
  const muted = ref(false)

  const selectMicrophone = ref<MediaDeviceInfo>()

  const logs = ref<string[]>([])

  const logText = computed(() => {
    return logs.value.join('\n')
  })

  const userSig = computed(() => {
    return  genTestUserSig({
        sdkAppId: parseInt(sdkAppId.value, 10),
        userId: userId.value,
        sdkSecretKey: sdkSecretKey.value,
      }).userSig;
  })

  function addLogs(log: string) {
    logs.value.push('>: ' + log);
    if (logs.value.length > 10) {
      logs.value.shift();
    }
  }

  async function playAudioEvent(e: { userId: string }) {
    if (muted.value) {
      addLogs('remote audio available, but local mute')
    }else {
      addLogs('remote audio available')
      await trtc.muteRemoteAudio(e.userId, false)
    }
    await trtc.muteRemoteAudio(e.userId, true)
  }

  const trtc = inject<TRTC>('trtc')!
  trtc.on(TRTC.EVENT.REMOTE_AUDIO_UNAVAILABLE, (e) => {addLogs('remote audio unavailable : '+ e.userId)});
  trtc.on(TRTC.EVENT.REMOTE_AUDIO_AVAILABLE, playAudioEvent);
  trtc.on(TRTC.EVENT.ERROR, (e)=>{addLogs(e.message)});
  trtc.on(TRTC.EVENT.AUTOPLAY_FAILED, (e)=>{addLogs('autoplay failed from : '+ e.userId)});
  trtc.on(TRTC.EVENT.KICKED_OUT, (e)=>{addLogs('kicked out by : '+ e.reason)});
  trtc.on(TRTC.EVENT.REMOTE_USER_ENTER, (e) => {addLogs('remote user enter : '+ e.userId)});
  trtc.on(TRTC.EVENT.REMOTE_USER_EXIT, (e) => {addLogs('remote user exit : '+ e.userId)});
  trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, (e) => {addLogs('remote video available : '+ e.userId)});
  trtc.on(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, (e) => {addLogs('remote video unavailable : '+ e.userId)});
  trtc.on(TRTC.EVENT.AUDIO_VOLUME, (e) => {addLogs('audio volume : '+ e.result)});
  // trtc.on(TRTC.EVENT.NETWORK_QUALITY, (e) => {addLogs('network quality : '+ e.downlinkLoss)});
  trtc.on(TRTC.EVENT.CONNECTION_STATE_CHANGED, (e) => {addLogs('connection state changed : '+ e.state)});
  trtc.on(TRTC.EVENT.AUDIO_PLAY_STATE_CHANGED, (e) => {addLogs('audio play state changed : '+ e.state)});
  trtc.on(TRTC.EVENT.VIDEO_PLAY_STATE_CHANGED, (e) => {addLogs('video play state changed : '+ e.state)});
  trtc.on(TRTC.EVENT.SCREEN_SHARE_STOPPED, () => {addLogs('screen share stopped')});
  trtc.on(TRTC.EVENT.DEVICE_CHANGED, (e) => {addLogs('device changed : '+ e.device.label)});
  trtc.on(TRTC.EVENT.PUBLISH_STATE_CHANGED, (e) => {addLogs('publish state changed : '+ e.state)});
  trtc.on(TRTC.EVENT.TRACK, (e) => {addLogs('track : '+ e.track)});
  // trtc.on(TRTC.EVENT.STATISTICS, (e) => {addLogs('statistics : '+ e.localStatistics)});
  trtc.on(TRTC.EVENT.SEI_MESSAGE, (e) => {addLogs('sei message : '+ e.userId)});
  trtc.on(TRTC.EVENT.CUSTOM_MESSAGE, (e) => {addLogs('custom message : '+ e.userId)});

  async function enterRoom() {
    try {
      await trtc.enterRoom({
        roomId:channelId.value,
        sdkAppId: parseInt(sdkAppId.value, 10),
        userId: userId.value,
        userSig: userSig.value,
      });
      connected.value = true
      addLogs('enter room success')
    } catch (error) {
      addLogs('enter room failed: ' + error)
      connected.value = false
    }
  }

  async function leaveRoom() {
    try {
      await trtc.exitRoom()
      connected.value = false
      addLogs('leave room success')
    } catch (error) {
      addLogs('leave room failed: ' + error)
    }
  }

  return {
    sdkAppId,
    sdkSecretKey,
    userId,
    channelId,
    muted,
    logText,
    selectMicrophone,
    connected,
    enterRoom,
    leaveRoom,
    addLogs,
  }
})


