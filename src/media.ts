import { css, CSSObject, SimpleInterpolation } from "styled-components";

// type DeviceType = "desktop" | "tablet" | "phone";
type DeviceType = "desktop";

const sizes: Record<DeviceType, number> = {
  desktop: 700,
  // tablet: 768,
  // phone: 600,
};

const media = Object.entries(sizes).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: SimpleInterpolation[]
    ) => css`
      @media (min-width: ${value}px) {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {}) as Record<DeviceType, any>;

export { media };
