import {Request} from "express";
import {DecodedIdToken} from "firebase-admin/auth";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RequestWithUser extends Request {
  user: DecodedIdToken;
}
