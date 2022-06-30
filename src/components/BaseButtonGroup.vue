<script setup lang="ts">
interface Button {
  label: string;
  icon?: any;
  value: any;
}
defineProps<{
  buttons: Button[];
  modelValue: any;
}>();
defineEmits();
</script>
<template>
  <div class="flex border border-black dark:border-white divide-x divide-black dark:divide-white">
    <BaseButton
      v-for="button in buttons"
      :key="button.label"
      :active="button.value === modelValue"
      @click="$emit('update:modelValue', button.value)"
    >
      <component :is="button.icon" />
      <span>{{ button.label }}</span>
    </BaseButton>
  </div>
</template>
