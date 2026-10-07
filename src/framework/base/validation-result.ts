export class ValidationResult {
  public readonly passed: boolean;
  public readonly message: string;

  private constructor(passed: boolean, message: string) {
    this.passed = passed;
    this.message = message;
  }

  static ok(message: string): ValidationResult {
    return new ValidationResult(true, message);
  }

  static fail(message: string): ValidationResult {
    return new ValidationResult(false, message);
  }
}
