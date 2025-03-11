import { info } from 'firebase-functions/logger';
import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { loginDataSchema } from './schemas/login';
import { createAdminSchema, createResponsibleSchema, createStudentSchema, createTeacherSchema, updateAdminSchema, updateResponsibleSchema, updateStudentSchema, updateTeacherSchema } from './schemas/users';
import { auth, firestore } from './services/firebase';
import { cleanCpf } from './utils/cleanCPF';
import { encrypt } from './utils/encrypt';
import { getRoleRefByPath } from './utils/getReferenceByPath';
import { passwordGenerator } from './utils/passwordGenerator';
import { docRefSchema } from './utils/schema';
import { requestChangePasswordSchema } from './schemas/credential';
import { DocumentReference, FieldValue } from 'firebase-admin/firestore';

export const loginWithCPF = onCall(async (request) => {
  try {
      const { cpf, password: rawPassword } = loginDataSchema.parse(request.data)

      const password = encrypt(rawPassword)

      const studentsDocumentSnapshot = await firestore
          .collection("users")
          .doc(cpf)
          .collection("credentials")
          .where("password", "==", password)
          .limit(1)
          .get()

      if (studentsDocumentSnapshot.empty) throw new Error("Invalid CPF or inexistent user")

      return auth.createCustomToken(cpf)
  } catch (error) {
      info(error, { structuredData: true });

      return new HttpsError("unauthenticated", "Invalid CPF or inexistent user")
  }
});

export const createAdmin = onCall(async (request) => {
  try {
    const { cpf, fullName } = createAdminSchema.parse(request.data);
    
    const cpfCleaned = cleanCpf(cpf);

    const rawPassword = passwordGenerator();
    const password = encrypt(rawPassword);
    
    return await firestore.runTransaction(async (transaction) => {
      const userRef = firestore.collection("users").doc(cpfCleaned);
      const userSnapshot = await transaction.get(userRef);
      
      if (userSnapshot.exists) {
        throw new HttpsError("already-exists", "Esse usuário já existe");
      }
      
      const profileRef = firestore.collection("profiles").doc();
      const roleRef = firestore.collection("admins").doc();
      
      transaction.set(userRef, {
        profileRef,
        roleRef,
        fullName,
        requireNewPassword: true,
        contact: {
          email: null,
          telephone: null,
        },
        address: {
          state: null,
          city: null,
          street: null,
          neighborhood: null,
          number: null,
        },
        birth: {
          date: null,
          state: null,
          city: null,
        },
        generalRegistration: {
          number: null,
          dispatch: {
            date: null,
            state: null,
          },
        },
      });
      
      transaction.set(userRef.collection("credentials").doc(), { password });
      transaction.set(profileRef, { displayName: fullName, photoURL: null });
    });
  } catch (error) {
    info('Error creating admin user:', error);
    throw new HttpsError("internal", "Failed to create admin user");
  }
})

export const updateAdmin = onCall(async (request) => {
  try {
    const { id, fullName } = updateAdminSchema.parse(request.data);
        
    return await firestore.runTransaction(async (transaction) => {
      const userRef = firestore.collection("users").doc(id);
      const userSnapshot = await transaction.get(userRef);
      
      if (!userSnapshot.exists) {
        throw new HttpsError("not-found", "Usuário não encontrado");
      }
            
      transaction.update(userRef, {
        fullName,
      });
    });
  } catch (error) {
    info('Error updating admin user:', error);
    throw new HttpsError("internal", "Failed to update admin user");
  }
})

export const createStudent = onCall(async (request) => {
  try {
    const {
      cpf,
      fullName,
      address,
      birth,
      contact,
      generalRegistration,
      classes,
    } = createStudentSchema.parse(request.data)

    return firestore.runTransaction(async (transaction) => {
      const cpfCleaned = cleanCpf(cpf)

      const userRef = firestore.collection("users").doc(cpfCleaned)

      const userAlreadyExist = await transaction.get(userRef).then((doc) => doc.exists)

      if (userAlreadyExist) throw new Error("Esse usuário já existe")

      const rawPassword = passwordGenerator();
      const password = encrypt(rawPassword);

      const profileRef = firestore.collection("profiles").doc()
      const roleRef = firestore.collection("students").doc()
          
      transaction.set(userRef, {
          profileRef,
          roleRef,
          fullName,
          requireNewPassword: true,
          contact,
          address,
          birth,
          generalRegistration,                
      })

      const classesRefs = classes.map((classPath) => firestore.doc(classPath));

      transaction.set(userRef.collection("credentials").doc(), { password });
      transaction.set(profileRef, { displayName: fullName, photoURL: null })
      transaction.set(roleRef, { classes: classesRefs })

      classesRefs.forEach((classRef) => transaction.update(classRef, { studentsProfile: FieldValue.arrayUnion(profileRef) }))
    })
  } catch (error) {
    info('Error creating student:', error);
    throw new HttpsError("internal", "Failed to create student");
  }
});

export const updateStudent = onCall(async (request) => {
  try {
    const {
      id,
      fullName,
      address,
      birth,
      contact,
      generalRegistration,
      roleRefPath,
      classes,
    } = updateStudentSchema.parse(request.data)

    const roleRef = getRoleRefByPath(roleRefPath)

    firestore.runTransaction(async (transaction) => {
      const userRef = firestore.collection("users").doc(id)
      const userSnapshot = await transaction.get(userRef)
      const userDontExists = !userSnapshot.exists

      if (userDontExists) throw new Error("User not found")

      transaction.update(userRef, {
          fullName,
          contact,
          address,
          birth,
          generalRegistration,                
      })
      
      const classesRefs = classes.map((classPath) => firestore.doc(classPath));

      transaction.set(roleRef, { classes: classesRefs })
    })
  } catch (error) {
    info('Error updating student:', error);
    throw new HttpsError("internal", "Failed to update student");
  }
});

export const onUpdateStudent = onDocumentUpdated('students/{studentId}', async (handler) => {
  const studentProfile = handler.data?.before.ref
  const { classes: oldClasses } = handler.data?.before.data() ?? { classes: [] }
  const { classes: newClasses } = handler.data?.after.data() ?? { classes: [] }

  return firestore.runTransaction(async (transaction) => {
    oldClasses.forEach((classRef: DocumentReference) => transaction.update(classRef, { studentsProfile: FieldValue.arrayRemove(studentProfile) }))
    newClasses.forEach((classRef: DocumentReference) => transaction.update(classRef, { studentsProfile: FieldValue.arrayUnion(studentProfile) }))
  });
});

export const createTeacher = onCall(async (request) => {
  try {
    const {
      cpf,
      fullName,
      address,
      birth,
      contact,
      generalRegistration,
      subjects,
    } = createTeacherSchema.parse(request.data)

    firestore.runTransaction(async (transaction) => { 
      const cpfCleaned = cleanCpf(cpf)

      const userRef = firestore.collection("users").doc(cpfCleaned)
  
      const userAlreadyExist = await transaction.get(userRef).then((doc) => doc.exists)
  
      if (userAlreadyExist) throw new Error("Esse usuário já existe")
  
        const rawPassword = passwordGenerator();
        const password = encrypt(rawPassword);
  
      const profileRef = firestore.collection("profiles").doc()
      const roleRef = firestore.collection("teachers").doc()
          
      transaction.set(userRef, {
          profileRef,
          roleRef,
          fullName,
          requireNewPassword: true,
          contact,
          address,
          birth,
          generalRegistration,                
      })

      const subjectsRefs = subjects.map((subjectPath) => firestore.doc(subjectPath));
  
      transaction.set(userRef.collection("credentials").doc(), { password });
      transaction.set(profileRef, { displayName: fullName, photoURL: null })
      transaction.set(roleRef, { subjects: subjectsRefs })

      subjectsRefs.forEach((subjectRef) => transaction.update(subjectRef, { teachersProfile: FieldValue.arrayUnion(profileRef) }))
    })
  } catch (error) {
    info('Error creating teacher:', error);
    throw new HttpsError("internal", "Failed to create teacher");
  }
});

export const updateTeacher = onCall(async (request) => {
  try {
    const {
      id,
      fullName,
      address,
      birth,
      contact,
      generalRegistration,
      subjects,
      roleRefPath,
    } = updateTeacherSchema.parse(request.data)
    
    const roleRef = getRoleRefByPath(roleRefPath)

    firestore.runTransaction(async (transaction) => {
      const userRef = firestore.collection("users").doc(id)
  
      const userSnapshot = await transaction.get(userRef)
      const userDontExists = !userSnapshot.exists
  
      if (userDontExists) throw new Error("User not found")
  
      transaction.update(userRef, {
          fullName,
          contact,
          address,
          birth,
          generalRegistration,                
      })

      const subjectsRefs = subjects.map((subjectPath) => firestore.doc(subjectPath))
      
      transaction.set(roleRef, { subjects: subjectsRefs })
    })
  } catch (error) {
    info('Error updating teacher:', error);
    throw new HttpsError("internal", "Failed to update teacher");
  }
});

export const onUpdateTeacher = onDocumentUpdated('teachers/{teacherId}', async (handler) => {
  const teacherProfile = handler.data?.before.ref
  const { subjects: oldSubjects } = handler.data?.before.data() ?? { subjects: [] }
  const { subjects: newSubjects } = handler.data?.after.data() ?? { subjects: [] }

  return firestore.runTransaction(async (transaction) => {
    oldSubjects.forEach((subjectRef: DocumentReference) => transaction.update(subjectRef, { teachersProfile: FieldValue.arrayRemove(teacherProfile) }))
    newSubjects.forEach((subjectRef: DocumentReference) => transaction.update(subjectRef, { teachersProfile: FieldValue.arrayUnion(teacherProfile) }))
  });
});

export const createResponsible = onCall(async (request) => {
  try {
    const {
      cpf,
      fullName,
      address,
      birth,
      contact,
      generalRegistration,
      responsibleFor,
    } = createResponsibleSchema.parse(request.data)

    firestore.runTransaction(async (transaction) => { 
      const cpfCleaned = cleanCpf(cpf)

      const userRef = firestore.collection("users").doc(cpfCleaned)
  
      const userAlreadyExist = await transaction.get(userRef).then((doc) => doc.exists)
  
      if (userAlreadyExist) throw new Error("Esse usuário já existe")
  
      const password = passwordGenerator()
  
      const profileRef = firestore.collection("profiles").doc()
      const roleRef = firestore.collection("responsibles").doc()
          
      transaction.set(userRef, {
          profileRef,
          roleRef,
          fullName,
          requireNewPassword: true,
          contact,
          address,
          birth,
          generalRegistration,                
      })
  
      transaction.set(userRef.collection("credentials").doc(), { password });
      transaction.set(profileRef, { displayName: fullName, photoURL: null })
      transaction.set(roleRef, {
          responsibleFor: responsibleFor.map(studentId => firestore.collection('users').doc(studentId))
      })
    });
  } catch (error) {
    info('Error creating responsible:', error);
    throw new HttpsError("internal", "Failed to create responsible");
  }
});

export const updateResponsible = onCall(async (request) => {
  try {
    const {
      id,
      fullName,
      address,
      birth,
      contact,
      generalRegistration,
      responsibleFor,
      roleRefPath,
    } = updateResponsibleSchema.parse(request.data)
    
    const roleRef = getRoleRefByPath(roleRefPath)

    firestore.runTransaction(async (transaction) => {
      const userRef = firestore.collection("users").doc(id)
      const userDoc = await transaction.get(userRef)
      
      if (!userDoc.exists) throw new Error("Usuário não encontrado")
     
      transaction.update(userRef, {
          fullName,
          contact,
          address,
          birth,
          generalRegistration,
      })

      transaction.update(roleRef, {
          responsibleFor: responsibleFor.map(studentId => firestore.collection('users').doc(studentId))
      })
  })
  } catch (error) {
    info('Error updating responsible:', error);
    throw new HttpsError("internal", "Failed to update responsible");
  }
});

export const requestChangePassword = onCall(async (request) => {
  const { cpf, password } = requestChangePasswordSchema.parse(request.data)

  try {
    const userDocumentSnapshot = await firestore
      .collection("users")
      .doc(cpf)
      .get()

    const profileRef = docRefSchema.parse(userDocumentSnapshot.data()?.profileRef)
    const passwordRequestRef = firestore.collection('requestsChangePassword')
    const passwordRequestId = (await passwordRequestRef.add({ profileRef: profileRef, requestStatus: 'pending' }))
      .id

    const credentialCollectionRef = firestore.collection('requestsChangePassword').doc(passwordRequestId).collection('credentials')
    const credentialId = (await credentialCollectionRef.add({ password })).id

    return { id: credentialId }
  } catch (error) {
    info('Error requesting change password:', error);
    throw new HttpsError("internal", "Failed to request change password");
  }
});

export const updateCredentials = onDocumentUpdated('requestsChangePassword/{requestId}', async (handler) => {
  try {
    z.object({
      profileRef: docRefSchema,
      requestStatus: z.enum(['pending']),
    }).parse(handler.data?.before.data())

    const { profileRef, requestStatus } = z.object({
      profileRef: docRefSchema,
      requestStatus: z.enum(['accepted', 'recused']),
    }).parse(handler.data?.after.data())

    if (requestStatus === 'recused') return firestore.recursiveDelete(handler.data!.before.ref);
    
    const { docs: [credential] } = await handler.data!.before.ref.collection('credentials').limit(1).get()

    const password = encrypt(credential.data().password)

    const userSnapshot = await firestore.collection('users').where('profileRef', '==', profileRef).get()

    if (userSnapshot.empty) {
      throw new Error('Usuário não encontrado.')
    }

    const userDoc = userSnapshot.docs[0]
    const userId = userDoc.id

    const credentialsCollection = firestore.collection('users').doc(userId).collection('credentials')
    const credentialsSnapshot = await credentialsCollection.get()

    if (credentialsSnapshot.empty) {
      throw new Error('Nenhuma credencial encontrada para este usuário.')
    }

    const credentialDoc = credentialsSnapshot.docs[0]
    const credentialId = credentialDoc.id

    await credentialsCollection.doc(credentialId).update({ password })
    
    return firestore.recursiveDelete(handler.data!.before.ref);
  } catch (error) {
    info('Error updating credentials:', error);
    throw new HttpsError("internal", "Failed to update credentials");
  }
});

// TODO: Release on production when the forms feature is ready
// export const getTitleByUrl = onCall(async (request) => {
//   const { url } = getTitleDataSchema.parse(request.data)

//   const form = await fetch(url)
//   const text = await form.text()
//   const title = text.match(/<title>(.*?)<\/title>/)?.[1] ?? null

//   return title
// })
