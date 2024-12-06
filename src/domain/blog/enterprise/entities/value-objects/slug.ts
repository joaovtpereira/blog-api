export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  /**
   * Creates a new Slug instance from a given text by normalizing,
   * converting to lowercase, trimming, and replacing spaces and
   * special characters with hyphens.
   *
   * @param text - The input text to be converted into a slug.
   * @returns A new Slug instance with the processed value.
   */
  static createSlugFromText(text: string): Slug {
    return new Slug(
      text
        .normalize('NFKD')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/_/g, '-')
        .replace(/--+/g, '-')
        .replace(/-$/g, ''),
    )
  }
}
