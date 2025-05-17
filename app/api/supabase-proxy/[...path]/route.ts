import { NextRequest } from "next/server"

const target = "http://127.0.0.1:54321"

export const dynamic = "force-dynamic"

function buildUrl(req: NextRequest, path: string[]) {
  return `${target}/${path.join("/")}${req.nextUrl.search}`
}

async function proxyRequest(req: NextRequest, method: string, path: string[]) {
  const url = buildUrl(req, path)

  // Копируем заголовки вручную, исключая некоторые системные
  const headers = new Headers()
  for (const [key, value] of req.headers.entries()) {
    const lowerKey = key.toLowerCase()
    if (!["host", "connection"].includes(lowerKey)) {
      headers.set(key, value)
    }
  }

  // Подготовка тела запроса
  let body: BodyInit | undefined
  if (!["GET", "HEAD"].includes(method)) {
    // Важно: req.body нельзя напрямую передать, читаем вручную
    const text = await req.text()
    body = text
  }

  const fetchRes = await fetch(url, {
    method,
    headers,
    body
  })

  // Создаем новый Response и корректно обрабатываем set-cookie
  const responseHeaders = new Headers()
  fetchRes.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      const cookies = value.split(",").filter(v => v.includes("path="))
      for (const cookie of cookies) {
        responseHeaders.append("set-cookie", cookie.trim())
      }
    } else {
      responseHeaders.set(key, value)
    }
  })

  return new Response(fetchRes.body, {
    status: fetchRes.status,
    headers: responseHeaders
  })
}

// Проксирование всех HTTP-методов
export async function GET(
  req: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyRequest(req, "GET", context.params.path)
}

export async function POST(
  req: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyRequest(req, "POST", context.params.path)
}

export async function PUT(
  req: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyRequest(req, "PUT", context.params.path)
}

export async function PATCH(
  req: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyRequest(req, "PATCH", context.params.path)
}

export async function DELETE(
  req: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyRequest(req, "DELETE", context.params.path)
}

export async function OPTIONS(
  req: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyRequest(req, "OPTIONS", context.params.path)
}
