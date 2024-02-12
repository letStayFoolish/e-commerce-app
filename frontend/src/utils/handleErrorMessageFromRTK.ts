import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/react";

interface ICustomError {
  //   name?: string;
  message: string;
  //   stack?: string;
  //   code?: string;
}

export function handleErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string | null {
  if (!error) {
    return null;
  }
  let errorMessage: string | null = null;

  if ("data" in error && (error.data as ICustomError)?.message) {
    errorMessage = (error.data as ICustomError).message;
  } else if ("message" in error && typeof error.message === "string") {
    errorMessage = error.message;
  } else {
    errorMessage = "Error occurred";
  }

  return errorMessage;
}
