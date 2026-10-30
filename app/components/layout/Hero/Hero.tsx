import { HERO_COPY } from "./constants";
import styles from "./Hero.module.scss";

const { eyebrow, title, description } = HERO_COPY;
const { hero, hero__copy, hero__eyebrow, hero__title, hero__description } =
  styles;

export function Hero() {
  return (
    <section className={hero} id="top" aria-labelledby="hero-title">
      <div className={hero__copy}>
        <p className={hero__eyebrow}>{eyebrow}</p>
        <h1 className={hero__title} id="hero-title">
          {title}
        </h1>
        <p className={hero__description}>{description}</p>
      </div>
    </section>
  );
}
