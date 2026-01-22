import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('redirect') || '/'

  if (code) {
    const cookieStore = request.cookies
    let cookiesToSet: { name: string; value: string; options: any }[] = []

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookies) {
            cookiesToSet = cookies
            cookies.forEach(({ name, value }) => 
              request.cookies.set(name, value)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // KRİTİK: setAll callback'inin çağrılmasını bekle
      // v2.91.0'da setAll callback'i exchangeCodeForSession tamamlandıktan SONRA çağrılıyor
      let retryCount = 0
      while (cookiesToSet.length === 0 && retryCount < 10) {
        await new Promise(resolve => setTimeout(resolve, 50))
        retryCount++
      }
      
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      let redirectUrl = `${origin}${next}`
      if (!isLocalEnv && forwardedHost) {
        redirectUrl = `https://${forwardedHost}${next}`
      }

      const response = NextResponse.redirect(redirectUrl)

      // Supabase'in bize verdiği cookieleri response'a ekle
      cookiesToSet.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options)
      })

      return response
    } else {
      console.error('Error exchanging code for session:', error.message)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_code_error`)
}
