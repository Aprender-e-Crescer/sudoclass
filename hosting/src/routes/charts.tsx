import { Button } from '@/components/ui/button'
import { firestore } from '@/services/firebase';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { collection, getDocs } from "firebase/firestore";


export const Route = createFileRoute('/charts')({
  component: Charts,
})

function Charts() {
    const { data, isLoading } = useQuery({
        queryKey: ["getCharts"],
        queryFn: () => {
          const usersRef = collection(firestore, "charts");
    
          return getDocs(usersRef).then(({ docs }) =>
            docs.map((doc) => doc.data())
          );
        },
      });

      console.log(data)
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button variant="destructive">Click me</Button>
    </div>
  )
}