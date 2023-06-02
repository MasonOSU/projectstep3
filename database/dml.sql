-- `Authors` operations:
---- read all authors
SELECT
    *
FROM
    `Authors`
ORDER BY
    `author_id` ASC;

---- add author
INSERT into
    `Authors` (first_name, last_name)
VALUES
    (inputFirstName, inputLastName);

---- update author
UPDATE
    `Authors`
SET
    inputFirstName,
    inputLastName
WHERE
    `author_id` = authorId;

---- delete author
DELETE FROM
    `Authors`
WHERE
    `author_id` = authorId;

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
    `Institutions` (name, address, country, phone, website)
VALUES
    (
        inputName,
        inputAddress,
        inputCountry,
        inputPhone,
        inputWebsite
    );

---- update institution
UPDATE
    `Institutions`
SET (
    inputName,
    inputAddress,
    inputCountry,
    inputPhone,
    inputWebsite
    );
WHERE
    `institution_id` = institutionId;

---- delete institution
DELETE FROM
    `Institutions`
WHERE
    `institution_id` = institutionId;

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
    (inputField);

---- update discipline
UPDATE
    `Disciplines`
SET
    inputField
WHERE
    `discipline_id` = disciplineId;

---- delete discipline
DELETE FROM
    `Disciplines`
WHERE
    `discipline_id` = disciplineId;

-- `Research_Papers` operations:
---- read all research papers
SELECT
    * 
FROM
    Research_Papers
ORDER BY ASC;

---- add research paper
INSERT INTO
    Research_Papers (
        title,
        date_published,
        doi,
        institution_id,
        discipline_id
    )
VALUES
    (
        inputTitle,
        inputDatePublished,
        inputDoi,
        inputInstitutionId,
        inputDisciplineId
    );

---- update research paper
UPDATE
    `Research_Papers`
SET
        inputTitle,
        inputDatePublished,
        inputDoi,
        inputInstitutionId,
        inputDisciplineId
WHERE
    `research_paper_id` = researchPaperId;

---- delete research paper
DELETE FROM
    `Research_Papers`
WHERE
    `research_paper_id` = researchPaperId;

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
        inputCitingPaper,
        inputCitedPaper
    );

---- update citation
UPDATE
    `Citations`
SET
    inputCitingPaper,
    inputCitedPaper
WHERE
    `citation_id` = citationId;

---- delete citation
DELETE FROM
    `Citations`
WHERE
    `citation_id` = citationId;

-- `Research_Papers_has_Authors` operations:
---- read all research papers-and-authors associations
SELECT
    author_id,
    research_paper_id,
    CONCAT(first_name, ' ', last_name) AS name,
    title AS research_paper
FROM
    Authors
    INNER JOIN Research_Papers_has_Authors ON authors.author_id = Research_Paper_has_Authors.author_id
    INNER JOIN Research_Papers on Research_Papers.research_paper_id = Research_Paper_has_Authors.research_paper_id
ORDER BY
    name,
    research_paper;

---- add multiple authors to research paper and vice-versa
INSERT into
    `Research_Papers_has_Authors` (author_id, research_paper_id)
VALUES
    (
        inputTitle,
        inputAuthor
    );

---- update association
UPDATE
    `Research_Papers_has_Authors`
SET
    inputResearchPaperId,
    inputAuthorId
WHERE
    `research_paper_author_id` = inputResearchPaperAuthorId;

---- delete association
DELETE FROM
    `Research_Papers_has_Authors`
WHERE
    `research_paper_author_id` = inputResearchPaperAuthorId;