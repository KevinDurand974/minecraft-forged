interface CustomError {
  message: string;
  code: number;
}

export class HttpError {
  get error500(): CustomError {
    return { code: 500, message: "Oops, something went wrong. Retry later." };
  }

  get error401(): CustomError {
    return { code: 401, message: "You must be logged to acces this page." };
  }

  get error403(): CustomError {
    return {
      code: 401,
      message: "You don't have the permission to access this page.",
    };
  }

  get error404(): CustomError {
    return {
      code: 404,
      message: "Look like this page doesn't exist.",
    };
  }

  error(message: string, code: number = 500): CustomError {
    return { code, message };
  }
}
