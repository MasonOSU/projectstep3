SELECT
    *
FROM
    `Authors`
ORDER BY
    `author_id` ASC;

INSERT into
    `Authors` (first_name, last_name)
VALUES
    (inputFirstName, inputLastName);

UPDATE
    `Authors`
SET
    inputFirstName,
    inputLastName
WHERE
    `author_id` = authorId;

DELETE FROM
    `Authors`
WHERE
    `author_id` = authorId;

SELECT
    *
FROM
    `Institutions`
ORDER BY
    `institution_id` ASC;

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

UPDATE
    `Institutions`
SET
    (
        inputName,
        inputAddress,
        inputCountry,
        inputPhone,
        inputWebsite
    );

WHERE
    `institution_id` = institutionId;

DELETE FROM
    `Institutions`
WHERE
    `institution_id` = institutionId;

SELECT
    *
FROM
    `Disciplines`
ORDER BY
    `discipline_id` ASC;

INSERT into
    `Disciplines` (field)
VALUES
    (inputField);

UPDATE
    `Disciplines`
SET
    inputField
WHERE
    `discipline_id` = disciplineId;

DELETE FROM
    `Disciplines`
WHERE
    `discipline_id` = disciplineId;

SELECT
    *
FROM
    Research_Papers
ORDER BY
    ASC;

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

DELETE FROM
    `Research_Papers`
WHERE
    `research_paper_id` = researchPaperId;

SELECT
    *
FROM
    `Citations`
ORDER BY
    `citation_id` ASC;

INSERT into
    `Citations` (citing_paper, referenced)
VALUES
    (
        inputCitingPaper,
        inputCitedPaper
    );

UPDATE
    `Citations`
SET
    inputCitingPaper,
    inputCitedPaper
WHERE
    `citation_id` = citationId;

DELETE FROM
    `Citations`
WHERE
    `citation_id` = citationId;

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

INSERT into
    `Research_Papers_has_Authors` (author_id, research_paper_id)
VALUES
    (inputTitle, inputAuthor);

UPDATE
    `Research_Papers_has_Authors`
SET
    inputResearchPaperId,
    inputAuthorId
WHERE
    `research_paper_author_id` = inputResearchPaperAuthorId;

DELETE FROM
    `Research_Papers_has_Authors`
WHERE
    `research_paper_author_id` = inputResearchPaperAuthorId;