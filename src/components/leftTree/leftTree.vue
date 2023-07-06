<template>
  <div class="left-tree">
    <div class="input__container">
      <div class="shadow__input"></div>
      <button class="input__button__shadow" @click="add">
        <svg
          t="1684479550359"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2377"
          width="20"
          height="20"
        >
          <path
            d="M512 958.016611c-119.648434 0-232.1288-46.367961-316.736783-130.559656-84.640667-84.255342-131.263217-196.255772-131.263217-315.455235 0-119.168499 46.624271-231.199892 131.232254-315.424271 84.607983-84.191695 197.088348-130.559656 316.736783-130.559656s232.1288 46.367961 316.704099 130.559656c84.67163 84.224378 131.263217 196.255772 131.263217 315.391587 0.032684 119.199462-46.591587 231.232576-131.263217 315.455235C744.1288 911.615966 631.648434 958.016611 512 958.016611zM512 129.983389c-102.623626 0-199.071738 39.743475-271.583282 111.936783-72.480581 72.12794-112.416718 168.063432-112.416718 270.079828s39.903454 197.951888 112.384034 270.047144c72.511544 72.191587 168.959656 111.936783 271.583282 111.936783 102.592662 0 199.071738-39.743475 271.583282-111.936783 72.480581-72.160624 112.416718-168.063432 112.384034-270.079828 0-102.016396-39.903454-197.919204-112.384034-270.016181C711.071738 169.759548 614.592662 129.983389 512 129.983389z"
            fill="#575B66"
            p-id="2378"
          ></path>
          <path
            d="M736.00086 480.00086 544.00086 480.00086 544.00086 288.00086c0-17.664722-14.336138-32.00086-32.00086-32.00086s-32.00086 14.336138-32.00086 32.00086l0 192L288.00086 480.00086c-17.664722 0-32.00086 14.336138-32.00086 32.00086s14.336138 32.00086 32.00086 32.00086l192 0 0 192c0 17.695686 14.336138 32.00086 32.00086 32.00086s32.00086-14.303454 32.00086-32.00086L544.00258 544.00086l192 0c17.695686 0 32.00086-14.336138 32.00086-32.00086S753.696546 480.00086 736.00086 480.00086z"
            fill="#575B66"
            p-id="2379"
          ></path>
        </svg>
      </button>
      <input
        type="text"
        name="text"
        class="input__search"
        v-model="keyWord"
        placeholder="What do you want to search?"
      />
    </div>
    <div
      :class="[
        nodeObj[replaceFields.id] === item[replaceFields.id]
          ? 'active-node'
          : '',
        'tree-node'
      ]"
      v-for="(item, index) in listData"
      @click="nodeClick(item, index)"
      :key="index"
    >
      {{ item[replaceFields.name] }}
    </div>
    <div
      class="block"
      :style="{ top: blockTop + 'px' }"
      v-show="nodeObj[replaceFields.id]"
    ></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      },
    },
    replaceFields: {
      type: Object,
      default: () => {
        return {
          name: 'name',
          id: 'id',
        }
      },
    },
  },
  data() {
    return {
      nodeObj: {},
      blockTop: 5,
      listData: [],
      keyWord: '',
    }
  },
  watch: {
    treeData: {
      deep: true,
      handler(newVal) {
        if (newVal.length) {
          this.listData = this.filterTree()
          this.nodeClick(newVal[0], 0)
        }
      },
      immediate: true,
    },
    keyWord: {
      handler(newVa) {
        if (newVa.length) {
          this.listData = this.filterTree()
          if (this.listData.length) {
            this.nodeClick(this.listData[0], 0)
          }
        } else {
          this.listData = this._.cloneDeep(this.treeData)
        }
      },
    },
  },
  methods: {
    nodeClick(item, index) {
      this.nodeObj = item
      this.blockTop = index * 55 + 127
      this.$emit('nodeClick', item)
    },
    add() {
      this.$emit('add')
    },
    filterTree() {
      let arr = this._.cloneDeep(this.treeData)
      arr = arr.filter((item) => {
        return item[this.replaceFields.name].indexOf(this.keyWord) != -1
      })
      return arr
    },
  },
}
</script>
<style lang="less" scoped>
.left-tree {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e8e8e8;
  position: relative;
}
.tree-node {
  padding-right: 20px;
  text-align: right;
  padding-top: 17px;
  padding-bottom: 17px;
  color: #595959;
  &:hover {
    cursor: pointer;
    color: #1890ff;
  }
}
.active-node {
  color: #1890ff;
  position: relative;
}
.block {
  position: absolute;
  top: 0px;
  right: -3px;
  width: 3px;
  height: 45px;
  background: #1890ff;
  transition: all 0.3s;
}
.input__container {
  position: relative;
  background: rgba(255, 255, 255, 0.664);
  padding: 42px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 22px;
  max-width: 300px;
  transition: transform 400ms;
  transform-style: preserve-3d;
  transform: rotateX(15deg) rotateY(-20deg);
  perspective: 500px;
}

.shadow__input {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
  filter: blur(30px);
  border-radius: 20px;
  background-color: #999cff;
  // background-image: radial-gradient(
  //     at 85% 51%,
  //     hsla(60, 60%, 61%, 1) 0px,
  //     transparent 50%
  //   ),
  //   radial-gradient(at 74% 68%, hsla(235, 69%, 77%, 1) 0px, transparent 50%),
  //   radial-gradient(at 64% 79%, hsla(284, 72%, 73%, 1) 0px, transparent 50%),
  //   radial-gradient(at 75% 16%, hsla(283, 60%, 72%, 1) 0px, transparent 50%),
  //   radial-gradient(at 90% 65%, hsla(153, 70%, 64%, 1) 0px, transparent 50%),
  //   radial-gradient(at 91% 83%, hsla(283, 74%, 69%, 1) 0px, transparent 50%),
  //   radial-gradient(at 72% 91%, hsla(213, 75%, 75%, 1) 0px, transparent 50%);
}

.input__button__shadow {
  cursor: pointer;
  border: none;
  background: none;
  transition: transform 400ms, background 400ms;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 5px;
}

.input__button__shadow:hover {
  background: rgba(255, 255, 255, 0.411);
}

.input__search {
  width: 100%;
  border-radius: 20px;
  outline: none;
  border: none;
  padding: 8px;
  position: relative;
}
</style>
