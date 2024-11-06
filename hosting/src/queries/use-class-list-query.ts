import { collection, getDocs } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { firestore } from "@/services/firebase";
import { classes, classListSchema } from "@/models/class-list-schema";

export function useListClassQuery() {
  return useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const classesRef = collection(firestore, 'classes').withConverter({
        toFirestore: (classes: classes) => classes,
        fromFirestore: (snapshot) => classListSchema.parse(snapshot.data()),
      });
      const docSnap = await getDocs(classesRef);
      return docSnap.docs.map((doc) => doc.data());
    }
  });
}
