import { FORMAT_OPTIONS, PERIOD_OPTIONS } from "../../../constants/options";
import { canStartDemo, type DemoView } from "../../../lib/demo-flow";
import type { ContentFilter, PeriodDays } from "../../../lib/results";
import { FormalizationPanel } from "../../formalization/FormalizationPanel";
import { ActionButton } from "../../ui/ActionButton";
import { LoadingStatus } from "../../ui/LoadingStatus";
import { NicheInput } from "../../ui/NicheInput";
import { ResultLimitField } from "../../ui/ResultLimitField";
import { SegmentedControl } from "../../ui/SegmentedControl";
import { SEARCH_COPY as copy } from "./constants";
import styles from "./SearchPanel.module.scss";

type SearchPanelProps = {
  niche: string;
  periodDays: PeriodDays;
  contentFilter: ContentFilter;
  limitInput: string;
  view: DemoView;
  onNicheChange: (value: string) => void;
  onPeriodChange: (value: PeriodDays) => void;
  onContentFilterChange: (value: ContentFilter) => void;
  onLimitChange: (value: string) => void;
  onLimitCommit: () => void;
  onSubmit: () => void;
};

export function SearchPanel({ niche, periodDays, contentFilter, limitInput, view, onNicheChange, onPeriodChange, onContentFilterChange, onLimitChange, onLimitCommit, onSubmit }: SearchPanelProps) {
  return <section className={styles["search-panel"]} aria-label={copy.sectionAria}>
    <form className={styles["search-panel__form"]} onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
      <div className={styles["search-panel__heading"]}>
        <p className={styles["search-panel__eyebrow"]}>{copy.eyebrow}</p>
        <h2 className={styles["search-panel__title"]}>{copy.title}</h2>
      </div>
      <NicheInput value={niche} onChange={onNicheChange} />
      <div className={styles["search-panel__controls"]}>
        <SegmentedControl legend={copy.period} options={PERIOD_OPTIONS} value={periodDays} onChange={onPeriodChange} />
        <SegmentedControl legend={copy.format} options={FORMAT_OPTIONS} value={contentFilter} onChange={onContentFilterChange} />
        <ResultLimitField value={limitInput} onChange={onLimitChange} onCommit={onLimitCommit} />
      </div>
      <div className={styles["search-panel__submit"]}>
        <ActionButton type="submit" wide icon="→" iconPosition="end" disabled={!canStartDemo(niche) || view.loader !== null}>{view.loader ? copy.submitting : copy.submit}</ActionButton>
      </div>
      {view.loader === "breakdown" && <LoadingStatus stage="breakdown" />}
      {view.breakdown && <FormalizationPanel contentFilter={contentFilter} />}
      {view.loader === "posts" && <LoadingStatus stage="posts" />}
      {view.results && <a className={styles["search-panel__jump"]} href="#results-title">{copy.jump}</a>}
    </form>
  </section>;
}
