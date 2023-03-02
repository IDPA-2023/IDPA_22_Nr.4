export const serializeNonPOJOs = <T>(obj: T): T => { 
    return structuredClone(obj);
}