import { useRef } from 'react';

export default function useCustomCompareMemo(value, isEqual) {
  const ref = useRef(value);

  if (!isEqual(ref.current, value)) {
    ref.current = value;
  }

  return ref.current;
}