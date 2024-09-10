export function logAction(actionDescription, additionalInfo = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ACTION: ${actionDescription}`, additionalInfo);
}
