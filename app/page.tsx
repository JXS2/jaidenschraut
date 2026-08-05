import Image from "next/image";
import OarMark from "./oar-mark";
import styles from "./page.module.css";

const GITHUB_URL = "https://github.com/JXS2";
const LINKEDIN_URL = "https://www.linkedin.com/in/jxschraut/";
const EMAIL = "x.schraut@gmail.com";

const INTRO =
  "I'm a generalist who values agency and taste. I believe building the right things comes from developing deep understandings of the world. Check out my projects!";

const STATEMENT =
  "Rowing, geopolitics, tea, beach volleyball, and travelling whenever I can.";

/**
 * A company mark that sits on a meta entry's own line. Far too small for the
 * index tile's ground and hairline — at this size a plate reads as noise, so a
 * mark published on transparency sits bare on the page's paper instead.
 */
type MetaMark = {
  src: string;
  /**
   * Empty where the entry's text already names the company: the mark would
   * otherwise be read out immediately after the word it repeats.
   */
  alt: string;
  /**
   * The mark's own proportion, so the line reserves the right width for it
   * before it loads. The rendered height comes from `.metaMark`, not from here.
   */
  width: number;
  height: number;
};

/** Both entries are confirmed claims about Jaiden; the first carries the weight. */
const HEADER_META: { text: string; strong?: boolean; marks?: MetaMark[] }[] = [
  { text: "Chicago", strong: true },
  {
    text: "Currently — Lovelytics",
    marks: [
      { src: "/thumbs/lovelytics.svg", alt: "", width: 130, height: 109 },
      /* Lovelytics is a Databricks company, which is the one thing the two
         marks say that the line's text does not — so this one is named. */
      { src: "/thumbs/databricks.svg", alt: "a Databricks company", width: 28, height: 30 },
    ],
  },
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
    year: "2026",
    href: "https://theslash.app",
    thumb: { kind: "image", src: "/thumbs/slash-logo.png", alt: "The Slash app icon" },
    links: [{ label: "live → theslash.app", href: "https://theslash.app" }],
  },
  {
    title: "Rent-a-Rower",
    description: "Attempting to optimize fundraising for collegiate rowing teams.",
    year: "2026",
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

type School = {
  name: string;
  /** The degree, where there is one. A high school carries only its level. */
  credential: string;
  location: string;
  /** The year the school was finished, in the index's year column. */
  year: string;
  /**
   * The school's own mark, in the index's shared 64px box. `kind` picks the
   * tile treatment the work index already uses: `image` for a mark that brings
   * its own ground, `mark` for one published on transparency, which needs the
   * tile's. It carries no alt: the heading beside it already names the school.
   */
  logo: { src: string; kind: "image" | "mark" };
};

/**
 * Credentials and places are straight from Jaiden's résumé, and only what it
 * states: no GPA and no honours. The years are the years each school was
 * finished, so the index reads down its year column the way the two above it do.
 */
const EDUCATION: School[] = [
  {
    name: "University of Michigan",
    credential: "Bachelor of Science, Data Science",
    location: "Ann Arbor, MI",
    year: "2026",
    logo: { src: "/thumbs/michigan-m.svg", kind: "image" },
  },
  {
    name: "Crystal Lake Central",
    credential: "High school",
    location: "Crystal Lake, IL",
    year: "2022",
    /* The Tigers head the school itself publishes, on its own transparent
       ground, so the tile supplies one. */
    logo: { src: "/thumbs/crystal-lake-central.png", kind: "mark" },
  },
];

/**
 * A tile in the mosaic. `tall` doubles a tile's height. `fit` shows the photo
 * whole on the tile ground rather than cropping it to the tile, and takes the
 * doubled height with it so the row it sits in still runs level.
 */
type GalleryTile = {
  image: string;
  alt: string;
  tall: boolean;
  fit?: boolean;
};

/**
 * Every tile is a real photo. The grid reflows around whatever mix of tiles it
 * is given, so a new photo is one more entry here and nothing else. Portrait
 * shots want `tall`, so `cover` crops their width rather than their subject; a
 * wide shot whose subject runs the full frame wants `fit` instead.
 */
const GALLERY: GalleryTile[] = [
  {
    image: "/gallery/rowing-pair.jpg",
    alt: "Two rowers in a pair, blades buried, on race day",
    tall: false,
    fit: true,
  },
];

/** Section counts read as an index: 01, 02, 12. */
const count = (items: unknown[]) => String(items.length).padStart(2, "0");

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          {/* The monogram opens the header. It carries no accessible name: the
              h1 below it already says who this is. */}
          <span className={styles.monogram} aria-hidden="true">
            J<span className={styles.monogramX}>X</span>S
          </span>
          <h1 className={styles.name}>Jaiden Schraut</h1>
          <p className={styles.lede}>{INTRO}</p>
          <ul className={styles.headerMeta}>
            {HEADER_META.map((item) => (
              <li
                key={item.text}
                className={`${styles.headerMetaItem} ${
                  item.strong ? styles.headerMetaStrong : ""
                }`}
              >
                {item.text}
                {item.marks && (
                  <span className={styles.metaMarks}>
                    {item.marks.map((mark) => (
                      <Image
                        key={mark.src}
                        src={mark.src}
                        alt={mark.alt}
                        width={mark.width}
                        height={mark.height}
                        className={styles.metaMark}
                      />
                    ))}
                  </span>
                )}
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
            <h2 className={styles.sectionLabel}>Education</h2>
            <span className={styles.sectionCount}>{count(EDUCATION)}</span>
          </div>
          {EDUCATION.map((school) => (
            /* The same index row as the two above it: the school's own mark in
               the shared 64px box, the entry beside it, the year last. */
            <div key={school.name} className={styles.eduRow}>
              <div
                className={`${styles.rowThumb} ${
                  school.logo.kind === "image" ? styles.rowThumbImage : styles.rowThumbMark
                }`}
              >
                <Image
                  src={school.logo.src}
                  alt=""
                  fill
                  sizes="(max-width: 680px) 52px, 64px"
                  className={school.logo.kind === "image" ? styles.cover : styles.markArt}
                />
              </div>
              <div>
                <h3 className={styles.eduSchool}>{school.name}</h3>
                <p className={styles.eduCredential}>{school.credential}</p>
                <p className={styles.eduLocation}>{school.location}</p>
              </div>
              <p className={styles.eduYear}>{school.year}</p>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionLabel}>Off the clock</h2>
          </div>
          <p className={styles.statement}>{STATEMENT}</p>
          <div className={styles.gallery}>
            {GALLERY.map((tile) => (
              <div
                key={tile.image}
                className={`${styles.galleryTile} ${tile.tall ? styles.galleryTileTall : ""} ${
                  tile.fit ? styles.galleryTileFit : ""
                }`}
              >
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 680px) 50vw, 320px"
                  className={tile.fit ? styles.contain : styles.cover}
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
        <a className={`${styles.footerLink} ${styles.footerLinkEmail}`} href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </footer>
    </div>
  );
}
