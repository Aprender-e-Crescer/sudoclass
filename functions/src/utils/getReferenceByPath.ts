import { firestore } from "../services/firebase";

export const getRoleRefByPath = (refPath: string) => {
  const refPathArray = refPath.split('/');
  const roleCollection = refPathArray[0];
  const roleId = refPathArray[1];
  const roleRef = firestore.collection(roleCollection).doc(roleId);

  return roleRef;
} 