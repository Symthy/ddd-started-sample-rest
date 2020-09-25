class ArgumentNullException extends Error {

  public constructor(name: string) {
    super();
    this.name = name;
  }
}
