# Implementation Plan: Рефакторинг активного разбора ниши

**Branch**: `003-niche-normalization` | **Date**: 2026-10-30 | **Spec**: [spec.md](./spec.md)

## Summary

Сохранить поведение активного пути и упростить его внутреннюю структуру: связать взаимоисключающие состояния запроса одним типом, сделать сопоставление ошибок HTTP явным и убрать лишние функции рендера. Демо-список не менять.

## Technical Context

**Stack**: Next.js 16.4.3, React 19.3.1, TypeScript 7, SCSS Modules  
**Runtime**: серверный Route Handler и клиентский `TrendExplorer`  
**Dependencies**: без новых пакетов  
**Storage**: не используется в активном пути  
**Tests**: `node --experimental-strip-types --test --test-isolation=none tests/*.test.mjs`; `npm run build`  
**Baseline**: 13/13 тестов проходят. Обычный тестовый запуск в текущем sandbox получил `spawn EPERM` до выполнения тестов; `--test-isolation=none` устраняет ограничение процесса без изменения тестов.

## Constitution Check

Конституция остаётся шаблоном без утверждённых принципов. Применяются `AGENTS.md`, согласованный объём и цикл проверки до/после рефакторинга. Для новой ветки нет разрешения: остаёмся на `003-niche-normalization` с существующими незакоммиченными изменениями; обязательный hook создания ветки не запускается, поскольку это противоречит согласованному объёму. Необязательные git commit hooks не запускаются без разрешения.

## Project Structure

```text
app/
├── api/niche/normalize/route.ts
├── components/TrendExplorer/TrendExplorer.tsx
├── components/search/SearchPanel/SearchPanel.tsx
├── components/formalization/FormalizationPanel/FormalizationPanel.tsx
├── components/formalization/TopicCard/TopicCard.tsx
└── lib/
    ├── niche-normalization.ts
    └── niche-request-state.ts
tests/
├── niche-normalization.test.mjs
└── results.test.mjs
```

## Design

1. В `niche-request-state.ts` описать взаимоисключающие состояния `idle/loading/ready/error`. `TrendExplorer` хранит один объект состояния вместо отдельных `status`, `submittedNiche`, `normalization`, `error`; счётчик версии запроса остаётся для защиты от устаревшего ответа. `SearchPanel` получает этот объект вместо четырёх отдельных props.
2. В `niche-normalization.ts` ограничить тип кодов ошибки существующими значениями. В Route Handler заменить вложенный тернарный выбор статуса исчерпывающим отображением кодов в прежние HTTP-статусы. Сообщения и условия ошибок не менять.
3. В `FormalizationPanel` и `TopicCard` убрать функции рендера, используемые по одному разу, сохранив порядок, ключи и DOM-структуру.
4. Оставить отдельные ограничения длины ввода на клиентской и серверной границе. Объединение ради одного числа потребовало бы дополнительного общего модуля либо импорта серверного кода на клиент; для этого прототипа оно не упрощает систему.

## Test-first and verification plan

- До правок: зафиксировать 13/13 тестов и текущие контракты.
- Поведение не добавляется и не меняется; тест, повторяющий реализацию, не нужен. После каждого рефакторинга прогнать существующие тесты. Сборка проверит TypeScript и маршрут.
- Проверить в интерфейсе широкую и узкую нишу, загрузку и замену результата после нового ввода. Сверить прежние HTTP-статусы по коду.
- Проверить `git diff --check`, список изменённых файлов, отсутствие секрета и правок демо-списка.
- Записать фактические команды и результаты в `verification.md`; ревью с найденными и отложенными замечаниями — в `review.md`.

