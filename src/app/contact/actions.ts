"use server";

import { z } from "zod";
import { Resend } from "resend";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type ContactFormState = {
  message: string;
  status: "success" | "error" | "idle";
};

// Initialize resend only if the API key is available.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {

  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  // Always return success to the user, but handle validation internally.
  if (!validatedFields.success) {
    // Log the validation error for debugging, but don't show a specific error to the user.
    console.error("Contact form validation failed:", validatedFields.error.flatten().fieldErrors);
    return {
      message: "Thank you for your message! We will get back to you soon.",
      status: "success",
    };
  }

  const { name, email, message } = validatedFields.data;

  // Only attempt to send an email if resend has been initialized.
  if (resend) {
    try {
      const { error } = await resend.emails.send({
        from: 'Community Hub <onboarding@resend.dev>',
        to: ['nethajiyuvasene@gmail.com'],
        subject: `New Contact Form Submission from ${name}`,
        reply_to: email,
        html: `
            <p>You have received a new message from your website's contact form.</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
      });

      if (error) {
          console.error("Resend error:", error);
      }
    } catch (e) {
      console.error("Failed to send email:", e);
    }
  } else {
    console.log("RESEND_API_KEY is not configured. Skipping email send.");
    // You can add further local development logic here, e.g., logging the form data.
    console.log("Form data:", { name, email, message });
  }

  // Always return a success message to the user.
  return {
    message: "Thank you for your message! We will get back to you soon.",
    status: "success",
  };
}
