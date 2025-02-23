import sudotecLogo from '@/assets/sudotecLogo.svg'
import { Edit, Edit2, Home, Lock, Plus, Settings, Users } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { FullUser } from '@/hooks/use-get-full-user'
import { Class } from '@/models/class-schema'
import { Course } from '@/models/course-schema'
import { Link } from '@tanstack/react-router'
import { Case, Switch, When } from 'react-if'
import { Collapsible, CollapsibleContent } from '../ui/collapsible'
import { NavUser } from './nav-user'

const menuItemsStudentPortal = [
  { title: 'Início', icon: Home, to: '/' },
]

const menuItemsAdminPortal = [
  { title: 'Início', icon: Home, to: '/' },
  { title: 'Usuários', icon: Users, to: '/users' },
  { title: 'Solicitações', icon: Lock, to: '/password-change' },
]

const menuItemsTeacherClassroom = [
  { title: 'Início', icon: Home, to: '/' },
]

interface CoursesWithClasses extends Course {
  classes: Class[]
}

interface Props {
  fullUser: FullUser
  logout: () => void
  coursesWithClasses: CoursesWithClasses[]
}

export function AppSidebar({ fullUser, goTo, logout, coursesWithClasses }: Props) {
  const { role } = fullUser

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
            <Link to="/courses/management">
              <SidebarGroupAction title="Gerenciar cursos">
                <Edit /> <span className="sr-only">Gerenciar cursos</span>
              </SidebarGroupAction>
            </Link>
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
      <SidebarFooter>
        <NavUser logout={logout} fullUser={fullUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
