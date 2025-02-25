import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  addDays,
  addMinutes,
  differenceInCalendarDays,
  differenceInMinutes,
  format as formatDate,
  Locale,
  startOfDay,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";

const totalMinutes = 1440;
const gridIncrement = 15;
const cellMargin = 0;

function formatHour(h: number) {
  if (h === 0) return "";
  let hour = h % 12;
  if (hour === 0) hour = 12;
  const period = h < 12 ? "AM" : "PM";
  return `${hour}:00 ${period}`;
}

export interface ReturnedEventParsed {
  id: number;
  begin: Date;
  end: Date;
}

interface CalendarEvent {
  id: number;
  absoluteBegin: Date;
  duration: number;
}

interface CalendarProps {
  onChange?: (events: ReturnedEventParsed[]) => void;
  defaultValue?: ReturnedEventParsed[];
  value?: ReturnedEventParsed[];
  startDate?: Date;
  timezone?: string;
  locale?: Locale;
  onEventClick?: (event: ReturnedEventParsed) => void;
  onEventCreate?: (event: ReturnedEventParsed) => void;
}

export function Calendar({
  onChange,
  defaultValue,
  value,
  startDate,
  timezone,
  locale,
  onEventClick,
  onEventCreate,
}: CalendarProps) {
  const controlled = value !== undefined;
  const baseDate = startOfDay(startDate || new Date());
  const daysContainerRef = useRef<HTMLDivElement>(null);
  const [dayWidth, setDayWidth] = useState(0);

  const [internalEvents, setInternalEvents] = useState<CalendarEvent[]>(() => {
    if (defaultValue && defaultValue.length > 0) {
      return defaultValue.map((evt, index) => ({
        id: index + 1,
        absoluteBegin: evt.begin,
        duration: differenceInMinutes(evt.end, evt.begin),
      }));
    }
    return [];
  });

  useEffect(() => {
    if (value) {
      const newEvents = value.map((evt, index) => ({
        id: index + 1,
        absoluteBegin: evt.begin,
        duration: differenceInMinutes(evt.end, evt.begin),
      }));
      setInternalEvents(newEvents);
    }
  }, [value]);

  const currentEvents: CalendarEvent[] = controlled
    ? value!.map((evt, index) => ({
        id: index + 1,
        absoluteBegin: evt.begin,
        duration: differenceInMinutes(evt.end, evt.begin),
      }))
    : internalEvents;

  const mapEventToReturned = (ev: CalendarEvent) => {
    let begin = ev.absoluteBegin;
    let end = addMinutes(ev.absoluteBegin, ev.duration);
    if (timezone) {
      begin = toZonedTime(begin, timezone);
      end = toZonedTime(end, timezone);
    }
    return { id: ev.id, begin, end };
  };

  const updateEvents = useCallback(
    (updater: (prev: CalendarEvent[]) => CalendarEvent[]) => {
      const newEvents = updater(currentEvents);
      onChange?.(newEvents.map(mapEventToReturned));
      if (!controlled) {
        setInternalEvents(newEvents);
      }
    },
    [controlled, currentEvents, onChange]
  );

  useEffect(() => {
    if (!currentEvents) return;
    if (!controlled && onChange) {
      onChange(currentEvents.map(mapEventToReturned));
    }
  }, [controlled, currentEvents, onChange]);

  const eventsForWeek = currentEvents.filter((ev) => {
    const dayIndex = differenceInCalendarDays(ev.absoluteBegin, baseDate);
    return dayIndex >= 0 && dayIndex < 7;
  });

  const eventsWithStyle = eventsForWeek.map((ev) => {
    const dayIndex = differenceInCalendarDays(ev.absoluteBegin, baseDate);
    const dayStart = addDays(baseDate, dayIndex);
    const startTime = differenceInMinutes(ev.absoluteBegin, dayStart);
    return {
      ...ev,
      style: {
        position: "absolute" as const,
        top: startTime + cellMargin,
        left: dayIndex * dayWidth + cellMargin,
        width: dayWidth - cellMargin * 2,
        height: ev.duration - cellMargin * 2,
        backgroundColor: "#60a5fa",
        border: "1px solid #3b82f6",
        boxSizing: "border-box" as const,
      },
    };
  });

  const containerDaysDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerDaysDivRef.current) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setDayWidth(entry.borderBoxSize[0].inlineSize);
    });
    resizeObserver.observe(containerDaysDivRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const [dragState, setDragState] = useState<{
    eventId: number;
    type: "move" | "resize-top" | "resize-bottom" | null;
    startX: number;
    startY: number;
    originalEvent: CalendarEvent;
  } | null>(null);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragState) return;
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;
      updateEvents((prevEvents) =>
        prevEvents.map((ev) => {
          if (ev.id !== dragState.eventId) return ev;
          const newEvent = { ...ev };
          if (dragState.type === "move") {
            let newAbsolute = addMinutes(dragState.originalEvent.absoluteBegin, deltaY);
            const dayOffset = Math.round(deltaX / dayWidth);
            newAbsolute = addDays(newAbsolute, dayOffset);
            newEvent.absoluteBegin = newAbsolute;
          } else if (dragState.type === "resize-top") {
            const newAbsolute = addMinutes(dragState.originalEvent.absoluteBegin, deltaY);
            const newDuration = dragState.originalEvent.duration - deltaY;
            if (newDuration >= gridIncrement) {
              newEvent.absoluteBegin = newAbsolute;
              newEvent.duration = newDuration;
            }
          } else if (dragState.type === "resize-bottom") {
            const newDuration = dragState.originalEvent.duration + deltaY;
            if (newDuration >= gridIncrement) {
              newEvent.duration = newDuration;
            }
          }
          return newEvent;
        })
      );
    }

    function onMouseUp() {
      if (!dragState) return;
      updateEvents((prevEvents) =>
        prevEvents.map((ev) => {
          if (ev.id !== dragState.eventId) return ev;
          const dayIndex = differenceInCalendarDays(ev.absoluteBegin, baseDate);
          const dayStart = addDays(baseDate, dayIndex);
          const relativeStart = differenceInMinutes(ev.absoluteBegin, dayStart);
          let snappedStart =
            Math.round((relativeStart - cellMargin) / gridIncrement) * gridIncrement + cellMargin;
          let snappedDuration = Math.max(
            gridIncrement,
            Math.round(ev.duration / gridIncrement) * gridIncrement
          );
          if (snappedStart + snappedDuration > totalMinutes) {
            snappedDuration = totalMinutes - snappedStart;
          }
          return {
            ...ev,
            absoluteBegin: addMinutes(dayStart, snappedStart),
            duration: snappedDuration,
          };
        })
      );
      setDragState(null);
    }

    if (dragState) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragState, dayWidth, updateEvents, baseDate]);

  function onMouseDown(e: React.MouseEvent, ev: CalendarEvent) {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    let type: "move" | "resize-top" | "resize-bottom" | null = "move";
    if (target.classList.contains("resize-handle")) {
      if (target.classList.contains("top")) {
        type = "resize-top";
      } else if (target.classList.contains("bottom")) {
        type = "resize-bottom";
      }
    }
    setDragState({
      eventId: ev.id,
      type,
      startX: e.clientX,
      startY: e.clientY,
      originalEvent: ev,
    });
  }

  function handleDayClick(e: React.MouseEvent, dayIndex: number) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cursorHeight = 40;
    const offsetY = e.clientY - rect.top - cursorHeight / 2;
    const newStartTime = Math.round(offsetY / gridIncrement) * gridIncrement;
    const dayStart = addDays(baseDate, dayIndex);
    const newAbsoluteBegin = addMinutes(dayStart, newStartTime);
    const newId = currentEvents.length > 0 ? Math.max(...currentEvents.map((ev) => ev.id)) + 1 : 1;
    const newEvent: CalendarEvent = {
      id: newId,
      absoluteBegin: newAbsoluteBegin,
      duration: 60,
    };
    updateEvents((prev) => [...prev, newEvent]);
    onEventCreate?.(mapEventToReturned(newEvent));
  }

  const headerDates = Array.from({ length: 7 }, (_, index) => addDays(baseDate, index));

  return (
    <div className="w-full">
      <div className="days-header flex">
        <div className="dont-remove-placeholder-purpose" />
        {headerDates.map((date, index) => {
          const zonedDate = timezone ? toZonedTime(date, timezone) : date;
          return (
            <div key={index} ref={containerDaysDivRef} className="day-header text-center">
              <div className="day-name">{formatDate(zonedDate, "EEEE", { locale })}</div>
              <div className="day-number">{formatDate(zonedDate, "dd")}</div>
            </div>
          );
        })}
      </div>
      <div className="calendar-wrapper relative">
        <div className="calendar-container relative">
          <div className="hours" id="hours">
            {[...Array(24)].map((_, h) => (
              <div key={h} className="hour-label">
                {formatHour(h)}
              </div>
            ))}
          </div>
          <div id="days" ref={daysContainerRef} className="days">
            {Array(7)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="day-column"
                  onClick={(e) => handleDayClick(e, index)}
                ></div>
              ))}
            {eventsWithStyle.map((ev) => (
              <div
                key={ev.id}
                className="event"
                style={ev.style}
                onMouseDown={(e) => onMouseDown(e, ev)}
              >
                <div
                  className="resize-handle top"
                  style={{ height: 5, cursor: "ns-resize", background: "#3b82f6" }}
                ></div>
                <div
                  className="content p-1 mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick?.(mapEventToReturned(ev));
                  }}
                >
                  Aula
                </div>
                <div
                  className="resize-handle bottom"
                  style={{ height: 5, cursor: "ns-resize", background: "#3b82f6" }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}