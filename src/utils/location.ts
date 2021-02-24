export const analysisLocation = (mapStr: string): number[] => {
  const res = JSON.parse(mapStr.replace(/{/g, '[').replace(/}/g, ']'));
  return [Number(res[0]), Number(res[1])];
};
