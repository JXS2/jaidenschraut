"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./resume-dialog.module.css";

const RESUME_URL = "/resume.pdf";
const DOWNLOAD_NAME = "Jaiden-Schraut-Resume.pdf";
/**
 * Open fitted to the panel's width with the thumbnail rail collapsed. Viewers
 * that don't understand these hints ignore them and open at their default,
 * which is why they live in the fragment and not in a query string.
 */
const VIEWER_URL = `${RESUME_URL}#view=FitH&navpanes=0`;

/**
 * The résumé, read in place rather than downloaded.
 *
 * Built on the native `<dialog>` in modal mode, which is what gives us the
 * focus trap, the Escape key, the inert page behind it, and focus restored to
 * the trigger for free — a hand-rolled trap would be more code and less
 * correct. Everything below it is the small remainder: closing on a backdrop
 * click, locking body scroll, and mounting the PDF only while it is open so a
 * visitor who never asks for it never fetches it.
 */
export default function ResumeDialog({ triggerClassName }: { triggerClassName?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /** True only while a press *began* on the backdrop, so a drag that starts on
      the PDF and ends outside it doesn't count as a backdrop click. */
  const pressedBackdrop = useRef(false);
  const [open, setOpen] = useState(false);

  // showModal() runs after the panel has rendered, so the close button exists
  // to receive focus.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog || dialog.open) return;
    dialog.showModal();
    closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClassName}
        onClick={() => setOpen(true)}
      >
        Résumé
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-modal="true"
        aria-labelledby="resume-dialog-title"
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
        onMouseDown={(event) => {
          pressedBackdrop.current = event.target === dialogRef.current;
        }}
        onClick={(event) => {
          if (pressedBackdrop.current && event.target === dialogRef.current) {
            dialogRef.current?.close();
          }
        }}
      >
        {open && (
          <div className={styles.panel}>
            <div className={styles.head}>
              <h2 id="resume-dialog-title" className={styles.title}>
                Résumé
              </h2>
              <button
                ref={closeRef}
                type="button"
                className={styles.close}
                onClick={() => dialogRef.current?.close()}
                aria-label="Close résumé"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <iframe className={styles.frame} src={VIEWER_URL} title="Résumé of Jaiden Schraut" />

            {/* Not every browser previews a PDF inline, so the file is always
                one plain link away. */}
            <div className={styles.foot}>
              <a className={styles.download} href={RESUME_URL} download={DOWNLOAD_NAME}>
                Download PDF
              </a>
              <p className={styles.note}>Not previewing? Download it instead.</p>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
