

export type failedDbResponse = {
  success: false,
  error: unknown
}


export type successfullDbResponse<T> = {
  success: true,
  data: T
}

export type dbResponse<T> = successfullDbResponse<T> | failedDbResponse