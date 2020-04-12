import moment from 'moment'

export const state = () => ({
    info: []
})

export const mutations = {
    setInfo(state: any, info: any) {
      state.info = info
    }
}