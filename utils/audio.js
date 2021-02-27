// const audio = uni.createInnerAudioContext();
// audio.obeyMuteSwitch = false;

// audio.onPlay(() => {
// 	console.log('开始播放了');
// })

// audio.onCanplay(() => {
// 	console.log('播放开始获取时间');
// 	audio.duration;
// 	setTimeout(() => {
// 		console.log(audio.duration);
// 	}, 30)
// })
let audio = null
// #ifndef H5
 audio = uni.getBackgroundAudioManager();
// #endif
// #ifdef H5
 audio = uni.createInnerAudioContext();
 audio.obeyMuteSwitch = false;
 
 audio.onPlay(() => {
 	console.log('开始播放了');
 })
 audio.onError((err)=>{
	 console.log('播放异常',err)
 })
 audio.onWaiting(()=>{
	 console.log('音频加载中...')
 })
 audio.onCanplay(() => {
 	console.log('播放开始获取时间');
 	// audio.duration;
 	setTimeout(() => {
 		console.log(audio.duration);
 	}, 30)
 })
// #endif
module.exports = {
	audio
}
