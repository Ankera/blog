const MAX_SIGNED_31_BIT_INT = 1073741823;
const NoWork = 0;
const Sync = 1;
const Never = MAX_SIGNED_31_BIT_INT;

const UNIT_SIZE = 10;
const MAGIC_NUMBER_OFFSET = 2;

export function msToExpirationTime(ms) {
    // Always add an offset so that we don't clash with the magic number for NoWork.
    return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0);
}

export function expirationTimeToMs(expirationTime) {
    return (MAGIC_NUMBER_OFFSET - expirationTime) * UNIT_SIZE;
}

function ceiling(num, precision) {
    return (((num / precision) | 0) + 1) * precision;
}

function computeExpirationBucket(
    currentTime,
    expirationInMs,
    bucketSizeMs,
) {
    return (
        MAGIC_NUMBER_OFFSET -
        ceiling(
            MAGIC_NUMBER_OFFSET - currentTime + expirationInMs / UNIT_SIZE,
            bucketSizeMs / UNIT_SIZE,
        )
    );
}

export const LOW_PRIORITY_EXPIRATION = 5000;
export const LOW_PRIORITY_BATCH_SIZE = 250;

export function computeAsyncExpiration(
    currentTime,
) {
    return computeExpirationBucket(
        currentTime,
        LOW_PRIORITY_EXPIRATION,
        LOW_PRIORITY_BATCH_SIZE,
    );
}

export const HIGH_PRIORITY_EXPIRATION = 150;
export const HIGH_PRIORITY_BATCH_SIZE = 100;

export function computeInteractiveExpiration(currentTime) {
    return computeExpirationBucket(
        currentTime,
        HIGH_PRIORITY_EXPIRATION,
        HIGH_PRIORITY_BATCH_SIZE,
    );
}