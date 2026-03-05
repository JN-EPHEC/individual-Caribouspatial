import { calculateShipping } from "../utils/shipping";

// 1. Catalogue : Cas de Distance
const distanceCases: [number, number, string, number, string][] = [
    // [Distance, Poids, Type, Attendu, Description]
    [0,   5, "standard", 10, "limite basse tranche 1 (0 km)"],
    [50,  5, "standard", 10, "limite haute tranche 1 (50 km)"],
    [51,  5, "standard", 25, "limite basse tranche 2 (51 km)"],
    [500, 5, "standard", 25, "limite haute tranche 2 (500 km)"],
    [501, 5, "standard", 50, "limite basse tranche 3 (501 km)"],
    [999, 5, "standard", 50, "tranche 3 nominale (999 km)"],
];
// 2. Catalogue : Cas de Poids
const poidsCases: [number, number, string, number, string][] = [
    // [Distance, Poids, Type, Attendu, Description]
    [100,  1, "standard", 25,   "poids min sans majoration (1 kg)"],
    [100,  9, "standard", 25,   "limite haute sans majoration (9 kg)"],
    [100, 10, "standard", 37.5, "limite basse avec majoration (10 kg) → 25 * 1.5"],
    [100, 50, "standard", 37.5, "limite haute avec majoration (50 kg) → 25 * 1.5"],
];
// 3. Catalogue : Entrées Invalides
const invalidCases: [number, number, "standard" | "express", string, string][] = [
    // [Distance, Poids, Type, Message erreur, Description]
    [-1,  5, "standard", "Invalid distance", "distance négative"],
    [10,  0, "standard", "Invalid weight",   "poids = 0"],
    [10, -5, "standard", "Invalid weight",   "poids négatif"],
    [10, 51, "standard", "Invalid weight",   "poids > 50 (hors catalogue)"],
];
// 4. Catalogue : Type Express  (distance 100 km → base 25€)
const expressTypeCases: [number, number, "standard" | "express", number, string][] = [
    // [Distance, Poids, Type, Attendu, Description]
    [100,  5, "express", 50,   "express sans majoration poids → 25 * 2"],
    [100, 10, "express", 75,   "express avec majoration poids → 25 * 1.5 * 2"],
    [10,   5, "express", 20,   "express tranche 1 → 10 * 2"],
    [501,  5, "express", 100,  "express tranche 3 → 50 * 2"],
];

//##########################################################################
describe("Shipping Calculator - Tests Fonctionnels", () => {
    describe("1. Tranches de distance (standard, poids < 10 kg)", () => {
        distanceCases.forEach(([distance, poids, type, expected, description]) => {
            it(`Distance ${distance} km → Prix ${expected}€ — ${description}`, () => {
                expect(calculateShipping(distance, poids, type as "standard"| "express")).toBe(expected);
            });
        });
    });
    describe("2. Majoration poids (distance 100 km, standard)", () => {
        poidsCases.forEach(([distance, poids, type, expected, description]) => {
            it(`Poids ${poids} kg → Prix ${expected}€ — ${description}`, () => {
                expect(calculateShipping(distance, poids, type as "standard"| "express")).toBe(expected);
            });
        });
    });
    describe("3. Entrées invalides", () => {
        invalidCases.forEach(([distance, poids, type, expectedError, description]) => {
            it(`(${distance}, ${poids}) doit lever "${expectedError}" — ${description}`, () => {
                expect(() => calculateShipping(distance, poids, type as "standard"| "express")).toThrow(expectedError);
            });
        });
    });
    describe("4. Multiplicateur express", () => {
        expressTypeCases.forEach(([distance, poids, type, expected, description]) => {
            it(`Express ${distance} km / ${poids} kg → Prix ${expected}€ — ${description}`, () => {
                expect(calculateShipping(distance, poids, type as "standard"| "express")).toBe(expected);
            });
        });
    });
});