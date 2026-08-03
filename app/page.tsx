import Image from "next/image";
import styles from "./page.module.css";

/**
 * TODO(content): Jaiden still needs to supply the real values for these two.
 * They are the placeholders carried over from the design handoff.
 */
const GITHUB_URL = "https://github.com/";
const LINKEDIN_URL = "https://www.linkedin.com/";

/** TODO(content): rent-a-rower has no live URL yet; it points at the GitHub placeholder. */
const RENT_A_ROWER_URL = GITHUB_URL;

const EMAIL = "x.schraut@gmail.com";

const INTRO =
  "Hi — I'm a new-grad software engineer, just starting out. Most of what I know I've learned by building things I wanted to exist. I'm curious, I ask a lot of questions, and I like work where I get to figure things out as I go.";

const CURRENTLY =
  " learning about AI developmental trajectory and thinking through early-career strategy.";

const STATEMENT =
  "Rowing, geopolitics, tea, beach volleyball — and travelling whenever I can.";

/**
 * TODO(assets): all six photos are neutral placeholders on the design's
 * placeholder ground (#efebe2), sized to the exact CSS boxes. Swapping in
 * Jaiden's real photos needs nothing but a new `src`.
 */
const projects = [
  {
    title: "Slash",
    url: "theslash.app",
    href: "https://theslash.app",
    description: "A side project I built and shipped end to end. Still tinkering with it.",
    image: "/photos/slash.svg",
    alt: "Screenshot of Slash",
  },
  {
    title: "rent-a-rower",
    url: null,
    href: RENT_A_ROWER_URL,
    description:
      "Came out of rowing — a small tool for connecting rowers with people who need a hand.",
    image: "/photos/rent-a-rower.svg",
    alt: "Screenshot of rent-a-rower",
  },
];

type Publication = {
  title: string;
  venue: string;
  year: string;
  /** Empty string renders the entry as plain text instead of a link. */
  url: string;
};

/**
 * TODO(content): every entry is a placeholder. Jaiden supplies the real
 * title / venue / year / url per publication; replacing this array is the
 * only edit the section needs.
 */
const PUBLICATIONS: Publication[] = [
  { title: "[Publication title]", venue: "[Venue / where published]", year: "[Year]", url: "" },
  { title: "[Publication title]", venue: "[Venue / where published]", year: "[Year]", url: "" },
  { title: "[Publication title]", venue: "[Venue / where published]", year: "[Year]", url: "" },
];

const lifePhotos = [
  { image: "/photos/life-rowing.svg", alt: "Rowing on the water" },
  { image: "/photos/life-travel.svg", alt: "Travelling somewhere new" },
  { image: "/photos/life-tea.svg", alt: "A pot of tea" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.column}>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowMark} aria-hidden="true" />
              <span className={styles.eyebrowText}>Consultant at Lovelytics</span>
            </div>
            <h1 className={styles.name}>Jaiden Schraut</h1>
            <p className={styles.intro}>{INTRO}</p>
          </div>
          <div className={styles.portrait}>
            <div className={styles.portraitFrame}>
              <Image
                src="/photos/portrait.svg"
                alt="Portrait of Jaiden Schraut"
                fill
                sizes="248px"
                className={styles.cover}
                priority
              />
            </div>
          </div>
        </header>

        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Projects</h2>
            <div className={styles.projectGrid}>
              {projects.map((project) => (
                <a
                  key={project.title}
                  className={styles.card}
                  href={project.href}
                  target="_blank"
                  rel="noopener"
                >
                  <div className={styles.cardImage}>
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 964px) 100vw, 450px"
                      className={styles.cover}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTitleRow}>
                      <span className={styles.cardTitle}>{project.title}</span>
                      {project.url ? (
                        <span className={styles.cardUrl}>{project.url}</span>
                      ) : null}
                    </div>
                    <p className={styles.cardDescription}>{project.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Publications</h2>
            <ul className={styles.publicationList}>
              {PUBLICATIONS.map((publication, index) => {
                const body = (
                  <>
                    <span className={styles.publicationTitle}>{publication.title}</span>
                    <p className={styles.publicationMeta}>
                      {publication.venue} · {publication.year}
                    </p>
                  </>
                );

                return (
                  <li key={index}>
                    {publication.url ? (
                      <a
                        className={`${styles.publication} ${styles.publicationLink}`}
                        href={publication.url}
                        target="_blank"
                        rel="noopener"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={styles.publication}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <section className={styles.currently}>
            <p className={styles.currentlyText}>
              <span className={styles.currentlyLead}>Currently:</span>
              {CURRENTLY}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Off the clock</h2>
            <p className={styles.statement}>{STATEMENT}</p>
            <div className={styles.photoRow}>
              {lifePhotos.map((photo) => (
                <div key={photo.image} className={styles.photoFrame}>
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 964px) 50vw, 300px"
                    className={styles.cover}
                  />
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.footerLinks}>
            <a
              className={styles.footerLink}
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
            <a
              className={styles.footerLink}
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
            <a
              className={`${styles.footerLink} ${styles.footerLinkEmail}`}
              href={`mailto:${EMAIL}`}
            >
              {EMAIL}
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
