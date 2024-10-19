import ListStudents from '@/components/custom/list-students'
import { StudentPoster } from '@/components/custom/student-poster'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/call-screen')({
    component: callScreen,
  })

  export function callScreen (){
    return(
        <>
        <div className='flex flex-1'>
            <div className='flex-1'>
                <ListStudents
                    name=''
                    variant='present'
                    picture=''
                />
                <ListStudents
                    name=''
                    variant='lack'
                    picture=''
                />
                <ListStudents
                    name=''
                    variant='present'
                    picture=''
                />
                <ListStudents
                    name=''
                    variant='lack'
                    picture=''
                />
                <ListStudents
                    name=''
                    variant='lack'
                    picture=''
                />
                <ListStudents
                    name=''
                    variant='lack'
                    picture=''
                />
                <ListStudents
                    name=''
                    variant='lack'
                    picture=''
                />
                <ListStudents
                    name=''
                    variant='present'
                    picture=''
                />
                <ListStudents
                    name=''
                    variant='present'
                    picture=''
                />
                <ListStudents
                    name=''
                    variant='lack'
                    picture=''
                />
            </div>
            <div className='px-28 pt-11 pb-16 w-full'>
                <StudentPoster
                    imgStudent=''
                    nameStudent='Dumbo'
                />
            </div>
        </div>
    </>
    
    )



  }