<template>
  <div class="min-h-screen w-full bg-[url('/bg.jpg')] bg-cover bg-center bg-bg-page text-text-primary">
    <div class="relative min-h-screen">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute inset-0 bg-surface-overlay" />
      </div>

      <div class="relative container mx-auto flex min-h-screen max-w-[1440px] flex-col items-center justify-center">
        <div class="flex w-full flex-col items-center -translate-y-[100px]">
          <h1 class="text-inset-shadow-dark drop-shadow-md tracking-[0.32em] text-6xl font-extrabold select-none xs:text-7xl">
            EMO
          </h1>

          <div class="mt-6 w-full max-w-[360px] rounded-card border border-border-default bg-surface-card p-6 text-left text-text-primary shadow-elevation-2">
            <p v-if="notice" class="mb-3 text-sm text-accent-success">
              {{ notice }}
            </p>
            <form class="space-y-4" aria-label="Login form" @submit.prevent="onSubmit">
              <div>
                <label for="account" class="sr-only">Account</label>
                <input
                  id="account"
                  name="account"
                  type="text"
                  autocomplete="username"
                  placeholder="Account"
                  class="block w-full rounded-input border border-input-border bg-input-bg px-4 py-2 font-medium text-text-primary placeholder:text-input-placeholder shadow-inner transition-colors focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  v-model="form.username"
                />
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Password"
                  class="block w-full rounded-input border border-input-border bg-input-bg px-4 py-2 font-medium text-text-primary placeholder:text-input-placeholder shadow-inner transition-colors focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  v-model="form.password"
                />
              </div>
              <button
                type="submit"
                class="mt-1 w-full rounded-button bg-btn-primary py-2 text-center font-medium text-text-invert shadow-elevation-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring hover:bg-btn-primary-hover active:bg-btn-primary-pressed disabled:cursor-not-allowed disabled:opacity-disabled"
                :disabled="loading"
              >
                {{ loading ? 'Logging in...' : 'Login' }}
              </button>
              <p v-if="error" class="text-sm text-accent-error">
                {{ error }}
              </p>
            </form>
            <p class="mt-4 text-center text-sm text-text-secondary">
              Create an account.
              <button
                type="button"
                class="ml-1 font-medium text-link transition-colors hover:text-link-hover"
                @click="$router.push({ name: 'Register' })"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login as loginApi } from '@/services/authService'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const error = ref('')
const notice = ref('')
const form = reactive({ username: '', password: '' })

watch(
  () => route.query.registered,
  (registered) => {
    if (registered) {
      notice.value = 'Registration successful. Please sign in.'
      const nextQuery = { ...route.query }
      delete nextQuery.registered
      router.replace({ query: nextQuery })
    } else {
      notice.value = ''
    }
  },
  { immediate: true }
)

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    const res = await loginApi({ username: form.username, password: form.password })
    if (res?.token) {
      localStorage.setItem('token', res.token)
      await router.push({ name: 'Home' })
    } else {
      error.value = 'Login response is invalid'
    }
  } catch (e) {
    error.value = e?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

