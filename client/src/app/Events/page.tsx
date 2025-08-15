"use client"

import { useState } from 'react';
import EventCard from '@component/components/EventCard';

export default function Page() {
    
    const [inputVal, setInputVal] = useState<string>('')

    return (

        <div className='max-w-7xl mx-auto px-4 py-6'>

            {/* Header + Search */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <h1 className='text-2xl font-semibold text-gray-800'>
                    Upcoming & Ongoing Events
                </h1>
                <input 
                    type="search" 
                    placeholder='Search Events...' 
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)} 
                    className='w-full md:w-80 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg px-4 py-2 transition-all duration-200 ease-in-out' 
                />
            </div>

            {/* Event Cards Grid */}
            <div className='grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3'>
                <EventCard inputVal={inputVal} />
            </div>

        </div>

    )
}
