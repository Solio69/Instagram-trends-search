import { HERO_COPY as copy } from "./constants";
import styles from "./Hero.module.scss";

export function Hero() {
  return <section className={styles.hero} id="top" aria-labelledby="hero-title">
    <div className={styles.hero__copy}>
      <p className={styles.hero__eyebrow}>{copy.eyebrow}</p>
      <h1 className={styles.hero__title} id="hero-title">{copy.title}</h1>
      <p className={styles.hero__description}>{copy.description}</p>
    </div>
  </section>;
}
