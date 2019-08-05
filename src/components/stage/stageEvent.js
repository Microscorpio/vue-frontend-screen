import Vue from 'vue'
const stageEvent = new Vue();
/**
 * @deprecated
 * */
export const EVENT_SCALE_CHANGE = 'scalechange';

stageEvent.$on(EVENT_SCALE_CHANGE, value => {});

export default stageEvent;