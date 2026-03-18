import { validateUserRegistration } from "../utils/userValidator";
describe("validateUserRegistration", () => {
// 1. RÔLE INVALIDE -> envoie erreur("Rôle invalide")
    describe("Rôle invalide", () => {
        it("TC-01 : lève une erreur pour un rôle inconnu ('superadmin')", () => {
            expect(() => validateUserRegistration(25, "superadmin", "a@b.com"))
                .toThrow("Rôle invalide");
        });
        it("TC-02 : lève une erreur pour un rôle vide ('')", () => {
            expect(() => validateUserRegistration(25, "", "a@b.com"))
                .toThrow("Rôle invalide");
        });
        it("TC-03 : lève une erreur pour un rôle avec casse incorrecte ('Admin')", () => {
            expect(() => validateUserRegistration(25, "Admin", "a@b.com"))
                .toThrow("Rôle invalide");
        });
    });

// 2. si ÂGE INVALIDE -> return false
    describe("Âge NaN / invalide", () => {
        it("TC-04 : retourne false pour NaN (rôle 'user')", () => {
            expect(validateUserRegistration(NaN, "user", "a@b.com")).toBe(false);
        });
        it("TC-05 : retourne false pour NaN (rôle 'admin')", () => {
            expect(validateUserRegistration(NaN, "admin", "a@b.com")).toBe(false);
        });
    });
//###############################################################################
//3. si ÂGE > 120 -> erreur("Âge invalide")
    describe("Âge supérieur à 120", () => {
        it("TC-06 : lève une erreur pour age = 121, rôle 'user'", () => {
            expect(() => validateUserRegistration(121, "user", "a@b.com"))
                .toThrow("Âge invalide");
        });
        it("TC-07 : lève une erreur pour age = 121, rôle 'admin'", () => {
            expect(() => validateUserRegistration(121, "admin", "a@b.com"))
                .toThrow("Âge invalide");
        });
        it("TC-08 : lève une erreur pour age = 121, rôle 'stagiaire'", () => {
            expect(() => validateUserRegistration(121, "stagiaire", "a@b.com"))
                .toThrow("Âge invalide");
        });
    });
//###############################################################################
//4. si ÂGE < 18 et si RÔLE NON-STAGIAIRE -> return false
    describe("Âge < 18, rôle non-stagiaire", () => {
        it("TC-09 : retourne false pour age = 17, rôle 'user'", () => {
            expect(validateUserRegistration(17, "user", "a@b.com")).toBe(false);
        });

        it("TC-10 : retourne false pour age = 17, rôle 'admin'", () => {
            expect(validateUserRegistration(17, "admin", "a@b.com")).toBe(false);
        });

        it("TC-11 : retourne false pour age = 0, rôle 'user'", () => {
            expect(validateUserRegistration(0, "user", "a@b.com")).toBe(false);
        });
    });
//###############################################################################
// 5. si ÂGE < 18 et si RÔLE 'STAGIAIRE' -> email décide
    describe("Âge < 18, rôle 'stagiaire'", () => {
        it("TC-12 : retourne true pour age = 16, rôle 'stagiaire', email valide", () => {
            expect(validateUserRegistration(16, "stagiaire", "jean@ecole.fr")).toBe(true);
        });
        it("TC-13 : retourne false pour age = 16, rôle 'stagiaire', email sans '@'", () => {
            expect(validateUserRegistration(16, "stagiaire", "jeanecole.fr")).toBe(false);
        });
        it("TC-14 : retourne false pour age = 16, rôle 'stagiaire', email sans '.'", () => {
            expect(validateUserRegistration(16, "stagiaire", "jean@ecolefr")).toBe(false);
        });
    });
//###############################################################################
// 6. ÂGE VALIDE (18–120) – VALIDATION EMAIL
    describe("Âge valide, email invalide", () => {
        it("TC-15 : retourne false si email sans '@', rôle 'user'", () => {
            expect(validateUserRegistration(25, "user", "invalidemail.com")).toBe(false);
        });
        it("TC-16 : retourne false si email sans '.', rôle 'admin'", () => {
            expect(validateUserRegistration(30, "admin", "user@domaine")).toBe(false);
        });
        it("TC-17 : retourne false si email vide, rôle 'stagiaire'", () => {
            expect(validateUserRegistration(20, "stagiaire", "")).toBe(false);
        });
    });
//###############################################################################
// 7. si tout valide -> return true (youpi)
    describe("Cas nominaux – retourne true", () => {
        it("TC-18 : retourne true pour age = 18 (limite basse), rôle 'user', email valide", () => {
            expect(validateUserRegistration(18, "user", "user@example.com")).toBe(true);
        });
        it("TC-19 : retourne true pour age = 120 (limite haute), rôle 'admin', email valide", () => {
            expect(validateUserRegistration(120, "admin", "admin@corp.io")).toBe(true);
        });
        it("TC-20 : retourne true pour age = 25, rôle 'stagiaire', email valide", () => {
            expect(validateUserRegistration(25, "stagiaire", "intern@school.org")).toBe(true);
        });
        it("TC-21 : retourne true pour age = 35, rôle 'admin', email valide", () => {
            expect(validateUserRegistration(35, "admin", "admin@company.fr")).toBe(true);
        });
    });
});