/**
 * Valide l'enregistrement (ou le refus) des données d'un user.
 * @param age   - l'âge de user (number)
 * @param role  - le rôle du user: "admin" | "user" | "stagiaire"
 * @param email - l'address email du user
 * @returns true si valide, false s'il n'entre pas dans les conditions
 * @throws Error if age > 120 ou le role est invalide
 */
export function validateUserRegistration(
    age: number,
    role: string,
    email: string
): boolean {

// validation role
    const validRoles = ["admin", "user", "stagiaire"];
    if (!validRoles.includes(role)) {
        throw new Error("Rôle invalide");
    }

// validation age
    if (typeof age !== "number" || isNaN(age)) {
        return false;
    }
    if (age > 120) {
        throw new Error("Âge invalide");
    }
    if (age < 18) {
        // Only "stagiaire" is allowed under 18
        if (role !== "stagiaire") {
            return false;
        }
//si stagiaire >18 -> continuer le check de mail
    }
// validation mail
    return !(!email.includes("@") || !email.includes("."));
}