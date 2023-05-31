-- `Authors` operations:
---- read all authors
SELECT
    author_id
FROM
    `Authors` AS aid,
    first_name,
    last_name
ORDER BY
    `author_id` ASC;

---- add author
INSERT into
    `Authors` (first_name, last_name)
VALUES
    (:first_nameInput, :last_nameInput);

---- update author
UPDATE
    `Authors`
SET
    :first_nameInput,
    last_nameInput
WHERE
    `author_id` = :authorId_from_the_update_form;

---- delete author
DELETE FROM
    `Authors`
WHERE
    `author_id` = :authorId_selected_with_delete_button;

-- `Institutions` operations:
---- read all institutions
SELECT
    *
FROM
    `Institutions`
ORDER BY
    `institution_id` ASC;

---- make institution
INSERT into
    `Institutions` (name, address, city, country, phone, website)
VALUES
    (
        :nameInput,
        :addressInput,
        :cityInput,
        :countryInput,
        :phoneInput,
        :websiteInput
    );

---- update institution
UPDATE
    `Institutions`
SET
    :nameInput,
    :addressInput,
    :cityInput,
    :countryInput,
    :phoneInput,
    :websiteInput
WHERE
    `institution_id` = :institutionId_from_the_update_form;

---- delete institution
DELETE FROM
    `Institutions`
WHERE
    `institution_id` = :institutionId_selected_with_delete_button;

-- `Disciplines` operations
---- read all disciplines
SELECT
    *
FROM
    `Disciplines`
ORDER BY
    `discipline_id` ASC;

---- make discipline
INSERT into
    `Disciplines` (field)
VALUES
    (:fieldInput);

---- update discipline
UPDATE
    `Disciplines`
SET
    :fieldInput
WHERE
    `discipline_id` = :disciplineId_from_the_update_form;

---- delete discipline
DELETE FROM
    `Disciplines`
WHERE
    `discipline_id` = :disciplineId_selected_with_delete_button;

-- `Research_Papers` operations:
---- read all research papers
SELECT
    research_paper_id AS rpid,
    title
FROM
    Research_Papers
ORDER BY
    ASC;

---- add research paper
INSERT INTO
    Research_Papers (
        title,
        date_published,
        doi,
        institution,
        discipline
    )
VALUES
    (
        :titleInput,
        :date_publishedInput,
        :doiInput,
        :institution_from_dropdown_Input :discipline_from_dropdown_Input
    );

---- update research paper
UPDATE
    `Research_Papers`
SET
    :titleInput,
    :date_publishedInput,
    :doiInput,
    :institution_from_dropdown_Input,
    discipline_from_dropdown_Input
WHERE
    `research_paper_id` = :researchPaperId_from_the_update_form;

---- delete research paper
DELETE FROM
    `Research_Papers`
WHERE
    `research_paper_id` = :researchPaperId_selected_with_delete_button;

-- `Citations` operations:
---- read all citations
SELECT
    *
FROM
    `Citations`
ORDER BY
    `citation_id` ASC;

---- add citation
INSERT into
    `Citations` (citing_paper, referenced)
VALUES
    (
        :citing_paper_from_dropdown_Input,
        :referenced_from_dropdown_Input
    );

---- update citation
UPDATE
    `Citations`
SET
    :citing_paper_from_dropdown_Input,
    referenced_from_dropdown_Input
WHERE
    `citation_id` = :citationId_from_the_update_form;

---- delete citation
DELETE FROM
    `Citations`
WHERE
    `citation_id` = :citationId_selected_with_delete_button;

-- `Research_Papers_has_Authors` operations:
---- read all research papers-and-authors associations
SELECT
    aid,
    rpid,
    CONCAT(first_name, ' ', last_name) AS name,
    title AS research_paper
FROM
    Authors
    INNER JOIN Research_Papers_has_Authors ON authors.author_id = Research_Paper_has_Authors.aid
    INNER JOIN Research_Papers on Research_Papers.research_paper_id = Research_Paper_has_Authors.rpid
ORDER BY
    name,
    research_paper;

---- add multiple authors to research paper and vice-versa
INSERT into
    `Research_Papers_has_Authors` (aid, rpid)
VALUES
    (
        :title_from_dropdown_Input,
        :author_name_from_dropdown_Input
    );

---- update association
UPDATE
    `Research_Papers_has_Authors`
SET
    :research_paper_idInput,
    :author_idInput
WHERE
    `research_paper_author_id` = :research_paper_authorId_from_the_update_form;

---- delete association
DELETE FROM
    `Research_Papers_has_Authors`
WHERE
    `research_paper_author_id` = :research_paper_authorId_selected_with_delete_button;