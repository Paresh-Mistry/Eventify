import { Team } from "./team"

interface FAQType {
    question: string
    answer: string
}

export interface EventType {
    id: number
    title: string
    description: string
    date: string
    start_time: string
    end_time: string
    is_online: boolean
    location: string
    email: string
    price: number
    organizer_id: number
    banner_image: string
    team:Team[]
    faqs: FAQType[]
}

export interface Booking  {
    id: number;
    user_id: number;
    event_id: number;
    status: string;
    booking_date: string;
    event?: EventType; 
};
