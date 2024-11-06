import {Label,PolarGrid,PolarRadiusAxis,RadialBar,RadialBarChart} from "recharts"
import {Card,CardContent,CardFooter} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

interface Props{
  chartData: {
    browser: string;
    visitors: number;
    fill: string;
}[]
chartConfig: {
  visitors: {
      label: string;
  };
  safari: {
      label: string;
      color: string;
  };
}
  descriptionChart: string;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
  polarRadius: number[];
  valueSize: string;
}

export function SectorChart({
  valueSize,
  innerRadius,
  outerRadius,
  polarRadius,
  endAngle,
  chartData,
  chartConfig,
  descriptionChart,
}: Props) {
  return (
    <Card className="flex flex-col !border-none">
      <CardContent className="flex-1 pb-0 !border-none">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] !border-none"
        >
          <RadialBarChart
            data={chartData}
            startAngle={270}
            endAngle={endAngle}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={polarRadius}
            />
            <RadialBar dataKey="visitors" background cornerRadius={20} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className={valueSize}
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm !border-none">
        <div className="flex items-center gap-2 font-medium leading-none">
          {descriptionChart}
        </div>
      </CardFooter>
    </Card>
  )
}