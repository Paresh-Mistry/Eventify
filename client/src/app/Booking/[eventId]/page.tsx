import Accordion from "@component/components/Accordian";
import BookButton from "@component/components/BookingButton";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import image from "../../../../public/vercel.svg";
import FormatDate from "@component/utils/FormatDate";
import React from "react";
import { IndianRupee } from "lucide-react";
import { log } from "console";
import MembersAside from "@component/components/MembersAside";
import { EventType } from "@component/types/event";
import clsx from "clsx";

async function getEvent(eventId: string): Promise<EventType | null> {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/events/${eventId}`);
    log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export default async function EventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await getEvent(params.eventId);

  console.log("Event ID: ", event?.id);

  const eventdate = (date: string) => {
    if (Number(date) > 0 && Number(date) < 12) {
      return date + " am";
    } else {
      return date + " pm";
    }
  };

  if (!event) {
    notFound();
  }

  return (
    <div className="flex md:flex-row flex-col w-full gap-3 items-start flex-grow max-w-7xl mx-auto">
      {/* Main Section (Desc, Contact) */}

      <div className="md:w-3/4 w-full py-3 bg-gray-100">
        <div className="px-3 mb-3 relative">
          <Image
            src={
              event.banner_image
                ? `http://localhost:8000/${event.banner_image}`
                : image
            }
            width={500}
            height={500}
            className="w-full h-64 borderborder-gray-400 rounded"
            alt="Picture of the author"
          />
          <div className="absolute right-10 bottom-10">
            <h1 className="text-2xl md:text-6xl font-extrabold text-gray-800">
              {event.title}
            </h1>
          </div>
        </div>

        <div className="px-4 py-2 bg-white rounded-xl shadow-sm mx-2 border border-gray-200 text-sm text-gray-700 font-medium flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-semibold flex items-center">
              {event.price ? (
                <>
                  {event.price}
                  <IndianRupee size={15} className="ml-1" />
                </>
              ) : (
                "Free"
              )}
            </span>
            <span className="mx-2 text-gray-400">|</span>
            <span>Event Mode:</span>
          </div>

          <span
            className={clsx(`px-2 py-1 rounded-full text-xs font-semibold` , 
              event.is_online
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {event.is_online ? "Online" : "Offline"}
          </span>
        </div>

        {/* Description Section */}

        <div className="px-4 py-5 mt-4 bg-white rounded-2xl shadow-md mx-2 border border-gray-200">
          <h3 className="text-2xl text-gray-800 mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {event.description}
          </p>
        </div>

        {/* Contact Organizer */}

        <div className="px-4 py-5 mt-4 bg-white rounded-2xl shadow-md mx-2 border border-gray-200">
          <h3 className="text-2xl text-gray-800 mb-2">Contact Organizer</h3>
          <Link
            href={`mailto:${event.email}`}
            className="text-blue-600 font-medium underline hover:text-blue-800 transition-colors"
          >
            {event.email}
          </Link>
          <p className="mt-2 text-gray-600 text-sm">
            Got more questions? Reach out via this email.
          </p>
        </div>

        <div className="px-4 py-5 mt-4 bg-white rounded-2xl shadow-md mx-2 border border-gray-200">
          <h3 className="text-2xl text-gray-800 mb-2">FAQ's</h3>
          <span>
            <Accordion items={event.faqs} />
          </span>
        </div>
      </div>

      {/* SideBar (Date \ time ) */}

      <div className="flex flex-col w-full md:w-1/4 my-4 gap-2">
        <div className="bg-white  rounded-2xl shadow-lg p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-xl font-thin text-blue-800 mb-5 border-b border-gray-300 pb-2">
            Event Details
          </h3>

          <div className="space-y-4 text-gray-700 text-sm">
            <div className="border-l-4 px-2 border-blue-500 rounded">
              <div className="flex flex-col">
                <span className="text-gray-500 font-medium">Start Time</span>
                <span className="text-base font-medium">
                  {eventdate(event.start_time.slice(0, 5))}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500 font-medium">End Time</span>
                <span className="text-base font-medium">
                  {eventdate(event.end_time.slice(0, 5))}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 font-medium">Ongoing On</span>
              <span className="text-base font-medium">
                <FormatDate eventdate={event.date} />
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 font-medium">Venue</span>
              <span className="text-base font-medium capitalize">
                {event.location}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <BookButton
              userEmail="user@example.com"
              organizerEmail={event.email}
              eventTitle={event.title}
              eventDate={<FormatDate eventdate={event.date} />}
              teamId={event.team.id}
              userId={event.organizer_id}
              eventId={event.id}
            />
          </div>
        </div>

        <MembersAside team={event.team} />
      </div>
    </div>
  );
}
