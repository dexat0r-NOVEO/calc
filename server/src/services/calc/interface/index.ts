export interface ICalcService {
    calculate(exp: string): number;
}

export type SupportedOps = '+' | '-' | '*' | '/';