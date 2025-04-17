export const passwordStrength = (password: string) => {
  const validations = {
    length: password.length >= 8,
    number: /\d/.test(password),
    case: /[a-z]/.test(password) && /[A-Z]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const score = Object.values(validations).filter(Boolean).length

  return {
    score,
    validations,
    label:
      score === 0
        ? "Muy débil"
        : score === 1
        ? "Débil"
        : score === 2
        ? "Media"
        : score === 3
        ? "Fuerte"
        : "Muy fuerte",
    color:
      score === 0
        ? "bg-red-500"
        : score === 1
        ? "bg-orange-500"
        : score === 2
        ? "bg-yellow-500"
        : score === 3
        ? "bg-blue-500"
        : "bg-green-500",
  }
}
