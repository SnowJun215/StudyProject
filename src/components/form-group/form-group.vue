<template>
  <Form ref="form" v-if="Object.keys(valueList).length" :label-width="labelWidth" :model="valueList" :rules="rules">
    <FormItem
      v-for="(item, index) in list"
      :key="`${_uid}_${index}`"
      :label="item.label"
      :error="errorStore[item.name]"
      :prop="item.name"
    >
      <component :is="item.type" :range="item.range" v-model="valueList[item.name]">
        <template v-if="item.children">
          <component
            v-for="(child, i) in item.children.list"
            :is="item.children.type"
            :key="`${_uid}_${index}_${i}`"
            :label="child.label"
            :value="child.value">
            {{child.title}}
          </component>
        </template>
      </component>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit">提交</Button>
      <Button @click="handleReset">重置</Button>
    </FormItem>
  </Form>
</template>

<script>
  import clonedeep from 'clonedeep';
  import {sendFormData} from "@/api/data";

  export default {
    name: "form-group",
    data () {
      return {
        initValueList: [],
        rules: {},
        valueList: {},
        errorStore: {}
      }
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      labelWidth: {
        type: Number,
        default: 100
      },
      url: {
        type: String,
        require: true
      }
    },
    watch: {
      list () {
        this.setInitValue();
      }
    },
    methods: {
      setInitValue () {
        let rules = {};
        let valueList = {};
        let initValueList = {};
        let errorStore = {};
        this.list.forEach(item => {
          rules[item.name] = item.rule;
          valueList[item.name] = item.value;
          initValueList[item.name] = item.value;
          errorStore[item.name] = '';
        });
        this.rules = rules;
        this.valueList = valueList;
        this.invalueList = initValueList;
        this.errorStore = errorStore;
      },
      handleReset () {
        this.valueList = clonedeep(this.invalueList);
      },
      handleSubmit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            let errorStore = {};
            this.list.forEach(item => {
              errorStore[item.name] = '';
            });
            this.errorStore = errorStore;
            sendFormData({
              url: this.url,
              data: this.valueList
            }).then(res => {
              this.$emit('on-submit-success', res);
            }).catch(err => {
              this.$emit('on-submit-error', err);
              for (let key in err) {
                this.errorStore[key] = err[key];
              }
            });
          }
        });
      }
    },
    mounted() {
      this.setInitValue();
    }
  }
</script>

<style scoped>

</style>
