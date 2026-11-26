const baseUrl = (import.meta.env.VITE_LARAVEL_API_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '')
const useMock = String(import.meta.env.VITE_USE_MOCK_API || 'true').toLowerCase() === 'true'

export async function apiRequest(endpoint, options = {}) {
  if (useMock) return { mocked: true }

  const headers = { Accept: 'application/json', ...options.headers }
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
    body: options.body instanceof FormData || typeof options.body === 'string'
      ? options.body
      : options.body
        ? JSON.stringify(options.body)
        : undefined,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Permintaan gagal diproses.')
  return data
}
