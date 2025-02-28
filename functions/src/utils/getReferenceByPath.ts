import { firestore } from "../services/firebase";

export const getRoleRefByPath = (refPath: string) => {
  const refPathArray = refPath.split('/');
  const roleCollection = refPathArray[0];
  const roleId = refPathArray[1];
  const roleRef = firestore.collection(roleCollection).doc(roleId);

  return roleRef;
}

export const getProfileRefByPath = (refPath: string) => {
  const refPathArray = refPath.split('/');
  const profileCollection = refPathArray[0];
  const profileId = refPathArray[1];
  const profileRef = firestore.collection(profileCollection).doc(profileId);

  return profileRef;
}