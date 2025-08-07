<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { createItem, updateItem, getItem } from "@/api/items";

// Props
const props = defineProps<{
  id?: string | null;
}>();

const isEdit = computed(() => !!props.id);

const loading = ref(false);
const error = ref<string | null>(null);

// Form state
const name = ref("");
const description = ref("");
const nameTouched = ref(false);
const descriptionTouched = ref(false);

// Validation
const nameValid = computed(() => name.value.trim().length >= 2);
const descriptionValid = computed(() => description.value.trim().length >= 4);
const formValid = computed(() => nameValid.value && descriptionValid.value);

const router = useRouter();

function fetchExisting(id: string) {
  loading.value = true;
  error.value = null;
  getItem(id)
    .then((data) => {
      name.value = data.name;
      description.value = data.description;
    })
    .catch(() => error.value = "Could not load item")
    .finally(() => loading.value = false);
}
if (props.id) fetchExisting(props.id);

async function onSubmit() {
  nameTouched.value = descriptionTouched.value = true;
  if (!formValid.value) return;
  loading.value = true;
  error.value = null;

  try {
    if (isEdit.value && props.id) {
      await updateItem(props.id, { name: name.value, description: description.value });
    } else {
      await createItem({ name: name.value, description: description.value });
    }
    router.push({ name: "home" });
  } catch (e: unknown) {
    // Lint-compliant: type guard for error value, with no `any`
    if (
      typeof e === "object" &&
      e !== null &&
      "response" in e &&
      typeof (e as Record<string, unknown>).response === "object" &&
      (e as { response?: unknown }).response !== null &&
      "data" in (e as { response?: { data?: unknown } }).response! &&
      typeof (e as { response: { data: unknown } }).response.data === "object" &&
      (e as { response: { data: unknown } }).response.data !== null &&
      "message" in (e as { response: { data: Record<string, unknown> } }).response.data
    ) {
      error.value = String(
        ((e as { response: { data: { message: unknown } } }).response.data.message)
      );
    } else {
      error.value = isEdit.value ? "Update failed" : "Create failed";
    }
  } finally {
    loading.value = false;
  }
}

function onCancel() { router.push({ name: "home" }); }
</script>
<template>
  <div class="main-content">
    <h1 class="title">{{ isEdit ? 'Edit Record' : 'Create New Record' }}</h1>
    <form @submit.prevent="onSubmit" autocomplete="off" novalidate>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name" v-model="name" :class="{ invalid: nameTouched && !nameValid }"
          @blur="nameTouched = true" type="text" maxlength="200"
          placeholder="Item name (min 2 chars)" :disabled="loading"
          required />
        <div v-if="nameTouched && !nameValid" class="err-txt">Name required, at least 2 chars</div>
      </div>
      <div class="form-group">
        <label for="desc">Description</label>
        <textarea id="desc"
          v-model="description" :class="{ invalid: descriptionTouched && !descriptionValid }"
          @blur="descriptionTouched = true" maxlength="1200"
          placeholder="Description (min 4 chars)" :disabled="loading" required
          rows="3"></textarea>
        <div v-if="descriptionTouched && !descriptionValid" class="err-txt">Description required (min 4 chars)</div>
      </div>
      <div class="btns">
        <button class="primary-btn" :disabled="!formValid || loading" type="submit">
          {{ isEdit ? "Save Changes" : "Create" }}
        </button>
        <button class="secondary-btn" @click.prevent="onCancel" type="button" :disabled="loading">
          Cancel
        </button>
      </div>
      <div v-if="error" class="msg error">{{ error }}</div>
      <div v-if="loading" class="msg primary">Processing...</div>
    </form>
  </div>
</template>
<style scoped>
.main-content {
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  max-width: 540px;
  margin: 30px auto 0 auto;
}
.title {
  color: #1976d2;
  margin-bottom: 1.4em;
  font-weight: 700;
  font-size: 1.3em;
  text-align: center;
}
.form-group {
  margin-bottom: 1.2em;
}
label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.25em;
  color: #424242;
}
input, textarea {
  display: block;
  width: 100%;
  border: 1.5px solid #ddd;
  border-radius: 5px;
  padding: 0.6em;
  font-size: 1.05em;
  font-family: inherit;
  margin-top: 0.1em;
  margin-bottom: 0.15em;
  transition: border .16s;
  background: #fafcff;
}
input:focus, textarea:focus { border-color: #1976d2; outline: none; }
.invalid { border-color: #ff4081 !important; }
.err-txt {
  color: #ff4081; font-size: 0.98em; margin-bottom: -1em; margin-top: 0; 
}
.btns { display: flex; gap: 12px; margin-top: .6em; }
.primary-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 0.45em 2.4em;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
}
.primary-btn:disabled {
  opacity: 0.68;
  background: #1976d2;
  cursor: not-allowed;
}
.primary-btn:not(:disabled):hover {
  background: #1152a3;
}
.secondary-btn {
  background: #424242;
  color: white;
  border: none;
  padding: 0.45em 2.2em;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.17s;
}
.secondary-btn:hover:enabled {
  background: #232323;
}
.msg { margin: 2rem 0 0 0; padding: 1.1rem; border-radius: 6px; font-weight: 500; background: #f2f3fc; color: #1976d2; text-align: center;}
.msg.error { background: #fff4f4; color: #b71c1c; }
@media (max-width: 600px) {
  .main-content { padding: 0.9rem 0.2rem; }
  .btns { flex-direction: column; gap: 9px;}
}
</style>
