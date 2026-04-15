import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  selected?: Date | [Date, Date];
  onSelect?: (date: Date | [Date, Date]) => void;
  month?: Date;
  onMonthChange?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, selected, onSelect, month, onMonthChange, disabled, ...props }, ref) => {
    const [currentMonth, setCurrentMonth] = React.useState(month || new Date());
    const [range, setRange] = React.useState<[Date, Date] | null>(
      Array.isArray(selected) ? selected : null
    );

    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handlePrevMonth = () => {
      const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
      setCurrentMonth(prev);
      onMonthChange?.(prev);
    };

    const handleNextMonth = () => {
      const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
      setCurrentMonth(next);
      onMonthChange?.(next);
    };

    const handleDayClick = (day: number) => {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      onSelect?.(date);
    };

    return (
      <div
        ref={ref}
        className={cn("p-3 bg-white rounded-md border", className)}
        {...props}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">
            {currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevMonth}
              className="h-7 w-7 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextMonth}
              className="h-7 w-7 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold mb-2">
          <div>Dom</div>
          <div>Seg</div>
          <div>Ter</div>
          <div>Qua</div>
          <div>Qui</div>
          <div>Sex</div>
          <div>Sab</div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {days.map((day) => {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isDisabled = disabled?.(date);
            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                disabled={isDisabled}
                className={cn(
                  "h-8 text-sm rounded hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed",
                  selected instanceof Date &&
                    selected.getDate() === day &&
                    selected.getMonth() === currentMonth.getMonth() &&
                    selected.getFullYear() === currentMonth.getFullYear()
                    ? "bg-primary text-white"
                    : ""
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = "Calendar";

export { Calendar };