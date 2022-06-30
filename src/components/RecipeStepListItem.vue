<script setup lang="ts">
import { computed, watch, ref, toRef, type ComponentPublicInstance } from 'vue';
import { formatDuration, formatTimerDuration } from '@/util/duration';
import { useAppState } from '@/use/appState';

interface RecipeStep {
  summary: string;
  type: string;
  description?: string;
  gifUrl?: string;
  start: number;
  end: number;
}

const props = defineProps<{
  step: RecipeStep;
  current: number;
  running: boolean;
}>();

const emit = defineEmits(['update:current']);

const { brewer } = useAppState();

const currentDuration = computed(() => props.current - props.step.start);
const totalDuration = computed(() => props.step.end - props.step.start);

const currentDurationLabel = computed(() => formatTimerDuration(currentDuration.value, totalDuration.value));
const totalDurationLabel = computed(() => formatDuration(props.step.end - props.step.start));

const started = computed(() => props.current > props.step.start);
const completed = computed(() => props.current > props.step.end);
const inProcess = computed(() => started.value && !completed.value);

const progress = computed(() => {
  return currentDuration.value / totalDuration.value;
});

const active = computed(() => {
  if (inProcess.value) return true;
  if (!brewer.hasStarted.value) return true;
  if (props.step.type === 'complete' && brewer.hasCompleted.value) return true;
  return false;
});

const listItem = ref<ComponentPublicInstance | null>(null);
function scrollToView() {
  setTimeout(() => {
    if (!listItem.value) return;
    const el = listItem.value.$el;
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 20);
}

watch([inProcess, toRef(props, 'running')], () => {
  if (inProcess.value && props.running) {
    scrollToView();
  }
});

function updateProgress(progress: number) {
  emit('update:current', props.step.start + totalDuration.value * progress);
}
</script>
<template>
  <ListItem
    :summary="step.summary"
    :description="step.description"
    :progress="progress"
    :class="[active ? '' : 'opacity-25']"
    @update:progress="updateProgress"
    ref="listItem"
  >
    <template #right>
      <div v-if="completed">
        <IconCheckCircle />
      </div>
      <template v-else-if="totalDuration > 0">
        <div v-if="inProcess" class="text-lg">
          {{ currentDurationLabel }}
        </div>
        <div v-else class="text-lg">
          {{ totalDurationLabel }}
        </div>
      </template>
    </template>
    <template v-if="step.gifUrl && active" #details>
      <p v-if="step.type === 'complete' && !completed" class="text-sm text-gray-700 dark:text-gray-300 mt-2">
        A tasty gif awaits you...
      </p>
      <img v-else :src="step.gifUrl" :alt="step.summary" class="block w-full mt-4" />
    </template>
  </ListItem>
</template>
