<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getItems, deleteItem } from "@/api/items";
import type { Item } from "@/api/items";

const loading = ref(false);
const error = ref<string | null>(null);
const items = ref<Item[]>([]);

const router = useRouter();

function fetchItems() {
  loading.value = true;
  error.value = null;
  getItems()
    .then((data) => {
      items.value = data;
    })
    .catch(() => {
      error.value = "Failed to fetch items";
    })
    .finally(() => {
      loading.value = false;
    });
}

function onEdit(item: Item) {
  router.push({ name: "edit", params: { id: item._id } });
}
function onDelete(item: Item) {
  if (!item._id) return;
  if (confirm("Delete this item?")) {
    loading.value = true;
    deleteItem(item._id)
      .then(() => fetchItems())
      .catch(() => error.value = "Delete failed")
      .finally(() => loading.value = false);
  }
}
function onCreateNew() {
  router.push({ name: "create" });
}

onMounted(() => {
  fetchItems();
});
</script>

<template>
  <div class="main-content">
    <div class="toolbar">
      <h1>Records</h1>
      <button @click="onCreateNew" class="accent-btn">+ New Record</button>
    </div>
    <div v-if="loading" class="msg primary">Loading…</div>
    <div v-else-if="error" class="msg error">{{ error }}</div>
    <div v-else>
      <table class="items-table">
        <thead>
          <tr>
            <th style="width:220px">Name</th>
            <th>Description</th>
            <th style="width:200px">Created At</th>
            <th style="width:160px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item._id">
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.createdAt ? new Date(item.createdAt).toLocaleString() : '—' }}</td>
            <td>
              <button @click="onEdit(item)" class="primary-btn">Edit</button>
              <button @click="onDelete(item)" class="secondary-btn">Delete</button>
            </td>
          </tr>
          <tr v-if="items.length === 0">
            <td colspan="4" class="center">No records found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  margin: 24px 0;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
h1 { font-size: 1.45rem; font-weight: 700; color: #1976d2; margin: 0;}
.accent-btn {
  background: #ff4081;
  color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 0.6em 1.4em;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #ff40811a;
  transition: background 0.2s;
}
.accent-btn:hover { background: #e73370; }

.primary-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 0.40em 1.1em;
  margin-right: 5px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.primary-btn:hover {
  background: #1152a3;
}
.secondary-btn {
  background: #424242;
  color: white;
  border: none;
  padding: 0.40em 1.1em;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}
.secondary-btn:hover {
  background: #222;
}
.msg {
  margin: 2rem 0;
  padding: 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  background: #f2f3fc;
  color: #1976d2;
  text-align: center;
}
.msg.error {
  background: #fff4f4;
  color: #b71c1c;
}
.center { text-align: center; }
.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
}
.items-table th, .items-table td {
  padding: 0.55em 0.7em;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.items-table th { background: #f2f3fc; color: #1976d2;}
@media (max-width: 600px) {
  .main-content { padding: 0.7rem 0.3rem; }
  .items-table th, .items-table td { font-size: 0.95em; }
  .toolbar { flex-wrap: wrap; gap: 0.25em;}
  h1 { font-size: 1.1rem; }
}
</style>
