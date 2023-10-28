const failedResponse = (message: string) => ({
  success: false,
  message,
});

const successResponse = (data: any) => ({
  success: true,
  data,
});

export { failedResponse, successResponse };
