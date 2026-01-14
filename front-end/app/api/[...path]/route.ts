import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = 'http://127.0.0.1:8000/api'

export async function GET(request: NextRequest) {
  return proxyRequest(request, 'GET')
}

export async function POST(request: NextRequest) {
  return proxyRequest(request, 'POST')
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request, 'PUT')
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request, 'DELETE')
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request, 'PATCH')
}

async function proxyRequest(request: NextRequest, method: string) {
  const path = request.nextUrl.pathname.replace('/api', '')
  const url = `${API_BASE_URL}${path}${request.nextUrl.search}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }

  // Forward Authorization header (Bearer token)
  const authorization = request.headers.get('authorization')
  if (authorization) {
    headers['Authorization'] = authorization
  }

  const cookie = request.headers.get('cookie')
  if (cookie) {
    headers['Cookie'] = cookie
  }

  // Forward other relevant headers
  const referer = request.headers.get('referer')
  if (referer) {
    headers['Referer'] = referer
  }

  const userAgent = request.headers.get('user-agent')
  if (userAgent) {
    headers['User-Agent'] = userAgent
  }

  try {
    const options: RequestInit = {
      method,
      headers,
      credentials: 'include',
    }

    // Add body for POST, PUT, PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const body = await request.text()
      if (body) {
        options.body = body
      }
    }

    const response = await fetch(url, options)
    
    const data = await response.text()
    
    const nextResponse = new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
    })

    // Forward all headers from the backend response, including Set-Cookie
    response.headers.forEach((value, key) => {
      nextResponse.headers.set(key, value)
    })

    const setCookieHeader = response.headers.get('set-cookie')
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader)
    }

    return nextResponse
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    )
  }
}
