export const quickException = (c: any, message: string) => {
  c.status(500);
  c.text(message);
  return c;
};
