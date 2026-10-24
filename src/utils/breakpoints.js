export const BREAKPOINTS = {
  PHONE_LANDSCAPE: 600,
  TABLET_PORTRAIT: 768,
  TABLET_LANDSCAPE: 1024,
};

export const getDeviceClass = (width) => {
  if (width < BREAKPOINTS.PHONE_LANDSCAPE) return "phone-portrait";
  if (width < BREAKPOINTS.TABLET_PORTRAIT) return "phone-landscape";
  if (width < BREAKPOINTS.TABLET_LANDSCAPE) return "tablet-portrait";
  return "tablet-landscape";
};

export const getColumns = (width) => {
  if (width < BREAKPOINTS.PHONE_LANDSCAPE) return 1;
  if (width < BREAKPOINTS.TABLET_PORTRAIT) return 2;
  if (width < BREAKPOINTS.TABLET_LANDSCAPE) return 3;
  return 4;
};
