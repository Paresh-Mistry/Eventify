"use client";

import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useEffect, useState } from "react";
import OrganizerSection from "@component/components/OrganizerSection";

export default function CreateEvent() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    email: "",
    location: "",
    isOnline: false,
    date: "",
    mode: "",
    startTime: "",
    endTime: "",
    price: "",
    bannerImage: null as File | null,
    faqs: [{ question: "", answer: "" }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      bannerImage: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("email", formData.email);
    form.append("location", formData.location);
    form.append("is_online", String(formData.isOnline));
    form.append("date", formData.date);
    form.append("start_time", formData.startTime);
    form.append("end_time", formData.endTime);
    form.append("price", formData.price);

    formData.faqs.forEach((faq, index) => {
      form.append(`faq_questions`, faq.question);
      form.append(`faq_answers`, faq.answer);
    });

    console.log(formData.faqs[0].question);

    if (formData.bannerImage) {
      form.append("banner_image", formData.bannerImage);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/events/", {
        method: "POST",
        body: form,
      });

      const data = await response.json(); // 🔥 READ ONLY ONCE

      console.log(data.data);

      if (!response.ok) {
        alert(`Error: ${data.detail || "Something went wrong."}`);
        return;
      }

      alert("✅ Event created successfully!");
      console.log("Created Event:", data);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit event.");
    }
  };

  return (
    <div className="flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full rounded-lg space-y-6">
        <h1 className="text-3xl pt-4 font-bold mb-4">
          {step == 1 ? "" : step - 1 + " - Step"}
        </h1>

        {step == 1 && <OrganizerSection nextStep={nextStep} />}

        {step === 2 && (
          <div className="flex md:flex-row pb-4 flex-col w-full gap-6">
            <div className="md:w-5/12 space-y-8">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex. Flipkart Grid 2024"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ex. xyz@gmail.com"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
                  required
                />
              </div>
              <div className="flex gap-2 w-full">
                <div className="w-1/2">
                  <label className="block mb-1 font-semibold text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ex. Bengaluru"
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-1 font-semibold text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Ex. 200Rs"
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isOnline"
                  checked={formData.isOnline}
                  onChange={handleChange}
                  className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="font-medium text-gray-700">
                  Online Event
                </label>
              </div>
            </div>

            <div className="md:w-7/12">
              <label className="block mb-1 font-semibold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ex. Hackathon includes rounds on problem solving, prototype building, etc."
                rows={10}
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex md:flex-row flex-col w-full gap-6">
            {/* Left side: Date & Time */}
            <div className="md:w-1/2 space-y-6">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Event Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Right side: File Upload */}
            <div className="md:w-1/2">
              <label className="block mb-1 font-semibold text-gray-700">
                File/Image Upload
              </label>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer bg-white hover:bg-gray-50 border-gray-300 transition-all duration-300 shadow-sm"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-3 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 16l-4-4-4 4m4-4v9M4 4h16"
                      />
                    </svg>
                    <p className="mb-1 text-sm text-gray-600">
                      <span className="font-semibold">Click to upload</span> or
                      drag & drop
                    </p>
                    <p className="text-xs text-gray-400">
                      SVG, PNG, JPG or GIF (Max 800x400px)
                    </p>
                    {formData.bannerImage && (
                      <p className="mt-3 text-sm text-green-600 font-medium">
                        {formData.bannerImage.name}
                      </p>
                    )}
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setFormData((prev) => ({
                        ...prev,
                        bannerImage: file || null,
                      }));
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">FAQs (Optional)</h2>

            {formData.faqs.map((faq, index) => (
              <div key={index} className="space-y-2 border-b pb-4">
                <div>
                  <label className="block font-medium">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...formData.faqs];
                      updated[index].question = e.target.value;
                      setFormData({ ...formData, faqs: updated });
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="What is the dress code?"
                  />
                </div>
                <div>
                  <label className="block font-medium">Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...formData.faqs];
                      updated[index].answer = e.target.value;
                      setFormData({ ...formData, faqs: updated });
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Casual attire is allowed."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...formData.faqs];
                    updated.splice(index, 1);
                    setFormData({ ...formData, faqs: updated });
                  }}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  faqs: [...formData.faqs, { question: "", answer: "" }],
                })
              }
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              + Add FAQ
            </button>
          </div>
        )}

        {step == 1 ? (
          ""
        ) : (
          <div className="flex justify-between my-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className={`px-4 py-2 border rounded ${
                step === 1 ? "cursor-not-allowed" : "hover:bg-gray-200"
              }`}
            >
              <ArrowLeftCircle />
            </button>
            {(step < 4 && (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 border rounded"
              >
                <ArrowRightCircle />
              </button>
            )) || (
              <>
                <button
                  type="submit"
                  className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded"
                >
                  Submit Event
                </button>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
