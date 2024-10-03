import { firestore } from '@/services/firebase';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

import { collection, getDocs } from 'firebase/firestore';


export const Route = createFileRoute('/teachers-listing')({
  component: TeachersListing,
})


function TeachersListing() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["getTeachers"],
        queryFn: () => {
          const teachersRef = collection(firestore, "teachers");
    
          return getDocs(teachersRef).then(({ docs }) =>
            docs.map((doc) => doc.data())
          );
        },
      });

      console.log(error)
    
      if (isLoading) return <h1>Carregando...</h1>;
    
      return (
        <div>
          {data?.map(({ fullName  }) => (
            <div>
              <p>
                O nome do professor e {fullName} 
                o endereco e {}
              </p>
            </div>
          ))}
        </div>
      );
    }
    
   

    
