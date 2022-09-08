import { ICalcService, SupportedOps } from "./interface";
export default class CalcService implements ICalcService {

    private getPriority(op: SupportedOps): number {
        switch (op) {
            case '+':
            case '-': {
                return 1;
            }
            case '*':
            case '/': {
                return 2;
            }
        }
    }

    private performCalc(op: SupportedOps, n1: number, n2: number): number {
        switch (op) {
            case '*': {
                return n1 * n2;
            }
            case '+': {
                return n1 + n2;
            }
            case '-': {
                return n1 - n2;
            }
            case '/': {
                if (n2 === 0) throw new Error('Divide by zero!');
                return n1 / n2;
            }
        }
    }

    public calculate(exp: string): number {
        const ops: SupportedOps[] = [];
        const numbers: number[] = [];
        const supportedOps: SupportedOps[] = ['+', '-', '*', '/'];
        const formatedExp = exp.split(' ');
        for (let ch of formatedExp) {
            if (supportedOps.includes(ch as SupportedOps)) {
                const op: SupportedOps = ch as SupportedOps;
                if (ops.length <= 0) {
                    if (numbers.length < 1) {
                        throw new Error("Invalid expression!");
                    }
                    ops.push(op);
                } else {
                    if (numbers.length - ops.length !== 1) {
                        throw new Error("Invalid expression!");
                    } 
                    const previousPriority = this.getPriority(ops[ops.length - 1]);
                    const currentPriority = this.getPriority(op);
                    if (currentPriority > previousPriority) {
                        ops.push(op);
                    } else {
                        const n2 = numbers.pop()
                        const n1 = numbers.pop()
                        const _op = ops.pop()
                        const result = this.performCalc(_op as SupportedOps, n1 as number, n2 as number);
                        numbers.push(result);
                        ops.push(op);
                    }
                }
            } else {
                if (!isNaN(Number(ch))) {
                    numbers.push(Number(ch));
                } else {
                    throw new Error(`Invalid expression! Unsupported symbol ${ch}`);
                }
            }
        }
        if (numbers.length - ops.length === 1) {
            while (ops.length) {
                const n2 = numbers.pop()
                const n1 = numbers.pop()
                const _op = ops.pop()
                const result = this.performCalc(_op as SupportedOps, n1 as number, n2 as number);
                numbers.push(result);
            }
        }
        return numbers[0];
    }
}