import { firestore } from '@/services/firebase'
import { collection, doc } from 'firebase/firestore'

export const passwordGenerator = () => doc(collection(firestore, "password-dummy-generation")).id