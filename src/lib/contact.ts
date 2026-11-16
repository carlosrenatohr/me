import { getProfile } from './content';

/**
 * Contact details visible on public routes.
 *
 * Every field is optional by design: the content model forbids inventing an
 * email, a profile URL or a CV, so a missing value stays `undefined` and the
 * UI renders a marked placeholder instead of a dead link.
 */

export interface ContactLink {
  label: string;
  url: string;
  /** External links open in a new tab and need rel="noopener noreferrer". */
  external: boolean;
}

export interface ContactDetails {
  email?: string;
  cvPath?: string;
  location?: string;
  links: ContactLink[];
}

export async function getContactDetails(): Promise<ContactDetails> {
  const profile = await getProfile();

  return {
    email: profile.data.email,
    cvPath: profile.data.cvPath,
    location: profile.data.location,
    links: profile.data.links.map((link) => ({
      label: link.label,
      url: link.url,
      external: /^https?:/i.test(link.url),
    })),
  };
}
