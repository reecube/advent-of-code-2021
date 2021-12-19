export function verbose(message?: any, ...optionalParams: any[]): void {
  if (!(global as any).verbose) return;

  console.log(message, ...optionalParams);
}
