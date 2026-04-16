"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a real email alert via Resend.
 */
export async function sendEmailAlert(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is missing from environment variables.");
    return { success: false, message: "API Key missing" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Nexvelt Support <onboarding@resend.dev>', // Default for trial, update to your domain later
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Mailer Error:", err);
    return { success: false, error: err };
  }
}

/**
 * Checks if the user has email alerts enabled and sends an alert.
 */
export async function triggerNotificationIfEnabled(profile: any, subject: string, content: string) {
  if (profile?.notification_settings?.email_alerts) {
    await sendEmailAlert(profile.email, subject, `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #00C896;">Nexvelt Alert</h2>
        <p>${content}</p>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          You are receiving this because you enabled Email Alerts in your Nexvelt dashboard.
        </p>
      </div>
    `);
  }
}
