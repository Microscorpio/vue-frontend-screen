<template>
  <el-dialog
    class="gallery-modal"
    :title="dialogTitle"
    :visible="dialogVisible"
    width="823px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose">
    <div style="height: 500px">
      <gallery-box :dataSource="modalDataList" :activeIndex="activeIndex" :showDot="true" :onChange="gallaryViewChange"></gallery-box>
    </div>
  </el-dialog>
</template>

<script>
  import VueTypes from 'vue-types';
  import galleryBox from '@/components/common/galleryBox'
  export default {
    name: "galleryModal",
    props: {
      dialogTitle: VueTypes.string,
      dialogVisible: VueTypes.bool.def(false),
      modalDataList: VueTypes.arrayOf(VueTypes.shape({
        type: VueTypes.oneOf(['img', 'video']),
        uri: VueTypes.string,
        poster: VueTypes.string,
        title: VueTypes.string,
        content: VueTypes.string,
        desc: VueTypes.string
      })),
      activeIndex: VueTypes.number.def(0)
    },
    components: {
      galleryBox
    },
    methods: {
      handleClose() {
        this.$emit('close')
        this.$emit('update:dialogVisible', false)
      },
      gallaryViewChange(index) {
        // console.log('change-->', index)
      },
    }
  }
</script>

<style lang="less" scoped>
.gallery-modal {

}
</style>
