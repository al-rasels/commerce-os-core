-- Refactor PageLayout from a single `sections_json` column (+ `:draft` key rows)
-- to one row per page holding both a draft and a published JSON document.
-- Publish becomes a single atomic UPDATE; the `:draft` key convention is retired.

-- 1. Add new columns (additive, safe on populated tables)
ALTER TABLE "page_layouts" ADD COLUMN "draft_json" JSONB NOT NULL DEFAULT '{}';
ALTER TABLE "page_layouts" ADD COLUMN "published_json" JSONB NOT NULL DEFAULT '{}';
ALTER TABLE "page_layouts" ADD COLUMN "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- 2. Backfill published_json from the existing non-draft rows
UPDATE "page_layouts"
SET "published_json" = "sections_json"
WHERE "page_key" NOT LIKE '%:draft';

-- 3. Backfill draft_json from the legacy `<key>:draft` rows, then drop them
UPDATE "page_layouts" AS d
SET "draft_json" = p."sections_json"
FROM "page_layouts" AS p
WHERE d."page_key" = p."page_key" || ':draft'
  AND p."page_key" NOT LIKE '%:draft';

DELETE FROM "page_layouts" WHERE "page_key" LIKE '%:draft';

-- 4. Seed remaining drafts from their published copy so editors open with a baseline
UPDATE "page_layouts"
SET "draft_json" = "published_json"
WHERE "draft_json" = '{}'::jsonb;

-- 5. Drop the legacy column
ALTER TABLE "page_layouts" DROP COLUMN "sections_json";
