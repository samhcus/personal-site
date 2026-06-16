"use client"

import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
}: {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}) {
  return (
    <SliderPrimitive.Root
      value={value}
      onValueChange={(v) => onValueChange(v as number)}
      min={min}
      max={max}
      step={step}
      className={cn(
        "relative flex w-full touch-none items-center select-none py-1",
        className
      )}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-zinc-700">
        <SliderPrimitive.Indicator className="absolute h-full rounded-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label="Slider value"
        className="block size-3.5 rounded-full border-2 border-primary bg-white shadow transition-shadow hover:shadow-[0_0_0_4px_rgba(70,85,214,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      />
    </SliderPrimitive.Root>
  )
}

export { Slider }
