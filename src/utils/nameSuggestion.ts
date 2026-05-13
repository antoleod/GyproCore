export function suggestProjectName(baseName: string, existingNames: string[]): string {
  if (!baseName.trim()) return "";

  // Check if the name already exists
  const normalizedBase = baseName.toLowerCase().trim();
  const exists = existingNames.some((name) => name.toLowerCase().trim() === normalizedBase);

  if (!exists) {
    return ""; // No suggestion needed
  }

  // Try adding numbers: "Sala", "Sala 2", "Sala 3"...
  for (let i = 2; i <= 100; i++) {
    const suggestion = `${baseName} ${i}`;
    const normalizedSuggestion = suggestion.toLowerCase().trim();
    if (!existingNames.some((name) => name.toLowerCase().trim() === normalizedSuggestion)) {
      return suggestion;
    }
  }

  // Fallback: use timestamp if all numbered versions exist
  return `${baseName} ${Date.now()}`;
}

export function getExistingProjectNames(projects: any[]): string[] {
  return projects.map((p) => p.projectName);
}
