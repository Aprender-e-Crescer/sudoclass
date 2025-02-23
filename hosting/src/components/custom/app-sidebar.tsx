import { Home, Settings, Users } from "lucide-react"
import sudotecLogo from '@/assets/sudotecLogo.svg'

import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Case, Switch, When } from "react-if"
import { role } from "@/types/user"
import { Link } from "@tanstack/react-router"
import { Collapsible, CollapsibleContent } from "../ui/collapsible"
import { Course } from "@/models/course-schema"
import { Class } from "@/models/class-schema"

const menuItemsStudentPortal = [
    { title: 'Início', icon: Home, to: '/' },
    { title: 'Matriz Escolar', icon: Home, to: '/school-matrices' },
    { title: 'Documentos', icon: Home, to: '/documents' },
    { title: 'Configurações', icon: Settings, to: '/profile-changes' },
]

const menuItemsAdminPortal = [
    { title: 'Início', icon: Home, to: '/' },
    { title: 'Usuários', icon: Users, to: '/users' },
    { title: 'Matriz Escolar', icon: Home, to: '/school-matrices' },
    { title: 'Documentos', icon: Home, to: '/documents' },
    { title: 'Criações', icon: Home, to: '/creations' },
    { title: 'Configurações', icon: Settings, to: '/profile-changes' },
]

const menuItemsTeacherClassroom = [
    { title: 'Início', icon: Home, to: '/' },
    { title: 'Configurações', icon: Settings, to: '/profile-changes' },
]

interface CoursesWithClasses extends Course {
    classes: Class[]
} 

interface Props {
  role: role
  coursesWithClasses: CoursesWithClasses[]
}

export function AppSidebar({ role, coursesWithClasses }: Props) {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="w-full flex items-center justify-center">
            <img src={sudotecLogo} alt="sudotecLogo" className="h-24 w-52" />
        </div>
        <hr />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
                <Switch>
                    <Case condition={role === 'admin'}>
                        {menuItemsAdminPortal.map(({ icon: Icon, title, to }) => (
                            <SidebarMenuItem key={title}>
                                <SidebarMenuButton asChild>
                                    <Link to={to}>
                                        <Icon />
                                        <span>{title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </Case>
                    <Case condition={role === 'teacher'}>
                        {menuItemsTeacherClassroom.map(({ icon: Icon, title, to }) => (
                            <SidebarMenuItem key={title}>
                                <SidebarMenuButton asChild>
                                    <Link to={to}>
                                        <Icon />
                                        <span>{title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </Case>
                    <Case condition={role === 'responsible'}>
                        {menuItemsStudentPortal.map(({ icon: Icon, title, to }) => (
                            <SidebarMenuItem key={title}>
                                <SidebarMenuButton asChild>
                                    <Link to={to}>
                                        <Icon />
                                        <span>{title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </Case>
                    <Case condition={role === 'student'}>
                        {menuItemsStudentPortal.map(({ icon: Icon, title, to }) => (
                            <SidebarMenuItem key={title}>
                                <SidebarMenuButton asChild>
                                    <Link to={to}>
                                        <Icon />
                                        <span>{title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </Case>
                </Switch>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <hr />
        <SidebarGroup>
            <SidebarGroupLabel>Cursos</SidebarGroupLabel>
            <Collapsible defaultOpen className="group/collapsible">
                {coursesWithClasses.map(({ color, id, name, classes }) => (
                    <SidebarMenuItem key={id} className="list-none">
                        <Switch>
                            <Case condition={classes.length > 1}>
                                <SidebarMenuButton className="flex items-center" asChild>
                                    <Link to="/courses/$idCourse/classes" params={{ idCourse: id }}>
                                        <span className="rounded h-2 w-2" style={{ backgroundColor: color }} />
                                        {name}
                                    </Link>
                                </SidebarMenuButton>
                            </Case>
                            <Case condition={classes.length === 1}>
                                {() => 
                                    <SidebarMenuButton className="flex items-center" asChild>
                                        <Link to="/courses/$idCourse/classes/$idClass/subjects" params={{ idCourse: id, idClass: classes[0].id }}>
                                            <span className="rounded h-2 w-2" style={{ backgroundColor: color }} />
                                            {name}
                                        </Link>
                                    </SidebarMenuButton>
                                }
                            </Case>
                            <Case condition={classes.length === 0}>
                                {() => 
                                    <SidebarMenuButton className="flex items-center" asChild>
                                        <Link to="/courses/$idCourse" params={{ idCourse: id }}>
                                            <span className="rounded h-2 w-2" style={{ backgroundColor: color }} />
                                            {name}
                                        </Link>
                                    </SidebarMenuButton>
                                }
                            </Case>
                        </Switch>
                        <When condition={classes.length > 1}>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {classes.map(({ id, idCourse, name, color }) => (
                                        <SidebarMenuSubItem key={id}>
                                            <SidebarMenuButton asChild>
                                                <Link to="/courses/$idCourse/classes/$idClass/subjects" params={{ idCourse: idCourse, idClass: id }}>
                                                    <span className="rounded h-2 w-2 block" style={{ backgroundColor: color }} />
                                                    {name}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </When>
                    </SidebarMenuItem>
                ))}
            </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
