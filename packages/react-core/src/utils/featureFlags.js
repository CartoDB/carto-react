let featureFlags = [];

export function setFlags(flags) {
  const isValidFlag = (f) => typeof f === 'string' && f;

  if (Array.isArray(flags) && flags.every(isValidFlag)) {
    featureFlags = flags;
  } else if (
    !Array.isArray(flags) &&
    typeof flags === 'object' &&
    Object.keys(flags).every(isValidFlag)
  ) {
    featureFlags = [];
    for (const [flag, value] of Object.entries(flags)) {
      if (value) {
        featureFlags.push(flag);
      }
    }
  } else {
    throw new Error(`Invalid feature flags: ${flags}`);
  }
}

export function clearFlags() {
  featureFlags = [];
}

export function hasFlag(flag) {
  return featureFlags.includes(flag);
}
