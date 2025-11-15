const DEFAULT_TIMEOUT = 10000

const BASE_URL = import.meta?.env?.VITE_API_BASE_URL || '/api'

function getToken() {
  try {
    return localStorage.getItem('token')
  } catch {
    return null
  }
}

async function coreFetch(input, init = {}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT)

  try {
    const res = await fetch(input, { ...init, signal: controller.signal })
    const contentType = res.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')
    const data = isJson ? await res.json().catch(() => null) : await res.text()

    if (!res.ok) {
      const normalized = {
        code: res.status,
        message: data?.message || res.statusText || 'Request failed',
        details: data || null,
      }
      throw normalized
    }
    return data
  } catch (err) {
    if (err?.name === 'AbortError') {
      throw { code: 'TIMEOUT', message: 'Request timed out' }
    }
    if (!err?.code) {
      throw { code: 'NETWORK_ERROR', message: 'Network error', details: err }
    }
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}

function withAuthHeaders(headers = {}) {
  const token = getToken()
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers
}

function buildUrl(path) {
  if (!path.startsWith('http')) {
    return `${BASE_URL}${path}`
  }
  return path
}

const api = {
  get: (path, options = {}) => {
    return coreFetch(buildUrl(path), {
      method: 'GET',
      headers: withAuthHeaders(options.headers),
    })
  },
  post: (path, body, options = {}) => {
    return coreFetch(buildUrl(path), {
      method: 'POST',
      headers: withAuthHeaders({ 'Content-Type': 'application/json', ...(options.headers || {}) }),
      body: body != null ? JSON.stringify(body) : undefined,
    })
  },
  put: (path, body, options = {}) => {
    return coreFetch(buildUrl(path), {
      method: 'PUT',
      headers: withAuthHeaders({ 'Content-Type': 'application/json', ...(options.headers || {}) }),
      body: body != null ? JSON.stringify(body) : undefined,
    })
  },
  delete: (path, options = {}) => {
    return coreFetch(buildUrl(path), {
      method: 'DELETE',
      headers: withAuthHeaders(options.headers),
    })
  },
}

export default api

