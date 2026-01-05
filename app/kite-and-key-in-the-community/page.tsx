"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function KiteAndKeyInTheCommunityPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F7F5FB] to-[#EEEAF8]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#E6E0F5]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D9CFF2]/30 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#5E5574]/10 px-4 py-2 mb-6">
                <span className="text-lg">🤝</span>
                <span className="text-sm font-medium text-[#5E5574]">Community Outreach</span>
              </div>
              
              <h1 className="font-julius text-4xl md:text-5xl lg:text-6xl text-[#3F3A52] leading-tight mb-6">
                Kite & Key in the{" "}
                <span className="bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] bg-clip-text text-transparent">
                  Community
                </span>
              </h1>
              
              <p className="text-lg text-[#6B647F] leading-relaxed mb-8 max-w-xl">
                At Kite & Key Academy, we believe education extends beyond the classroom. 
                We're committed to making a positive impact across Australian communities 
                through partnerships, volunteering, and educational initiatives.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5E5574] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#4F4865] hover:shadow-lg hover:shadow-[#5E5574]/25"
                >
                  Partner With Us
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="#initiatives"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D9CFF2] bg-white/70 px-6 py-3 text-sm font-medium text-[#5E5574] transition-all hover:bg-white hover:border-[#5E5574]/30"
                >
                  View Our Initiatives
                </Link>
              </div>
            </div>
            
            {/* Hero Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80"
                      alt="Sydney Opera House"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80"
                      alt="Australian landscape"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=800&q=80"
                      alt="Melbourne city"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1494233892892-84542a694e72?w=800&q=80"
                      alt="Australian beach"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-[#E6E1F2]">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4F1FB]">
                    <span className="text-2xl">🌏</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#3F3A52]">50+</div>
                    <div className="text-sm text-[#6B647F]">Communities Reached</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#3F3A52] mb-1">{stat.value}</div>
                <div className="text-sm text-[#6B647F]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section id="initiatives" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-4">
              Our Community Initiatives
            </h2>
            <p className="text-[#6B647F] max-w-2xl mx-auto">
              Discover how we're making a difference across Australia through education, 
              support, and meaningful partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIATIVES.map((initiative, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E6E1F2] hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={initiative.image}
                    alt={initiative.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-[#5E5574]">
                      {initiative.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#3F3A52] mb-2 group-hover:text-[#5E5574] transition-colors">
                    {initiative.title}
                  </h3>
                  <p className="text-sm text-[#6B647F] mb-4">{initiative.description}</p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5E5574] hover:text-[#3F3A52] transition-colors"
                  >
                    Learn more
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-4">
              Moments That Matter
            </h2>
            <p className="text-[#6B647F] max-w-2xl mx-auto mb-8">
              A glimpse into our community events, workshops, and the connections we've built across Australia.
            </p>
            
            {/* Filter tabs */}
            <div className="inline-flex items-center gap-2 p-1 bg-[#F4F1FB] rounded-xl">
              {GALLERY_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter.id
                      ? "bg-white text-[#3F3A52] shadow-sm"
                      : "text-[#6B647F] hover:text-[#3F3A52]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl ${
                  index === 0 || index === 5 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <div className={`relative ${index === 0 || index === 5 ? "h-[400px]" : "h-48"}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium">{image.alt}</p>
                      <p className="text-white/70 text-xs">{image.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-4">
              Our Community Partners
            </h2>
            <p className="text-[#6B647F] max-w-2xl mx-auto">
              We're proud to work alongside these organizations to bring quality education to communities across Australia.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {PARTNERS.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-white rounded-xl border border-[#E6E1F2] hover:shadow-lg transition-shadow"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{partner.icon}</div>
                  <div className="text-xs font-medium text-[#6B647F]">{partner.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#5E5574]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-julius text-3xl md:text-4xl text-white mb-4">
              Voices from the Community
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Hear from the families and communities we've had the privilege to serve.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/90 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-medium">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="font-julius text-3xl md:text-4xl text-[#3F3A52] mb-4">
                Upcoming Community Events
              </h2>
              <p className="text-[#6B647F] max-w-xl">
                Join us at our next community event. We'd love to meet you!
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#5E5574] hover:text-[#3F3A52] mt-4 md:mt-0"
            >
              View all events
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.map((event, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E6E1F2] hover:shadow-lg transition-all"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white rounded-xl px-3 py-2 shadow-lg">
                    <div className="text-xs font-medium text-[#5E5574] uppercase">{event.month}</div>
                    <div className="text-2xl font-bold text-[#3F3A52]">{event.day}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#6B647F] mb-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                  <h3 className="text-lg font-semibold text-[#3F3A52] mb-2 group-hover:text-[#5E5574] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-[#6B647F] mb-4">{event.description}</p>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center w-full gap-2 rounded-xl border border-[#D9CFF2] bg-[#F7F5FB] px-4 py-2.5 text-sm font-medium text-[#5E5574] transition-all hover:bg-[#5E5574] hover:text-white hover:border-[#5E5574]"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#5E5574] to-[#8B7FA8] p-8 md:p-16">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-julius text-3xl md:text-4xl text-white mb-4">
                  Want to Get Involved?
                </h2>
                <p className="text-white/80 mb-6">
                  Whether you're an organization looking to partner, a volunteer eager to help, 
                  or a community seeking educational support, we'd love to hear from you.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-[#5E5574] transition-all hover:bg-[#F7F5FB] hover:shadow-lg"
                  >
                    Get in Touch
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                  >
                    Volunteer With Us
                  </Link>
                </div>
              </div>
              
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80"
                  alt="Community gathering"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white/50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="font-julius text-2xl md:text-3xl text-[#3F3A52] mb-4">
            Stay Connected
          </h2>
          <p className="text-[#6B647F] mb-8">
            Subscribe to our newsletter for updates on community events, initiatives, and stories.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-[#D9CFF2] bg-white px-4 py-3 text-sm text-[#3F3A52] placeholder-[#9A95AF] focus:border-[#5E5574] focus:outline-none focus:ring-2 focus:ring-[#5E5574]/20"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#5E5574] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#4F4865] hover:shadow-lg hover:shadow-[#5E5574]/25"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

/* ==================== Data ==================== */

const STATS = [
  { icon: "🎓", value: "2,500+", label: "Students Supported" },
  { icon: "🏫", value: "75+", label: "Schools Visited" },
  { icon: "📍", value: "50+", label: "Communities Reached" },
  { icon: "🤝", value: "30+", label: "Active Partnerships" },
];

const INITIATIVES = [
  {
    title: "Rural Education Outreach",
    description: "Bringing quality tutoring and educational resources to students in remote Australian communities.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    tag: "Outreach",
  },
  {
    title: "Indigenous Learning Support",
    description: "Partnering with Indigenous communities to provide culturally sensitive educational support.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    tag: "Partnership",
  },
  {
    title: "Free Workshop Fridays",
    description: "Weekly free study skills and exam preparation workshops open to all students.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    tag: "Workshops",
  },
  {
    title: "Scholarship Program",
    description: "Providing full scholarships to academically promising students from disadvantaged backgrounds.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    tag: "Scholarships",
  },
  {
    title: "Parent Education Nights",
    description: "Empowering parents with tools and strategies to support their children's learning at home.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    tag: "Events",
  },
  {
    title: "School Partnership Program",
    description: "Collaborating with schools to provide supplementary tutoring and mentorship programs.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    tag: "Partnership",
  },
];

const GALLERY_FILTERS = [
  { id: "all", label: "All" },
  { id: "events", label: "Events" },
  { id: "workshops", label: "Workshops" },
  { id: "outreach", label: "Outreach" },
];

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
    alt: "Sydney Harbour event",
    location: "Sydney, NSW",
  },
  {
    src: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&q=80",
    alt: "Community workshop",
    location: "Melbourne, VIC",
  },
  {
    src: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=800&q=80",
    alt: "Melbourne outreach",
    location: "Melbourne, VIC",
  },
  {
    src: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=800&q=80",
    alt: "Brisbane education fair",
    location: "Brisbane, QLD",
  },
  {
    src: "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=800&q=80",
    alt: "Rural school visit",
    location: "Outback, QLD",
  },
  {
    src: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80",
    alt: "Perth community day",
    location: "Perth, WA",
  },
  {
    src: "https://images.unsplash.com/photo-1494233892892-84542a694e72?w=800&q=80",
    alt: "Gold Coast event",
    location: "Gold Coast, QLD",
  },
  {
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    alt: "Adelaide workshop",
    location: "Adelaide, SA",
  },
];

const PARTNERS = [
  { icon: "🏛️", name: "Education NSW" },
  { icon: "📚", name: "Libraries Australia" },
  { icon: "🎯", name: "Youth Focus" },
  { icon: "🌱", name: "Green Schools" },
  { icon: "💼", name: "Career Connect" },
  { icon: "🏥", name: "Health Ed" },
];

const TESTIMONIALS = [
  {
    quote: "Kite & Key's outreach program transformed our rural school. The students are more engaged and confident than ever before.",
    name: "Sarah Mitchell",
    role: "Principal, Wagga Wagga Public School",
  },
  {
    quote: "The scholarship changed my daughter's life. She's now thriving academically and has dreams of becoming an engineer.",
    name: "David Chen",
    role: "Parent, Western Sydney",
  },
  {
    quote: "Their culturally sensitive approach made all the difference. Our community finally has access to quality education support.",
    name: "Emma Williams",
    role: "Community Leader, Northern Territory",
  },
];

const EVENTS = [
  {
    title: "Free Study Skills Workshop",
    description: "Learn proven techniques to improve focus, retention, and exam performance.",
    location: "Sydney CBD",
    month: "Mar",
    day: "15",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
  },
  {
    title: "Parent Information Evening",
    description: "Discover how to support your child's learning journey at home.",
    location: "Melbourne, VIC",
    month: "Mar",
    day: "22",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
  },
  {
    title: "Community Education Fair",
    description: "Meet our tutors, explore programs, and connect with other families.",
    location: "Brisbane, QLD",
    month: "Apr",
    day: "05",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
];