"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

interface EventCardType {
  id: number
  title: string
  date: string
  is_online: boolean
  location: string
  organizer: {
    name: string
  }
}

interface BookingCountType {
  event_id: number
  booking_count: number
}

const EventCard: React.FC<{ inputVal?: string }> = ({ inputVal }) => {
  const [events, setEvents] = useState<EventCardType[]>([])
  const [participants, setParticipants] = useState<BookingCountType[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response1 = await axios.get('http://127.0.0.1:8000/event_fetch_data')
        const response2 = await axios.get('http://127.0.0.1:8000/event-booking-count')
        setEvents(response1.data)
        setParticipants(response2.data)
      } catch (error) {
        console.error("Failed to fetch events:", error)
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents = inputVal
    ? events.filter(event =>
      event.title.toLowerCase().includes(inputVal.toLowerCase())
    )
    : events

  return (
    <>
      {
        filteredEvents.length === 0 ? (
          <span className='bg-red-100 text-red-600 text-sm px-4 py-2 rounded shadow'>
            NO EVENTS FOUND NOW ..
          </span>
        ) : (
          filteredEvents.map((e) => {
            const booking = participants.find(p => p.event_id === e.id)
            const count = booking ? booking.booking_count : 0

            return (
              <Link href={`/Booking/${e.id}`} key={e.id}>
                <div className="group transition-transform hover:-translate-y-1 hover:shadow-xl bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200 shadow p-5 cursor-pointer hover:bg-white duration-300">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                        {e.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">#Hackathon #Event</p>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                      <p>
                        <span className="font-medium text-gray-700">Venue:</span>{" "}
                        {e.location.charAt(0).toUpperCase() + e.location.slice(1).toLowerCase()}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 text-xs rounded-full">
                        {e.is_online ? "Online" : "Offline"}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded-full">
                        Open
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 text-xs rounded-full">
                        Starts {e.date}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-gray-500 text-sm">
                        Participants: <span className="font-semibold">{count > 100 ? `100+` : count}</span>
                      </span>
                      <span className="text-gray-500 text-sm">
                        Organizer: <span className="font-semibold">
                          {e.organizer.name.toUpperCase()
                            .charAt(0) + e.organizer.name
                              .slice(1, e.organizer.name.length).
                              toLowerCase()}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        )
      }
    </>
  )
}

export default EventCard
