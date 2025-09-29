import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-4 text-center">
        <span className="bg-blue-50 text-blue-800 text-xs font-medium me-2 px-2.5 py-1 rounded-sm dark:text-blue-400 border border-blue-400">OpenSource Events</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans mt-4 mb-4">Welcome to Eventify</h1>
        <p className="text-lg md:text-xl mb-6">Discover and join amazing events near you!</p>
        <Link href={'/Events'} className="bg-blue-400 shadow-md text-white rounded-2xl px-6 py-2 transition">
          Explore Events
        </Link>
      </section>
      <section className="py-12 max-w-7xl mx-auto px-6 bg-gray-100 md:rounded-full shadow-md mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl mb-6">Why Use Our Event Platform?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-4xl mb-2 text-blue-600">🎟️</div>
              <h3 className="mb-1">Easy Ticketing</h3>
              <p className="text-gray-600">Create, manage, and sell tickets with just a few clicks.</p>
            </div>
            <div>
              <div className="text-4xl mb-2 text-green-600">📈</div>
              <h3 className="mb-1">Real-time Analytics</h3>
              <p className="text-gray-600">Track registrations and sales in real time.</p>
            </div>
            <div>
              <div className="text-4xl mb-2 text-purple-600">🔔</div>
              <h3 className="mb-1">Instant Notifications</h3>
              <p className="text-gray-600">Keep attendees updated with automated alerts.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
