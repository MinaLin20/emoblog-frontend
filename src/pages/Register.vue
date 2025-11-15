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
            <form class="space-y-4" aria-label="Register form" @submit.prevent="onSubmit">
              <div>
                <label for="register-account" class="sr-only">Account</label>
                <input
                  id="register-account"
                  name="account"
                  type="text"
                  autocomplete="username"
                  placeholder="Account"
                  class="block w-full rounded-input border border-input-border bg-input-bg px-4 py-2 font-medium text-text-primary placeholder:text-input-placeholder shadow-inner transition-colors focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  v-model="form.username"
                />
              </div>
              <div>
                <label for="register-password" class="sr-only">Password</label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  placeholder="Password"
                  class="block w-full rounded-input border border-input-border bg-input-bg px-4 py-2 font-medium text-text-primary placeholder:text-input-placeholder shadow-inner transition-colors focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  v-model="form.password"
                />
              </div>
              <div>
                <label for="register-first-name" class="sr-only">First name</label>
                <input
                  id="register-first-name"
                  name="firstName"
                  type="text"
                  autocomplete="given-name"
                  placeholder="First name"
                  class="block w-full rounded-input border border-input-border bg-input-bg px-4 py-2 font-medium text-text-primary placeholder:text-input-placeholder shadow-inner transition-colors focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  v-model="form.firstName"
                />
              </div>
              <div>
                <label for="register-last-name" class="sr-only">Last name</label>
                <input
                  id="register-last-name"
                  name="lastName"
                  type="text"
                  autocomplete="family-name"
                  placeholder="Last name"
                  class="block w-full rounded-input border border-input-border bg-input-bg px-4 py-2 font-medium text-text-primary placeholder:text-input-placeholder shadow-inner transition-colors focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  v-model="form.lastName"
                />
              </div>
              <div>
                <label for="register-birthday" class="sr-only">Birthday</label>
                <input
                  id="register-birthday"
                  name="birthday"
                  type="date"
                  autocomplete="bday"
                  placeholder="Birthday"
                  class="block w-full rounded-input border border-input-border bg-input-bg px-4 py-2 font-medium text-text-primary placeholder:text-input-placeholder shadow-inner transition-colors focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  v-model="form.birthday"
                />
              </div>
              <button
                type="submit"
                class="mt-1 w-full rounded-button bg-btn-primary py-2 text-center font-medium text-text-invert shadow-elevation-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring hover:bg-btn-primary-hover active:bg-btn-primary-pressed disabled:cursor-not-allowed disabled:opacity-disabled"
                :disabled="loading"
              >
                {{ loading ? 'Registering...' : 'Register' }}
              </button>
              <p v-if="error" class="text-sm text-accent-error">
                {{ error }}
              </p>
            </form>
            <p class="mt-4 text-center text-sm text-text-secondary">
              Do you already have an account?
              <button
                type="button"
                class="ml-1 font-medium text-link transition-colors hover:text-link-hover"
                @click="$router.push({ name: 'Login' })"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register as registerApi } from '@/services/authService'

const router = useRouter()
const loading = ref(false)
const error = ref('')
const emptyForm = { username: '', password: '', firstName: '', lastName: '', birthday: '' }
const form = reactive({ ...emptyForm })

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await registerApi({ ...form })
    Object.assign(form, emptyForm)
    await router.push({ name: 'Login', query: { registered: '1' } })
  } catch (e) {
    error.value = e?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>
