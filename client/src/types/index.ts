type AccordionItem = {
  question: string;
  answer: string | React.ReactNode;
};

export type AccordionProps = {
  items: AccordionItem[];
};

export type BookButtonProps = {
  userId: number;
  eventId: number;
  teamId: number;
  eventDate: any;
  eventTitle: string;
  userEmail: string;
  organizerEmail: string;
};
