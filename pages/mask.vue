<template>
  <div>
    <mask-inventory-card />
    <shop-count />
  </div>
</template>

<script>
import Vue from 'vue'
import MaskInventoryCard from '@/components/cards/MaskInventoryCard.vue'
import ShopCount from '@/components/ShopCount.vue'

export default Vue.extend({
  components: {
    MaskInventoryCard,
    ShopCount
  }
})
</script>
