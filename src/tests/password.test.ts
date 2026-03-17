import { validatePassword } from "../utils/password";
describe("Password Validator - White Box Testing", () => {
// Test initial pour initialiser le rapport de couverture
// Ce test ne couvre que la première ligne de la fonction (Branch 1)
    it("devrait rejeter un mot de passe vide", () => {
        const result = validatePassword("", 25);
        expect(result).toBe(false);
    });
// TODO: Ajoutez vos tests ici pour atteindre 100% de couverture...
    // Branch 2 : mot de passe trop court (< 8 caractères)
    it("devrait rejeter un mot de passe trop court", () => {
        expect(validatePassword("Ab1!", 25)).toBe(false);
    });

    // Branch 3 : mot de passe trop long (> 20 caractères)
    it("devrait rejeter un mot de passe trop long", () => {
        expect(validatePassword("Ab1!Ab1!Ab1!Ab1!Ab1!Ab", 25)).toBe(false);
    });

    // Branch 4 : enfant (< 12 ans) sans minuscule → rejet
    it("devrait rejeter un mot de passe sans minuscule pour un enfant", () => {
        expect(validatePassword("ABCDEFGH", 10)).toBe(false);
    });

    // Enfant (< 12 ans) avec minuscule → accepté
    it("devrait accepter un mot de passe valide pour un enfant", () => {
        expect(validatePassword("abcdefgh", 10)).toBe(true);
    });
    // Branch 5 : adulte sans chiffre → rejet
    it("devrait rejeter un mot de passe sans chiffre pour un adulte", () => {
        expect(validatePassword("Abcdefgh!", 25)).toBe(false);
    });

    // Branch 6 : adulte sans caractère spécial → rejet
    it("devrait rejeter un mot de passe sans caractère spécial pour un adulte", () => {
        expect(validatePassword("Abcdefg1", 25)).toBe(false);
    });

    // Adulte valide (branche finale via adulte)
    it("devrait accepter un mot de passe valide pour un adulte", () => {
        expect(validatePassword("Abcdefg1!", 25)).toBe(true);
    });
// Limite basse adulte (exactement 12 ans)
    it("devrait appliquer les règles adulte à 12 ans", () => {
        expect(validatePassword("Abcdefg1!", 12)).toBe(true);
    });

    // Limite haute adulte (exactement 64 ans)
    it("devrait appliquer les règles adulte à 64 ans", () => {
        expect(validatePassword("Abcdefg1!", 64)).toBe(true);
    });

    // Branch 7 : senior (>= 65 ans) sans chiffre ET sans majuscule → rejet
    it("devrait rejeter un mot de passe sans chiffre et sans majuscule pour un senior", () => {
        expect(validatePassword("abcdefgh", 65)).toBe(false);
    });

    // Senior avec chiffre seulement → accepté (branch finale via senior)
    it("devrait accepter un mot de passe avec chiffre pour un senior", () => {
        expect(validatePassword("abcdefg1", 65)).toBe(true);
    });
    // Senior avec majuscule seulement → accepté
    it("devrait accepter un mot de passe avec majuscule pour un senior", () => {
        expect(validatePassword("Abcdefgh", 65)).toBe(true);
    });
});
