import { expect } from "chai";
import calc from "./index";

describe("Calc service", () => {
    before(() => {

    })
    it("3 + 5 = 8", async () => {
        const service = new calc();
        expect(service.calculate("3 + 5")).to.be.equal(8);
    })
    it("10 - 5 = 5", async () => {
        const service = new calc();
        expect(service.calculate("10 - 5")).to.be.equal(5);
    })
    it("5 * 5 = 25", async () => {
        const service = new calc();
        expect(service.calculate("5 * 5")).to.be.equal(25);
    })
    it("25 / 5 = 5", async () => {
        const service = new calc();
        expect(service.calculate("25 / 5")).to.be.equal(5);
    })
    it("10 / 2 + 5 * 3 = 20", () => {
        const service = new calc();
        expect(service.calculate("10 / 2 + 5 * 3")).to.be.equal(20);
    })
    it("27 / 3 - 10 / 2 + 5 * 3 = 19", () => {
        const service = new calc();
        expect(service.calculate("27 / 3 - 10 / 2 + 5 * 3")).to.be.equal(19);
    })
    it("27 / 3 / 3 / 3 + 100 = 101", () => {
        const service = new calc();
        expect(service.calculate("27 / 3 / 3 / 3 + 100")).to.be.equal(101);
    })
    it("Should throw error: Divide by zero!", async () => {
        const service = new calc();
        expect(service.calculate.bind(service,"3 / 0")).to.throw("Divide by zero!");
    })
    it("Should throw error: Invalid expression!", async () => {
        const service = new calc();
        expect(service.calculate.bind(service,"+ + 3 / 2")).to.throw("Invalid expression!");
    })
    it("Should throw error: Invalid expression! Unsupported symbol ^!", async () => {
        const service = new calc();
        expect(service.calculate.bind(service,"3 ^ 2")).to.throw("Invalid expression! Unsupported symbol ^");
    })
    it("Should throw error: Invalid expression!", async () => {
        const service = new calc();
        expect(service.calculate.bind(service,"3 + 3 - 2 2 1 -")).to.throw("Invalid expression!");
    })
});