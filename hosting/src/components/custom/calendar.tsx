import React, { useState, useRef, useEffect } from "react";

const totalMinutes = 1440;
const gridIncrement = 15;
const cellMargin = 2;

function formatHour(h: number) {
  let hour = h % 12;
  if (hour === 0) hour = 12;
  const period = h < 12 ? "AM" : "PM";
  return `${hour}:00 ${period}`;
}

interface CalendarEvent {
  id: number;
  dayIndex: number;
  startTime: number; // em minutos
  duration: number;  // em minutos
}

type DragType = "move" | "resize-top" | "resize-bottom" | null;

interface DragState {
  eventId: number;
  type: DragType;
  startX: number;
  startY: number;
  originalEvent: CalendarEvent;
}

export function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 1, dayIndex: 0, startTime: 8 * 60, duration: 75 },
  ]);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const daysContainerRef = useRef<HTMLDivElement>(null);
  const [dayWidth, setDayWidth] = useState(0);

  // Após montar, calcular a largura de cada dia
  useEffect(() => {
    if (daysContainerRef.current) {
      setDayWidth(daysContainerRef.current.clientWidth / 7);
    }
  }, []);

  // Gerencia os eventos de drag/resize
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragState) return;
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;
      setEvents((prevEvents) =>
        prevEvents.map((ev) => {
          if (ev.id !== dragState.eventId) return ev;
          let newEvent = { ...ev };
          if (dragState.type === "move") {
            let newStartTime = dragState.originalEvent.startTime + deltaY;
            newStartTime = Math.max(cellMargin, newStartTime);
            newStartTime = Math.min(totalMinutes - newEvent.duration, newStartTime);
            newEvent.startTime = newStartTime;
            let newDayIndex = dragState.originalEvent.dayIndex + Math.round(deltaX / dayWidth);
            newDayIndex = Math.max(0, Math.min(6, newDayIndex));
            newEvent.dayIndex = newDayIndex;
          } else if (dragState.type === "resize-top") {
            let newStart = dragState.originalEvent.startTime + deltaY;
            let newDuration = dragState.originalEvent.duration - deltaY;
            if (newDuration >= gridIncrement) {
              newEvent.startTime = Math.max(cellMargin, newStart);
              newEvent.duration = newDuration;
            }
          } else if (dragState.type === "resize-bottom") {
            let newDuration = dragState.originalEvent.duration + deltaY;
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
      // Aplicar o snap na posição e na duração do evento
      setEvents((prevEvents) =>
        prevEvents.map((ev) => {
          if (ev.id !== dragState.eventId) return ev;
          let snappedStart = Math.round((ev.startTime - cellMargin) / gridIncrement) * gridIncrement + cellMargin;
          let snappedDuration = Math.max(
            gridIncrement,
            Math.round(ev.duration / gridIncrement) * gridIncrement
          );
          if (snappedStart + snappedDuration > totalMinutes) {
            snappedDuration = totalMinutes - snappedStart;
          }
          return { ...ev, startTime: snappedStart, duration: snappedDuration };
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
  }, [dragState, dayWidth]);

  function onMouseDown(e: React.MouseEvent, ev: CalendarEvent) {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    let type: DragType = "move";
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

  function renderEvents() {
    return events.map((ev) => {
      const style = {
        position: "absolute" as const,
        top: ev.startTime + cellMargin,
        left: ev.dayIndex * dayWidth + cellMargin,
        width: dayWidth - cellMargin * 2,
        height: ev.duration - cellMargin * 2,
        backgroundColor: "#60a5fa",
        border: "1px solid #3b82f6",
        boxSizing: "border-box" as const,
      };
      return (
        <div
          key={ev.id}
          className="event"
          style={style}
          onMouseDown={(e) => onMouseDown(e, ev)}
        >
          <div
            className="resize-handle top"
            style={{ height: 5, cursor: "ns-resize", background: "#3b82f6" }}
          ></div>
          <div className="content p-1">Evento</div>
          <div
            className="resize-handle bottom"
            style={{ height: 5, cursor: "ns-resize", background: "#3b82f6" }}
          ></div>
        </div>
      );
    });
  }

  return (
    <div className="container mx-auto p-4">
      <div className="days-header flex">
        <div></div>
        {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map(
          (day, index) => (
            <div key={index} className="day-header text-center">
              <div className="day-name">{day}</div>
              <div className="day-number">{index + 1}</div>
            </div>
          )
        )}
      </div>
      <div className="calendar-wrapper relative">
        <div className="calendar-container relative"
        >
          <div
            className="hours"
            id="hours"
          >
            {[...Array(24)].map((_, h) => (
              <div
                key={h}
                className="hour-label"
              >
                {formatHour(h)}
              </div>
            ))}
          </div>
          <div
            id="days"
            ref={daysContainerRef}
            className="days"
          >
            {Array(7)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="day-column"
                ></div>
              ))}
            {renderEvents()}
          </div>
        </div>
      </div>
    </div>
  );
}