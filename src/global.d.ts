import type { ProtocolResType } from "./types/main.types";

declare module '*.css';

// Image imports
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare global {
  interface Window {
    storageApi: {
      videoData: () => Promise<ProtocolResType>;
      documentData: () => Promise<ProtocolResType>;
      galleryData: () => Promise<ProtocolResType>;
    };
  }
}