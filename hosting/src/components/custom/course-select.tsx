import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MonitorPlay } from 'lucide-react'

export default function CourseSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MonitorPlay className="h-4 w-4" />
          <SelectValue placeholder="Selecione o curso" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="intermediate">
            <div className="flex items-center gap-2">
              <MonitorPlay className="h-4 w-4" />
              <span>Inf. intermediaria e avançada</span>
            </div>
          </SelectItem>
          <SelectItem value="basic">
            <div className="flex items-center gap-2">
              <MonitorPlay className="h-4 w-4" />
              <span>Inf. básica</span>
            </div>
          </SelectItem>
          <SelectItem value="robotics">
            <div className="flex items-center gap-2">
              <MonitorPlay className="h-4 w-4" />
              <span>Robotica</span>
            </div>
          </SelectItem>
          <SelectItem value="learn">
            <div className="flex items-center gap-2">
              <MonitorPlay className="h-4 w-4" />
              <span>Aprender e crescer</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
