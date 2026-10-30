# Tasks: Рефакторинг активного разбора ниши

**Input**: [spec.md](./spec.md), [plan.md](./plan.md)

## Подготовка

- [x] T001 Проверить `AGENTS.md`, спецификацию 003, активный код и базовые тесты в `tests/*.test.mjs`.
- [x] T002 Согласовать объём и подготовить `specs/004-active-flow-refactor/spec.md` и `plan.md`.
- [x] T003 Выполнить read-only анализ `spec.md`, `plan.md`, `tasks.md` и отдельно сохранить полный отчёт в `analysis.md`.

## User Story 1 — Прежний разбор ниши

- [x] T004 [US1] Объединить взаимоисключающие состояния запроса в `app/lib/niche-request-state.ts`, `app/components/TrendExplorer/TrendExplorer.tsx` и `app/components/search/SearchPanel/SearchPanel.tsx`.
- [x] T005 [US1] Упростить отображение без изменения DOM и порядка в `app/components/formalization/FormalizationPanel/FormalizationPanel.tsx` и `app/components/formalization/TopicCard/TopicCard.tsx`.

## User Story 2 — Прежние ошибки

- [x] T006 [US2] Типизировать существующие коды ошибки в `app/lib/niche-normalization.ts` и явно сопоставить их прежним HTTP-статусам в `app/api/niche/normalize/route.ts`.

## Проверка и ревью

- [x] T007 Прогнать тесты, сборку, UI-проверку и `git diff --check`; записать фактические результаты в `specs/004-active-flow-refactor/verification.md`.
- [x] T008 Записать выводы ревью и отложенные замечания в `specs/004-active-flow-refactor/review.md`; проверить отсутствие секретов и правок демо-списка.

## Зависимости

T003 предшествует T004–T006. T004–T006 независимы по поведению, но выполняются последовательно в общей рабочей копии. T007–T008 завершают задачу.
