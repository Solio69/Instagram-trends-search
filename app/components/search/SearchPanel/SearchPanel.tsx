import { BUTTON_TYPE, ROLE_PROPS } from "../../../constants/dom";
import { ICONS } from "../../../constants/icons";
import { NICHE_REQUEST_STATUS } from "../../../constants/niche-request";
import { FORMAT_OPTIONS, PERIOD_OPTIONS } from "../../../constants/options";
import type { NicheRequestState } from "../../../lib/niche-request-state";
import type { ContentFilter, PeriodDays } from "../../../lib/results";
import { FormalizationPanel } from "../../formalization/FormalizationPanel";
import { ActionButton, BUTTON_ICON_POSITION } from "../../ui/ActionButton";
import { LOADING_STAGE, LoadingStatus } from "../../ui/LoadingStatus";
import { NicheInput } from "../../ui/NicheInput";
import { ResultLimitField } from "../../ui/ResultLimitField";
import { SegmentedControl } from "../../ui/SegmentedControl";
import { SEARCH_COPY } from "./constants";
import styles from "./SearchPanel.module.scss";

type SearchPanelProps = {
  niche: string;
  periodDays: PeriodDays;
  contentFilter: ContentFilter;
  limitInput: string;
  request: NicheRequestState;
  onNicheChange: (value: string) => void;
  onPeriodChange: (value: PeriodDays) => void;
  onContentFilterChange: (value: ContentFilter) => void;
  onLimitChange: (value: string) => void;
  onLimitCommit: () => void;
  onSubmit: () => void;
};

const { LOADING, READY, ERROR } = NICHE_REQUEST_STATUS;
const { sectionAria, eyebrow, title, period, format, submit, submitting } =
  SEARCH_COPY;
const { SUBMIT_ARROW } = ICONS;
const { SUBMIT } = BUTTON_TYPE;
const {
  "search-panel": panelClass,
  "search-panel__form": formClass,
  "search-panel__heading": headingClass,
  "search-panel__eyebrow": eyebrowClass,
  "search-panel__title": titleClass,
  "search-panel__controls": controlsClass,
  "search-panel__submit": submitClass,
  "search-panel__error": errorClass,
} = styles;

export function SearchPanel({
  niche,
  periodDays,
  contentFilter,
  limitInput,
  request,
  onNicheChange,
  onPeriodChange,
  onContentFilterChange,
  onLimitChange,
  onLimitCommit,
  onSubmit,
}: SearchPanelProps) {
  const { status } = request;
  const isLoading = status === LOADING;
  const isReady = status === READY;
  const isError = status === ERROR;

  function renderLoading() {
    return <LoadingStatus stage={LOADING_STAGE.BREAKDOWN} />;
  }

  function renderReady({
    input,
    data,
  }: Extract<NicheRequestState, { status: typeof READY }>) {
    return (
      <FormalizationPanel
        contentFilter={contentFilter}
        input={input}
        data={data}
      />
    );
  }

  function renderError({
    message,
  }: Extract<NicheRequestState, { status: typeof ERROR }>) {
    return (
      <p className={errorClass} {...ROLE_PROPS.ALERT}>
        {message}
      </p>
    );
  }

  return (
    <section className={panelClass} aria-label={sectionAria}>
      <form
        className={formClass}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className={headingClass}>
          <p className={eyebrowClass}>{eyebrow}</p>
          <h2 className={titleClass}>{title}</h2>
        </div>
        <NicheInput value={niche} onChange={onNicheChange} />
        <div className={controlsClass}>
          <SegmentedControl
            legend={period}
            options={PERIOD_OPTIONS}
            value={periodDays}
            onChange={onPeriodChange}
          />
          <SegmentedControl
            legend={format}
            options={FORMAT_OPTIONS}
            value={contentFilter}
            onChange={onContentFilterChange}
          />
          <ResultLimitField
            value={limitInput}
            onChange={onLimitChange}
            onCommit={onLimitCommit}
          />
        </div>
        <div className={submitClass}>
          <ActionButton
            type={SUBMIT}
            wide
            icon={SUBMIT_ARROW}
            iconPosition={BUTTON_ICON_POSITION.END}
            disabled={!niche.trim() || isLoading}
          >
            {isLoading ? submitting : submit}
          </ActionButton>
        </div>
        {isLoading && renderLoading()}
        {isReady && renderReady(request)}
        {isError && renderError(request)}
      </form>
    </section>
  );
}
