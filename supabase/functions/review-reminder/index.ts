import { createClient } from '@supabase/supabase-js'

Deno.serve(async (req: Request) => {
  // Check authorization (useful if triggered via webhook rather than internal cron)
  const authHeader = req.headers.get('Authorization')
  if (!authHeader || authHeader !== `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`) {
    console.log("Missing or invalid Auth Header. Assuming pg_net trigger bypassing Gateway.");
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  const resendApiKey = Deno.env.get('RESEND_API_KEY') ?? ''

  // Initialize Supabase admin client to access auth schema
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    // 1. Get today's date in YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0]
    
    // 2. Query personal_auditions for today
    const { data: auditions, error: auditionsError } = await supabase
      .from('personal_auditions')
      .select('*')
      .eq('date', today)

    if (auditionsError) throw auditionsError
    
    if (!auditions || auditions.length === 0) {
      return new Response(
        JSON.stringify({ message: "No auditions scheduled for today", date: today }), 
        { headers: { "Content-Type": "application/json" } }
      )
    }

    const emailsSent = []
    
    // 3. Loop through auditions, fetch user email, and send reminder
    for (const audition of auditions) {
      // Fetch user data via Admin API
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(audition.user_id)
      
      if (!userError && userData?.user?.email) {
        const email = userData.user.email
        
        if (resendApiKey) {
          // Send email using Resend HTTP API
          const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify({
              // Note: Change 'onboarding@resend.dev' to your verified domain once added to Resend.
              // onboarding@resend.dev only works for sending emails to your OWN registered email address.
              from: 'Audition Insight <onboarding@resend.dev>', 
              to: email,
              subject: `Reminder: How did your audition at ${audition.orchestra} go?`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                  <h2 style="color: #ca8a04;">Hi there!</h2>
                  <p>We saw that you had an audition scheduled for <strong>${audition.title}</strong> at <strong>${audition.orchestra}</strong> today.</p>
                  <p>Don't forget to visit <a href="https://orchestra-auditions.com/calendar" style="color: #3b82f6;">Audition Insight</a> to leave an anonymous review.</p>
                  <p>Your reviews help build a transparent community for all musicians.</p>
                  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                  <p style="font-size: 12px; color: #888;">Best regards,<br/>The Audition Insight Team</p>
                </div>
              `
            })
          })
          
          if (res.ok) {
            emailsSent.push({ email, orchestra: audition.orchestra })
          } else {
             console.error("Resend API error:", await res.text())
          }
        } else {
          console.error("Missing RESEND_API_KEY environment variable")
        }
      }
    }
    
    return new Response(
      JSON.stringify({ 
        message: "Reminders processed", 
        auditionsFound: auditions.length,
        emailsSentCount: emailsSent.length, 
        emailsSent 
      }), 
      { headers: { "Content-Type": "application/json" } }
    )
    
  } catch (err) {
    console.error("Function error:", err)
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})
