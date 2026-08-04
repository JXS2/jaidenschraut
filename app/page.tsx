import Image from "next/image";
import OarMark from "./oar-mark";
import ResumeDialog from "./resume-dialog";
import styles from "./page.module.css";

const GITHUB_URL = "https://github.com/JXS2";
const LINKEDIN_URL = "https://www.linkedin.com/in/jxschraut/";
const EMAIL = "x.schraut@gmail.com";

const INTRO =
  "Hi — I'm a new-grad software engineer, just starting out. Most of what I know I've learned by building things I wanted to exist. I'm curious, I ask a lot of questions, and I like work where I get to figure things out as I go.";

const STATEMENT =
  "Rowing, geopolitics, tea, beach volleyball — and travelling whenever I can.";

/** Both entries are confirmed claims about Jaiden; the first carries the weight. */
const HEADER_META: { text: string; strong?: boolean }[] = [
  { text: "Chicago", strong: true },
  { text: "Currently — Lovelytics" },
];

/**
 * An artifact you can open for a project. Both projects are represented by
 * their live site and nothing else: the repositories stay private.
 */
type ArtifactLink = {
  label: string;
  href: string;
};

/**
 * What sits in a row's 64px box. `image` is art that owns the whole tile and
 * fills it edge to edge; a drawn mark sits inset on the card ground instead.
 * The two treatments are `.rowThumbImage` and `.rowThumbMark`.
 */
type Thumb =
  | { kind: "image"; src: string; alt: string }
  | { kind: "oar"; label: string };

type Project = {
  title: string;
  description: string;
  year: string;
  /** The row's primary destination. `null` leaves the title as plain text. */
  href: string | null;
  thumb: Thumb;
  links: ArtifactLink[];
};

/**
 * Both repositories are private, so each row carries its live site and no
 * repository link.
 */
const PROJECTS: Project[] = [
  {
    title: "Slash",
    description: "Unreleased app, due Fall 2026.",
    year: "2025",
    href: "https://theslash.app",
    thumb: { kind: "image", src: "/thumbs/slash-logo.png", alt: "The Slash app icon" },
    links: [{ label: "live → theslash.app", href: "https://theslash.app" }],
  },
  {
    title: "Rent-a-Rower",
    description: "Attempting to optimize fundraising for collegiate rowing teams.",
    year: "2024",
    href: "https://rent-a-rower.com",
    thumb: {
      kind: "image",
      src: "/thumbs/rent-a-rower-logo.png",
      alt: "The rent-a-rower logo",
    },
    links: [{ label: "live → rent-a-rower.com", href: "https://rent-a-rower.com" }],
  },
];

type Publication = {
  title: string;
  /** The full author list, in citation order; Jaiden is first author. */
  authors: string;
  venue: string;
  year: string;
  /** Empty string renders the entry as plain text instead of a link. */
  url: string;
  /**
   * The paper's own artwork, in the index's shared 64px box. It carries no alt:
   * the tile sits inside the citation link, so any description of it would be
   * read out ahead of the title that actually names the entry.
   */
  thumb: { src: string };
};

const PUBLICATIONS: Publication[] = [
  {
    title:
      "A multi-output network with U-net enhanced class activation map and robust classification performance for medical imaging analysis",
    authors: "JX Schraut, L Liu, J Gong, Y Yin",
    venue: "First author · Discover Artificial Intelligence",
    year: "2023",
    url: "https://doi.org/10.1007/s44163-022-00045-1",
    /* Fig. 1 of the paper itself (the multi-output U-net, with a segmentation
       decoder and a classification head), reused under its CC BY 4.0 licence. */
    thumb: { src: "/publications/unet-architecture.png" },
  },
];

/**
 * TODO(assets): the two `/photos/*.svg` tiles are still neutral placeholders
 * on the placeholder ground, at the two tile sizes the mosaic uses. `tall`
 * doubles a tile's height; the grid reflows around whatever mix of tiles it is
 * given, so more real photos can simply replace entries here.
 */
const GALLERY = [
  {
    image: "/gallery/rowing-trophy.jpg",
    alt: "Holding the ACRA national championship team points trophy at the regatta site",
    tall: true,
  },
  { image: "/photos/life-kyoto.svg", alt: "Travelling in Kyoto", tall: false },
  { image: "/photos/life-alps.svg", alt: "Travelling in the Alps", tall: true },
  {
    image: "/gallery/rowing-pair.jpg",
    alt: "Two rowers in a pair, blades buried, on race day",
    tall: false,
  },
];

/** Section counts read as an index: 01, 02, 12. */
const count = (items: unknown[]) => String(items.length).padStart(2, "0");

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowMark} aria-hidden="true" />
            Consultant at Lovelytics
          </p>
          <h1 className={styles.name}>Jaiden Schraut</h1>
          <p className={styles.lede}>{INTRO}</p>
          <ul className={styles.headerMeta}>
            {HEADER_META.map((item) => (
              <li key={item.text} className={item.strong ? styles.headerMetaStrong : undefined}>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.portraitFrame}>
          <Image
            src="/portrait.jpg"
            alt="Portrait of Jaiden Schraut"
            fill
            sizes="160px"
            className={`${styles.cover} ${styles.portraitArt}`}
            priority
          />
        </div>
      </header>

      <main>
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionLabel}>Personal projects</h2>
            <span className={styles.sectionCount}>{count(PROJECTS)}</span>
          </div>
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className={`${styles.row} ${project.href ? styles.rowLinked : ""}`}
            >
              {/* Real art owns the whole tile and bleeds to its edges; a drawn
                  mark sits inset on the card ground instead. */}
              {project.thumb.kind === "image" ? (
                <div className={`${styles.rowThumb} ${styles.rowThumbImage}`}>
                  <Image
                    src={project.thumb.src}
                    alt={project.thumb.alt}
                    width={128}
                    height={128}
                    sizes="(max-width: 680px) 52px, 64px"
                    className={styles.thumbArt}
                  />
                </div>
              ) : (
                <div className={`${styles.rowThumb} ${styles.rowThumbMark}`}>
                  <OarMark className={styles.markArt} label={project.thumb.label} />
                </div>
              )}
              <div>
                <h3 className={styles.rowTitle}>
                  {project.href ? (
                    <a
                      className={styles.rowTitleLink}
                      href={project.href}
                      target="_blank"
                      rel="noopener"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className={styles.rowDescription}>{project.description}</p>
                <ul className={styles.rowLinks}>
                  {project.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className={styles.rowLink}
                        href={link.href}
                        target="_blank"
                        rel="noopener"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <p className={styles.rowYear}>{project.year}</p>
            </article>
          ))}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionLabel}>Publications</h2>
            <span className={styles.sectionCount}>{count(PUBLICATIONS)}</span>
          </div>
          {PUBLICATIONS.map((publication) => {
            const body = (
              <>
                {/* The same tile the work index uses. A figure is wide rather
                    than square, so it is fitted rather than cropped, and the
                    tile keeps a paper ground behind it. Decorative here: see
                    the type. */}
                <div className={`${styles.rowThumb} ${styles.rowThumbPlate}`}>
                  <Image
                    src={publication.thumb.src}
                    alt=""
                    fill
                    sizes="(max-width: 680px) 52px, 64px"
                    className={styles.markArt}
                  />
                </div>
                <div>
                  <p className={styles.pubTitle}>{publication.title}</p>
                  <p className={styles.pubAuthors}>{publication.authors}</p>
                  <p className={styles.pubVenue}>{publication.venue}</p>
                </div>
                <p className={styles.pubYear}>{publication.year}</p>
              </>
            );

            return publication.url ? (
              <a
                key={publication.title}
                className={`${styles.pubRow} ${styles.pubRowLink}`}
                href={publication.url}
                target="_blank"
                rel="noopener"
              >
                {body}
              </a>
            ) : (
              <div key={publication.title} className={styles.pubRow}>
                {body}
              </div>
            );
          })}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionLabel}>Off the clock</h2>
            <span className={styles.sectionCount}>gallery</span>
          </div>
          <p className={styles.statement}>{STATEMENT}</p>
          <div className={styles.gallery}>
            {GALLERY.map((tile) => (
              <div
                key={tile.image}
                className={`${styles.galleryTile} ${tile.tall ? styles.galleryTileTall : ""}`}
              >
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 680px) 50vw, 260px"
                  className={styles.cover}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.footerLink} href={GITHUB_URL} target="_blank" rel="noopener">
          GitHub
        </a>
        <a className={styles.footerLink} href={LINKEDIN_URL} target="_blank" rel="noopener">
          LinkedIn
        </a>
        <ResumeDialog triggerClassName={`${styles.footerLink} ${styles.footerButton}`} />
        <a className={`${styles.footerLink} ${styles.footerLinkEmail}`} href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </footer>
    </div>
  );
}
