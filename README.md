# To do...
- Can't DELETE pre-existing from `Research_Papers`, `Authors`, `Institutions`, `Disciplines`. Something we had fixed before that, for some reason, is unfixed. It's as simple as running a second query in the `delete()` function, though. I'm thinking that changes I made to my SQL file did this and I need to re-implement something.

# Rubric
- one-page executive summary; effectively communicates material

- PDF in order: Summary, Project Outline, Database Outline, ERD, Schema, Sample Data, Screen captures

- summary has major changes, influencing feedback, good examples and details, clear ideas; speaks to audience

- updated Project, Database outline

- project, database writing efficient, concise for laymen to understand, navigate

- updated ER diagrams with class notation

- all ERD entities, attributes, relationships consistent with Project, Database Outline, Schema; omits detail compared to Schema (e.g. some attributes, intersection tables); good drawing with no crossed lines, clear notation

- updated schema with class notation

- schema Project, Database Outline; relationships, keys setup correct; entities, attributes, relationships correct, consistent with Project, Database Outline, ERD; clear diagram, doesn't waste space, cross lines, cut off field names, shrink font; diagram has meaningful caption; high quality

- UI screenshots for all pages

- UI screenshots have 1) titles above each pic explaining CRUD step; 2) captures clear, simple; 3) no wasted space; 4) page text not cut off; 5) capture font about same size as rest of document; 6) delete from M:N NULL relationship and M:N updates clearly highlighted

- updated Data Definition Queries; well-structured, commented, hand-authored; has 1) updated version of SQL file to create database; 2) schema file has comments at top describing DDL file so it's clear it pertains to the CS340 Portfolio Project deliverables; 3) all sample data included, polite values used; import successful and per schema;

- Data Manipulation Queries all described with functionalisties listed in CS340 Project Guide; 1) updated SQL file to query database; 2) queries consistent with project code; 3) queries run under reasonable conditions; 4) brief comments describe functionality/entity/relationship the query relates

- read/browse/display - UI uses SELECT for all tables in the schema; data from each table displayed in UI

- create new - UI has INSERT for all tables in schema

- at least one DELETE

- at least one DELETE removes from M:M relationship; 1) DELETEs a record from a M:M relationship; 2) doesn't create data anomaly like CASCADE; 3) highlights DELETE in PDF or Web Page

- at least one UPDATE

- at least one UPDATE relationship can be NULL

- user-friendly foreign key entry; user never enters IDs manually for foreign keys; all forms use dropdown or search bar to pick value;

- website functionality URL; website URL included in PDF and submission comment

- website source code has self-documenting folders, file names; code has meaningful variable names and brief comments explaining logic; HTML, JavaScript well-structured with comments and not additional information needed to understand the code by another programmer; required libraries documented in package.json or equivalent; database connection credentials sanitized

- code cited to credit source; citations in README and source code have 1) citation scope (e.g. module, function or line); 2) date; 3) originality, (copied, adapted, or based, e.g. "Based on the CS 340 starter code, with the exception of..."); 4) source (e.g. URL)

- website style; subjective by grader; CRUD operations organized, design elements consistent and aid navigation; good color, font, text, graphics; text easy to read, no errors

# Old
ddl

  -- INDEX `discipline_id_idx` (`discipline_id` ASC) VISIBLE,
  -- INDEX `institution_id_idx` (`institution_id` ASC) VISIBLE,

    INDEX `fk_Research_Papers_has_Authors_Authors1_idx` (`author_id` ASC) VISIBLE,
  INDEX `fk_Research_Papers_has_Authors_Research_Papers1_idx` (`research_paper_id` ASC) VISIBLE,