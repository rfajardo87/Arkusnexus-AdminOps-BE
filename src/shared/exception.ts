export const quickException = (c: any, message: string) => {
  c.status(500);
  return c.text(message);
};
