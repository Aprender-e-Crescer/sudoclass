import { info } from 'firebase-functions/logger'
import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { loginDataSchema } from './schemas/login'
import { auth, firestore, storage } from './services/firebase'
import { z } from 'zod';
import { passwordGenerator } from './utils/passwordGenerator';
import { cleanCpf } from './utils/cleanCPF';
import { encrypt } from './utils/encrypt';
import { adminUserSchema, createAdminSchema, createResponsibleSchema, createStudentSchema, createTeacherSchema, updateAdminSchema, updateResponsibleSchema, updateStudentSchema, updateTeacherSchema, userSchema } from './schemas/users';
import { cpfSchema } from './utils/schema';
import { credentialSchema } from './schemas/credential';

export const loginWithCPF = onCall(async (request) => {
  try {
      const { cpf, password } = loginDataSchema.parse(request.data)

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
      
      transaction.set(firestore.collection("credentials").doc(userRef.path), { password });
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

      transaction.set(firestore.collection("credentials").doc(userRef.path), { password })
      transaction.set(profileRef, { displayName: fullName, photoURL: null })
      transaction.set(roleRef, { classes: classes.map((classPath) => firestore.doc(classPath)) })
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
      roleRef,
      classes,
    } = updateStudentSchema.parse(request.data)

    firestore.runTransaction(async (transaction) => {
      const userRef = firestore.collection("users").doc(id)

      const userSnapshot = await transaction.get(userRef)
      const userDontExists = !userSnapshot.exists

      if (userDontExists) throw new Error("User not found")

      transaction.update(userRef, {
          fullName,
          requireNewPassword: true,
          contact,
          address,
          birth,
          generalRegistration,                
      })
      
      transaction.set(roleRef, { classes: classes.map((classPath) => firestore.doc(classPath)) })
    })
  } catch (error) {
    info('Error updating student:', error);
    throw new HttpsError("internal", "Failed to update student");
  }
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
  
      transaction.set(firestore.collection("credentials").doc(userRef.path), { password })
      transaction.set(profileRef, { displayName: fullName, photoURL: null })
      transaction.set(roleRef, { subjects: subjects.map((subjectPath) => firestore.doc(subjectPath)) })
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
      roleRef,
    } = updateTeacherSchema.parse(request.data)

    firestore.runTransaction(async (transaction) => {
      const userRef = firestore.collection("users").doc(id)
  
      const userSnapshot = await transaction.get(userRef)
      const userDontExists = !userSnapshot.exists
  
      if (userDontExists) throw new Error("User not found")
  
      transaction.update(userRef, {
          fullName,
          requireNewPassword: true,
          contact,
          address,
          birth,
          generalRegistration,                
      })
      
      transaction.set(roleRef, { subjects: subjects.map((subjectPath) => firestore.doc(subjectPath)) })
    })
  } catch (error) {
    info('Error updating teacher:', error);
    throw new HttpsError("internal", "Failed to update teacher");
  }
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
  
      transaction.set(firestore.doc(userRef.path).collection("credentials").doc(), { password })
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

      transaction.update(firestore.doc(roleRefPath), {
          responsibleFor: responsibleFor.map(studentId => firestore.collection('users').doc(studentId))
      })
  })
  } catch (error) {
    info('Error updating responsible:', error);
    throw new HttpsError("internal", "Failed to update responsible");
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
