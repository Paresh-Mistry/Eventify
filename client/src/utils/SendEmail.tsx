// utils/email.ts
import axios from 'axios';

export type SendMailParams = {
  eventTitle: string;
  userEmail: string;
  organizerEmail: string;
  eventDate: string;
};

export const sendMail = async ({
  eventTitle,
  userEmail,
  organizerEmail,
  eventDate,
}: SendMailParams): Promise<boolean> => {
  try {
    const res = await axios.post('/api/send-email', {
      name: eventTitle,
      email: userEmail,
      organizer: organizerEmail,
      message: `Hello,\n\nThank you for registering for the event "${eventTitle}" scheduled on ${eventDate}.\n\nWe are excited to have you join us! If you have any questions, feel free to reach out.\n\nBest regards,\nThe Event Team`,
    });

    if (res.status === 200) {
      return true;
    } else {
      console.error('Failed to send email:', res.statusText);
      return false;
    }
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};
