export function useUniqueUUID(): () => string {
  const uuid = (): string => {
    const timestamp = Date.now().toString(16);
    const uniqueId = (counter++ % 0x100000).toString(16).padStart(5, "0");

    if (counter > 0xfffff) {
      counter = 0;
    }

    return `${timestamp}${uniqueId}`;
  };

  let counter = 0;

  return uuid;
}
