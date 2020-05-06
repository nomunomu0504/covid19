export const state = () => ({
  info: [],
  shop: []
})

export const mutations = {
  setInfo(state: any, info: any) {
    state.info = info
  },
  setShop(state: any, shop: any) {
    state.shop = shop
  }
}
