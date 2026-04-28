"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ResponsiveContainer } from "recharts"

export type ChartConfig = Record<
  string,
  {
    label?: string
    color?: string
  }
>

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

export function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

type ChartContainerProps = React.ComponentProps<"div"> & {
  config: ChartConfig
}

export function ChartContainer({ id, className, children, config, ...props }: ChartContainerProps) {
  const uniqueId = React.useId().replace(/:/g, "")
  const chartId = `chart-${id || uniqueId}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_svg]:outline-none [&_.recharts-layer]:outline-none",
          className
        )}
        {...props}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: Object.entries(config)
              .map(([key, value]) =>
                value.color ? `[data-chart=${chartId}] { --color-${key}: ${value.color}; }` : ""
              )
              .join("\n"),
          }}
        />
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}
