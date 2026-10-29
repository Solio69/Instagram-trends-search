import { Hero } from "./components/layout/Hero";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { TrendExplorer } from "./components/TrendExplorer";
import styles from "./page.module.scss";

export default function HomePage() {
  return <main className={styles.page}>
    <SiteHeader />
    <Hero />
    <TrendExplorer />
    <SiteFooter />
  </main>;
}
