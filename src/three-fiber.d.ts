/**
 * Augment React 19 JSX namespace with @react-three/fiber element types.
 * Needed because Next.js 15 uses react-jsx transform, which looks at
 * React.JSX.IntrinsicElements rather than the global JSX namespace.
 */
import { ThreeElements } from '@react-three/fiber';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
