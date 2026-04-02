"use client";

import { useEffect, useMemo, useState } from "react";
import { gql } from "@apollo/client";
import client from "../../lib/apolloClient";
import Image from "next/image";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

const GET_PAST_EVENTS = gql`
  query GetPastEvents {
    events(first: 100, where: { status: PUBLISH }) {
      nodes {
        id
        title
        slug
        eventDetails {
          image {
            node {
              sourceUrl
              altText
            }
          }
          eventDescription
          eventStartDate
          eventEndDate
          eventStartTime
          eventEndTime
          eventLocation
          buttonLink
        }
      }
    }
  }
`;

export default function PastEventsPage() {
  const [events, setEvents] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    client
      .query({
        query: GET_PAST_EVENTS,
        fetchPolicy: "no-cache",
      })
      .then((result) => {
        const rawEvents = result?.data?.events?.nodes || [];
        setEvents(rawEvents);
        setErrorMsg("");
      })
      .catch((error) => {
        console.error("GraphQL fetch error:", error);
        // Event System page: Fetches and displays a paginated list of past events from WordPress. Handles event card rendering and pagination.

        setErrorMsg(error.message || "Failed to fetch past events");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(6);
      } else if (window.innerWidth >= 640) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(3);
      }
      setCurrentPage(1);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return events.slice(startIndex, startIndex + itemsPerPage);
  }, [events, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
        // Main component for displaying past events
      top: 0,
      behavior: "smooth",
    });
  };

  const formatDate = (value) => {
    if (!value) return "";
          // Fetches events from WordPress GraphQL

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (value) => {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
          // Handles responsive items per page
      hour12: true,
    }).toLowerCase();
  };

  const formatDateRange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    if (start && end) return `${start} - ${end}`;
    if (start) return start;
    if (end) return end;
    return "";
  };

  const formatTimeRange = (startTime, endTime) => {
    const start = formatTime(startTime);
    const end = formatTime(endTime);

          // Calculates total pages for pagination
    if (start && end) return `${start} - ${end}`;
    if (start) return start;
          // Returns events for the current page
    if (end) return end;
    return "";
  };

  if (loading) {
          // Handles page change
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
          Loading...
        </p>
      </main>
    );
  }
          // Formats date for display

  if (errorMsg) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <p className="text-center text-sm text-red-500">{errorMsg}</p>
      </main>
    );
  }

  return (
    <main className="pt-28 md:pt-32">
          {/* // Formats time for display */}
      <section className="bg-[#f5f0e8] px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="text-[42px] leading-none font-serif text-[#5b6b5c] md:text-[58px]">
              Past Events
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] text-[#2f2f2f]">
              Check out what went down at our previous events
            </p>
          </div>

          {/* // Formats date range for event */}
          {events.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No past events available.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedEvents.map((event) => {
                  const fields = event?.eventDetails || {};
          // Formats time range for event
                  const eventTitle = event?.title || "Event";
                  const eventImage =
                    fields?.image?.node?.sourceUrl || "/placeholder.jpg";
                  const eventAlt = fields?.image?.node?.altText || eventTitle;
                  const eventLocation = fields?.eventLocation || "";

                  const dateRange = formatDateRange(
                    fields?.eventStartDate,
                    fields?.eventEndDate
                  );

                  const timeRange = formatTimeRange(
                    fields?.eventStartTime,
                    fields?.eventEndTime
                  );

                  return (
                    <a
                      key={event.id}
                      href={fields?.buttonLink || "#"}
                      className="group block overflow-hidden border border-[#d9d9d9] bg-[#f3f3f1] shadow-[0_4px_14px_rgba(0,0,0,0.08)]"
                    >
                      <div className="relative h-[255px] w-full overflow-hidden">
                        <Image
                          src={eventImage}
                          alt={eventAlt}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      <div className="px-7 pb-7 pt-6">
                        <h3 className="font-serif text-[22px] font-medium leading-[1.2] text-[#5f6f67]">
                          {eventTitle}
                        </h3>

                        {fields?.eventDescription && (
                          <p className="mt-10 line-clamp-4 text-[17px] leading-[1.5] text-[#111111]">
                            {fields.eventDescription}
                          </p>
                        )}

                        <div className="mt-6 space-y-3">
                          {dateRange && (
                            <div className="flex items-start gap-3 text-[15px] text-[#111111]">
                              <CalendarDays
                                size={18}
                                className="mt-[2px] text-[#9ac79b]"
                              />
                              <span>{dateRange}</span>
                            </div>
                          )}

                          {timeRange && (
                            <div className="flex items-start gap-3 text-[15px] text-[#111111]">
                              <Clock3
                                size={18}
                                className="mt-[2px] text-[#9ac79b]"
                              />
                              <span>{timeRange}</span>
                            </div>
                          )}

                          {eventLocation && (
                            <div className="flex items-start gap-3 text-[15px] text-[#111111]">
                              <MapPin
                                size={18}
                                className="mt-[2px] text-[#9ac79b]"
                              />
                              <span>{eventLocation}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-8">
                          <div className="flex h-[54px] items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
                            <span className="text-[16px] font-semibold uppercase tracking-[0.03em] text-black">
                              LEARN MORE
                            </span>
                            <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#9ac79b] text-[#9ac79b] transition group-hover:bg-[#9ac79b] group-hover:text-white">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    const isActive = currentPage === page;

                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handlePageChange(page)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${
                          isActive
                            ? "border-[#8fb08a] bg-[#8fb08a] text-white"
                            : "border-[#d7d2c8] bg-white text-[#5f6a60] hover:border-[#8fb08a]"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}