declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react'

  const content: (props: SVGProps<SVGElement>) => ReactElement
  export default content
}

declare module '*.png' {
  const content: import('../dist/shared/lib/image-external').StaticImageData

  export default content
}

declare module '*.jpg' {
  const content: import('../dist/shared/lib/image-external').StaticImageData

  export default content
}

declare module '*.jpeg' {
  const content: import('../dist/shared/lib/image-external').StaticImageData

  export default content
}

declare module '*.gif' {
  const content: import('../dist/shared/lib/image-external').StaticImageData

  export default content
}

declare module '*.webp' {
  const content: import('../dist/shared/lib/image-external').StaticImageData

  export default content
}

declare module '*.avif' {
  const content: import('../dist/shared/lib/image-external').StaticImageData

  export default content
}

declare module '*.ico' {
  const content: import('../dist/shared/lib/image-external').StaticImageData

  export default content
}

declare module '*.bmp' {
  const content: import('../dist/shared/lib/image-external').StaticImageData

  export default content
}

declare namespace global {
  function __reanimatedWorkletInit(): void
}
