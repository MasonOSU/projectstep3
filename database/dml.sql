-- `dml.sql` has the SQL queries for Group 53's final CS 340 project.
-- Each one contributes to full front-end Create, Read, Update, Delete (CRUD) functionality for a database.
-- It is heavily influenced by the OSU helper code `bsg_sample_data_manipulation_queries.sql`.
-- 	Code citation:
-- -- Dr. Michael Curry. 2023. "Project Step 3 Draft Version: Design HTML Interface + DML SQL". [Source code]. 
-- -- https://canvas.oregonstate.edu/courses/1914747/assignments/9181001?module_item_id=23040589. URL

-- `Research_Papers` CRUD
-- -- Read all research papers in UI:
SELECT *, 
    DATE_FORMAT(date_published, '%b. %e, %Y') AS date_published,
    (SELECT name FROM Institutions WHERE institution_id = Research_Papers.institution_id), 
	(SELECT field FROM Disciplines WHERE discipline_id = Research_Papers.discipline_id)
	FROM Research_Papers;

-- -- Add a research paper, with foreign keys from dropdowns.
INSERT INTO Research_Papers (title, date_published, doi, institution_id, discipline_id) 
    VALUES (inputTitle, inputDatePublished, inputDoi, institutionSelect, disciplineSelect);

-- -- Select a research paper from a dropdown and update, 
-- -- also selecting institution and discipline foreign keys from dropdowns.
UPDATE Research_Papers SET title = inputTitle, date_published = inputDatePublished, doi = inputDoi, 
    institution_id = institutionSelect, discipline_id = disciplineSelect 
    WHERE Research_Papers.research_paper_id = researchPaperSelect;

-- -- Delete research paper with button click.
DELETE FROM Research_Papers WHERE research_paper_id = researchPaperId;

-- `Citations` CRUD
-- -- Read all citations and associated data:
SELECT citation_id, 
    (SELECT title FROM Research_Papers WHERE citing_paper_id = Research_Papers.research_paper_id),
    (SELECT title FROM Research_Papers WHERE cited_paper_id = Research_Papers.research_paper_id) 
    FROM Citations;

-- -- Add citation by selecting existing publications from dropdowns.
INSERT INTO Citations (citing_paper_id, cited_paper_id) 
    VALUES (SELECT title FROM Research_Papers WHERE Research_Papers.research_paper_id = citingPaperSelect);
    VALUES (SELECT title FROM Research_Papers WHERE Research_Papers.research_paper_id = citedPaperSelect);

-- -- Update citation by selecting an existing pair from a dropdown.
UPDATE Citations SET citing_paper_id = citingPaperSelect, cited_paper_id = citedPaperSelect 
    WHERE Citations.citation_id = citationSelect;

-- -- Delete a citation by clicking a button.
DELETE FROM Citations WHERE citation_id = citationId;

-- `Authors` CRUD
-- -- Read all authors and associated data:
SELECT author_id, first_name, last_name FROM Authors;

-- -- Add author.
INSERT INTO Authors (first_name, last_name) VALUES (inputFirstName, inputLastName);

-- -- Update author.
UPDATE Authors SET first_name = inputFirstName, last_name = inputLastName 
    WHERE Authors.author_id = authorSelect;

-- -- Delete author by clicking a button:
DELETE FROM Authors WHERE author_id = authorId;

-- `Research_Papers_has_Authors` CRUD
-- -- Read all publication associations:
SELECT *, 
    (SELECT title FROM Research_Papers WHERE paper_id = Research_Papers.research_paper_id),
    (SELECT CONCAT(Authors.first_name, ' ', Authors.last_name) WHERE researcher_id = Authors.author_id) 
    FROM Research_Papers_has_Authors;

-- -- Add new publication association.
INSERT INTO Research_Papers_has_Authors (research_paper_author_id, paper_id, researcher_id) 
    VALUES (researchPaperAuthorId, researchPaperSelect, authorSelect);

-- -- Update association by dropdown.
UPDATE Research_Papers_has_Authors 
    SET paper_id = researchPaperSelect, researcher_id = authorSelect 
    WHERE Research_Papers_has_Authors.research_paper_author_id = researchPaperAuthorSelect;

-- -- Delete publication association by choosing an existing ID from the dropdown.
DELETE FROM Research_Paper_has_Authors 
    WHERE Research_Papers_has_Authors.research_paper_author_id = researchPaperAuthorSelect

-- `Institutions` CRUD
-- -- Read all publishing organizations.
SELECT institution_id, name, address, country, website FROM Institutions;

-- -- Add new institution.
INSERT INTO Institutions (name, address, country, website) 
    VALUES (inputName, inputAddress, inputCountry, inputWebsite);

-- -- Update institution.
UPDATE Institutions 
    SET name = inputName, address = inputAddress, country = inputCountry, website = inputWebsite 
    WHERE Institutions.institution_id = institutionSelect;

-- -- Delete an institution by clicking a button.
DELETE FROM Institutions WHERE Institutions.institution_id = institutionId

-- `Disciplines` CRUD
-- -- Read all research fields.
SELECT discipline_id, field FROM Disciplines;

-- -- Add new field.
INSERT INTO Disciplines (field) VALUES (inputField);

-- -- Update field.
UPDATE Disciplines SET field = inputField WHERE Disciplines.discipline_id = disciplineSelect;

-- -- Delete discipine by button.
DELETE FROM Disciplines WHERE Disciplines.discipline_id = disciplineId