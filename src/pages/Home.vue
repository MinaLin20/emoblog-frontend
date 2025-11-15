<template>
  <div class="min-h-screen w-full bg-bg-page text-text-primary">
    <div class="flex min-h-screen w-full">
      <aside
        class="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-border-default bg-bg-sidebar p-6 md:block"
        :style="sidebarThemeStyle"
      >
        <div class="flex h-full flex-col">
          <div class="mb-8 select-none pl-5">
            <img
              v-if="ICONS?.alarm"
              :src="ICONS.alarm"
              alt="Alarm"
              class="mb-4 h-[53px] w-[53px] object-contain"
              width="53"
              height="53"
            />
            <div class="mb-6 text-3xl font-extrabold tracking-[0.32em] text-inset-shadow-dark" style="margin-top: 10px">
              EMO
            </div>
          </div>

          <nav class="flex-1 space-y-2">
            <button class="flex w-full items-center gap-3 rounded-button px-3 py-2 text-left text-text-primary transition-colors hover:bg-btn-secondary-hover" disabled>
              <span style="font-size: 25px;" aria-hidden="true">🏚️</span>
              <span class="font-medium">Home</span>
            </button>
            <button class="flex w-full items-center gap-3 rounded-button px-3 py-2 text-left text-text-secondary transition-colors hover:bg-btn-secondary-hover" disabled>
              <span style="font-size: 25px;" aria-hidden="true">🔍</span>
              <span class="font-medium">Search</span>
            </button>
            <button
              type="button"
              class="flex w-full items-center gap-3 rounded-button px-3 py-2 text-left transition-colors"
              :class="createNavClasses"
              @click="openCreatePanel"
            >
              <span style="font-size: 25px;" aria-hidden="true">📝</span>
              <span class="font-medium">Create</span>
            </button>
            <button class="flex w-full items-center gap-3 rounded-button px-3 py-2 text-left text-text-secondary transition-colors hover:bg-btn-secondary-hover" disabled>
              <span style="font-size: 25px;" aria-hidden="true">🧌</span>
              <span class="font-medium">Profile</span>
            </button>
          </nav>

          <div class="mt-4">
            <button
              class="w-full rounded-button border border-border-default bg-btn-secondary px-4 py-2 text-btn-secondary-fg shadow-elevation-1 transition-colors hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              @click="logout"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <main class="flex-1 p-4 md:p-8">
        <div class="mx-auto flex max-w-4xl flex-col gap-6">
          <header class="flex items-center justify-between gap-4">
            <h1 class="text-title-1 font-semibold">Home</h1>
            <button
              type="button"
              class="rounded-button bg-btn-primary px-4 py-2 text-btn-primary-fg shadow-elevation-1 transition-colors hover:bg-btn-primary-hover active:bg-btn-primary-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring md:hidden"
              @click="openCreatePanel"
            >
              Create
            </button>
          </header>

          <section v-if="error" class="rounded-card border border-border-default bg-surface-card p-4 text-accent-error">
            {{ error }}
          </section>
          <section v-if="loading" class="rounded-card border border-border-default bg-surface-card p-4">Loading...</section>

          <template v-if="!loading">
            <article
              v-for="post in posts"
              :key="post.id"
              class="relative rounded-card border border-border-default bg-surface-card p-6 shadow-elevation-1"
            >
              <div class="mb-3 flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 shrink-0 rounded-full bg-divider"></div>
                  <div>
                    <div class="text-sm font-semibold">{{ post.authorUsername || authorLabel(post) }}</div>
                    <div class="text-xs text-text-secondary">#{{ post.id }}</div>
                  </div>
                </div>
                <button
                  class="rounded-button px-2 py-1 text-text-secondary hover:bg-btn-secondary-hover"
                  aria-label="More actions"
                  @click.stop="toggleMenu(post.id)"
                >
                  ···
                </button>
              </div>

              <div class="whitespace-pre-wrap text-body-2">{{ post.content }}</div>

              <div class="mt-4 flex gap-3">
                <button
                  class="inline-flex items-center gap-2 rounded-button border border-border-default bg-surface-card px-3 py-2 text-text-primary transition-colors hover:bg-btn-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  :disabled="acting[post.id] === true"
                  @click="toggleLike(post)"
                >
                  <template v-if="ICONS">
                    <img
                      :src="liked[post.id] ? ICONS.likeFilled : ICONS.likeOutline"
                      alt="Like"
                      class="h-[18px] w-[18px] select-none object-contain"
                      width="18"
                      height="18"
                    />
                  </template>
                  <template v-else>
                    <svg
                      v-if="!liked[post.id]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="h-[18px] w-[18px] text-text-secondary"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                    >
                      <path d="M12.1 8.64l.9.92.9-.92a3.5 3.5 0 115 4.9l-5.9 6.06a1.5 1.5 0 01-2.16 0L5.04 13.5a3.5 3.5 0 015-4.9z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-[18px] w-[18px] text-accent-error" fill="currentColor">
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.99 4.22 2.5C11.59 4.99 13.26 4 15 4 17.5 4 19.5 6 19.5 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      />
                    </svg>
                  </template>
                  <span class="text-sm">{{ post.likeCount || 0 }}</span>
                </button>

                <button
                  class="inline-flex items-center gap-2 rounded-button border border-border-default bg-btn-secondary px-3 py-2 text-btn-secondary-fg transition-colors hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  disabled
                  title="Comments coming soon"
                >
                  <template v-if="ICONS">
                    <img
                      :src="ICONS.comment"
                      alt="Comment"
                      class="h-[23px] w-[23px] select-none object-contain"
                      width="23"
                      height="23"
                    />
                  </template>
                  <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-[23px] w-[23px]" fill="none" stroke="currentColor" stroke-width="1.6">
                      <path d="M21 12a8 8 0 11-3.515-6.62L21 5v7z" />
                    </svg>
                  </template>
                  <span class="text-sm">{{ post.commentCount || 0 }}</span>
                </button>
              </div>

              <div v-if="menuOpen === post.id" class="absolute right-2 top-10 z-10">
                <div class="flex items-center gap-3 rounded-card border border-border-default bg-surface-card p-3 shadow-elevation-2">
                  <button
                    class="inline-flex items-center gap-2 rounded-button border border-border-default bg-surface-card px-4 py-2 text-text-primary hover:bg-btn-secondary-hover"
                    @click.stop="handleEdit(post)"
                  >
                    <template v-if="ICONS">
                      <img :src="ICONS.edit" alt="Edit" class="h-[23px] w-[23px] select-none object-contain" width="23" height="23" />
                    </template>
                    <template v-else>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-[23px] w-[23px]" fill="none" stroke="currentColor" stroke-width="1.6">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
                        <path d="M20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </template>
                    <span>Edit</span>
                  </button>
                  <button
                    class="inline-flex items-center gap-2 rounded-button bg-accent-error px-4 py-2 text-text-invert transition hover:opacity-90"
                    @click.stop="handleDelete(post)"
                  >
                    <template v-if="ICONS">
                      <img :src="ICONS.delete" alt="Delete" class="h-[21px] w-[21px] select-none object-contain" width="21" height="21" />
                    </template>
                    <template v-else>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-[21px] w-[21px]" fill="none" stroke="currentColor" stroke-width="1.6">
                        <path d="M3 6h18" />
                        <path d="M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6" />
                        <path d="M10 6V4a2 2 0 012-2h0a2 2 0 012 2v2" />
                      </svg>
                    </template>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </article>

            <div v-if="posts.length === 0" class="rounded-card border border-border-default bg-surface-card p-6 text-text-secondary">
              尚無貼文
            </div>
          </template>

          <div class="mt-2 flex items-center justify-center gap-3">
            <button
              class="rounded-button border border-border-default bg-btn-secondary px-4 py-2 text-btn-secondary-fg hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-disabled"
              :disabled="page === 0 || loading"
              @click="prevPage"
            >
              上一頁
            </button>
            <div class="text-sm text-text-secondary">Page {{ page + 1 }}</div>
            <button
              class="rounded-button bg-btn-primary px-4 py-2 text-btn-primary-fg hover:bg-btn-primary-hover active:bg-btn-primary-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-disabled"
              :disabled="!hasNext || loading"
              @click="nextPage"
            >
              下一頁
            </button>
          </div>
        </div>
      </main>

      <Transition
        enter-active-class="transform transition duration-300 ease-out"
        enter-from-class="translate-y-full opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transform transition duration-200 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-full opacity-0"
      >
        <section
          v-if="showCreatePanel"
          class="fixed inset-x-0 bottom-0 top-0 z-30 flex items-end justify-center bg-black/30 md:left-[260px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-panel-title"
          @click.self="closeCreatePanel"
        >
          <div class="relative z-10 w-full max-w-3xl rounded-t-[32px] bg-surface-card p-6 shadow-elevation-3 md:h-[90vh] md:rounded-card md:p-10">
            <h2 id="create-panel-title" class="sr-only">Create a post</h2>
            <header class="flex items-center gap-4">
              <div class="h-12 w-12 rounded-full bg-divider"></div>
              <div>
                <p class="text-sm font-semibold">You</p>
                <p class="text-xs text-text-secondary">Post</p>
              </div>
            </header>

            <label for="create-panel-input" class="sr-only">Share your thoughts</label>
            <textarea
              id="create-panel-input"
              v-model="createContent"
              rows="8"
              placeholder="What's on your mind?"
              class="mt-6 h-[55vh] w-full resize-none rounded-input border border-input-border bg-input-bg px-4 py-4 text-lg text-text-primary placeholder:text-input-placeholder shadow-inner focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring"
            />

            <div class="mt-6 flex flex-wrap items-center gap-4">
              <span v-if="createError" class="mr-auto text-sm text-accent-error">{{ createError }}</span>
              <button
                type="button"
                class="rounded-button border border-border-default px-5 py-2 text-text-secondary shadow-elevation-1 transition hover:bg-btn-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-disabled"
                :disabled="createLoading"
                @click="closeCreatePanel"
              >
                Cancel
              </button>
              <button
                type="button"
                class="flex items-center gap-2 rounded-button bg-btn-primary px-6 py-2 text-btn-primary-fg shadow-elevation-1 transition-colors hover:bg-btn-primary-hover active:bg-btn-primary-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-disabled"
                :disabled="createLoading || !createContent.trim()"
                @click="handleCreateSubmit"
              >
                <span>+</span>
                <span>{{ createLoading ? 'Posting...' : 'Post' }}</span>
              </button>
            </div>
          </div>
        </section>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/apiClient'
import { ICONS as ICONS_CONFIG } from '@/constants/icons'

const router = useRouter()
const ICONS = ICONS_CONFIG

const posts = ref([])
const loading = ref(false)
const error = ref('')
const page = ref(0)
const size = ref(10)
const hasNext = ref(false)
const menuOpen = ref(null)
const liked = ref({})
const acting = ref({})

const createContent = ref('')
const createLoading = ref(false)
const createError = ref('')
const showCreatePanel = ref(false)

const sidebarThemeStyle = {
  '--bg-sidebar': '#111827',
  '--border-default': '#1F2937',
  '--text-primary': '#F9FAFB',
  '--text-secondary': '#9CA3AF',
  '--btn-secondary-bg': '#1F2937',
  '--btn-secondary-bg-hover': 'color-mix(in srgb, #1F2937 92%, white)',
  '--btn-secondary-bg-pressed': 'color-mix(in srgb, #1F2937 86%, white)',
  '--btn-secondary-fg': '#F9FAFB',
}

const createNavClasses = computed(() =>
  showCreatePanel.value
    ? 'bg-btn-secondary text-accent-primary shadow-elevation-1'
    : 'text-text-secondary hover:bg-btn-secondary-hover',
)

onMounted(() => {
  fetchFeed()
  window.addEventListener('click', onClickOutside)
})

onUnmounted(() => window.removeEventListener('click', onClickOutside))

function openCreatePanel() {
  showCreatePanel.value = true
  createError.value = ''
}

function closeCreatePanel() {
  showCreatePanel.value = false
  createError.value = ''
}

async function fetchFeed() {
  loading.value = true
  error.value = ''
  try {
    const res = await api.get(`/posts/feed?page=${page.value}&size=${size.value}&sort=CREATED_DESC`)
    posts.value = Array.isArray(res?.content) ? res.content : []
    const totalPages = Number(res?.totalPages ?? 0)
    hasNext.value = page.value + 1 < totalPages
  } catch (e) {
    error.value = e?.message || '載入貼文失敗'
  } finally {
    loading.value = false
  }
}

function authorLabel(post) {
  if (!post) return '未知使用者'
  return post.authorDisplayName || `User #${post.authorId ?? '?'}`
}

async function toggleLike(post) {
  if (!post?.id || acting.value[post.id]) return
  acting.value[post.id] = true
  try {
    const isLiked = !!liked.value[post.id]
    const path = isLiked ? `/posts/${post.id}/unlike` : `/posts/${post.id}/like`
    const res = await api.post(path)
    const idx = posts.value.findIndex(p => p.id === post.id)
    if (idx !== -1) posts.value[idx] = res
    liked.value[post.id] = !isLiked
  } catch (e) {
    error.value = e?.message || '操作失敗'
  } finally {
    acting.value[post.id] = false
  }
}

function toggleMenu(id) {
  menuOpen.value = menuOpen.value === id ? null : id
}

function onClickOutside() {
  menuOpen.value = null
}

async function handleEdit(post) {
  const current = String(post?.content ?? '')
  const next = window.prompt('Edit post content', current)
  if (next == null) return
  const trimmed = next.trim()
  if (!trimmed || trimmed === current) {
    menuOpen.value = null
    return
  }
  try {
    const res = await api.put(`/posts/${post.id}`, { content: trimmed })
    const idx = posts.value.findIndex(p => p.id === post.id)
    if (idx !== -1) posts.value[idx] = res
  } catch (e) {
    error.value = e?.message || '更新失敗'
  } finally {
    menuOpen.value = null
  }
}

async function handleDelete(post) {
  if (!confirm('確定要刪除這則貼文嗎？')) return
  try {
    await api.delete(`/posts/${post.id}`)
    posts.value = posts.value.filter(p => p.id !== post.id)
  } catch (e) {
    error.value = e?.message || '刪除失敗'
  } finally {
    menuOpen.value = null
  }
}

function prevPage() {
  if (page.value === 0) return
  page.value -= 1
  fetchFeed()
}

function nextPage() {
  if (!hasNext.value) return
  page.value += 1
  fetchFeed()
}

function logout() {
  showCreatePanel.value = false
  try {
    localStorage.removeItem('token')
  } catch {}
  router.push({ name: 'Login' })
}

async function createPost() {
  createError.value = ''
  const content = (createContent.value || '').trim()
  if (!content) {
    createError.value = '內容不可為空白'
    return false
  }
  createLoading.value = true
  try {
    const res = await api.post('/posts', { content })
    posts.value = [res, ...(posts.value || [])]
    createContent.value = ''
    return true
  } catch (e) {
    createError.value = e?.message || '建立貼文失敗'
    return false
  } finally {
    createLoading.value = false
  }
}

async function handleCreateSubmit() {
  const ok = await createPost()
  if (ok) closeCreatePanel()
}
</script>
