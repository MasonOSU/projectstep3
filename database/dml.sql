--------------------------------------
----- Research_Papers Operations -----
--------------------------------------
----- Select all research papers in db -----
SELECT * FROM Research_Papers ORDER BY `research_paper_id` ASC;

----- Create a research paper -----
INSERT INTO Research_Papers (title, date_published, doi, institution, discipline)
VALUES (:titleInput, :date_publishedInput, :doiInput, :institution_from_dropdown_Input :discipline_from_dropdown_Input);

----- Update a research paper -----
UPDATE `Research_Papers` SET :titleInput, :date_publishedInput, :doiInput, :institution_from_dropdown_Input, discipline_from_dropdown_Input
WHERE `research_paper_id` = :researchPaperId_from_the_update_form;


----- Delete a research paper -----
DELETE FROM `Research_Papers` WHERE `research_paper_id` = :researchPaperId_selected_with_delete_button;

--------------------------------
----- Citations Operations -----
--------------------------------
----- Show all citations in db -----
SELECT * FROM `Citations` ORDER BY `citation_id` ASC;

----- Create a citation -----
INSERT into `Citations` (citing_paper, referenced)
VALUES (:citing_paper_from_dropdown_Input, :referenced_from_dropdown_Input);

----- Update citation -----
UPDATE `Citations` SET :citing_paper_from_dropdown_Input, referenced_from_dropdown_Input
WHERE `citation_id` = :citationId_from_the_update_form;

----- Delete citation -----
DELETE FROM `Citations` WHERE `citation_id` = :citationId_selected_with_delete_button;


------------------------------
----- Authors Operations -----
------------------------------
----- Show all authors in db -----
SELECT * FROM `Authors` ORDER BY `author_id` ASC;

----- Create an author -----
INSERT into `Authors` (first_name, last_name)
VALUES (:first_nameInput, :last_nameInput);

----- Update author -----
UPDATE `Authors` SET :first_nameInput, last_nameInput
WHERE `author_id` = :authorId_from_the_update_form;

----- Delete author -----
DELETE FROM `Authors` WHERE `author_id` = :authorId_selected_with_delete_button;


--------------------------------------------------
----- Research_Papers_has_Authors Operations -----
--------------------------------------------------
----- Show all Research_Papers_has_Authors in db -----
SELECT * FROM `Research_Papers_has_Authors` ORDER BY `research_paper_author_id` ASC;

----- Create multiple authors to research paper -----
INSERT into `Research_Papers_has_Authors` (research_paper_id, author_id)
VALUES (:research_paper_idInput, :author_idInput);

----- Update association -----
UPDATE `Research_Papers_has_Authors` SET :research_paper_idInput, :author_idInput
WHERE `research_paper_author_id` = :research_paper_authorId_from_the_update_form;

----- Delete association -----
DELETE FROM `Research_Papers_has_Authors` WHERE `research_paper_author_id` = :research_paper_authorId_selected_with_delete_button;


----------------------------------
----- Institutions Operations -----
----------------------------------
----- Show all institutions in db -----
SELECT * FROM `Institutions` ORDER BY `institution_id` ASC;

----- Create institution -----
INSERT into `Institutions` (name, address, city, country, phone, website)
VALUES (:nameInput, :addressInput, :cityInput, :countryInput, :phoneInput, :websiteInput);

----- Update institution -----
UPDATE `Institutions` SET :nameInput, :addressInput, :cityInput, :countryInput, :phoneInput, :websiteInput
WHERE `institution_id` = :institutionId_from_the_update_form;

----- Delete institution -----
DELETE FROM `Institutions` WHERE `institution_id` = :institutionId_selected_with_delete_button;


----------------------------------
----- Disciplines Operations -----
----------------------------------
----- Show all disciplines in db -----
SELECT * FROM `Disciplines` ORDER BY `discipline_id` ASC;

----- Create a discipline -----
INSERT into `Disciplines` (field)
VALUES (:fieldInput);

----- Update discipline -----
UPDATE `Disciplines` SET :fieldInput
WHERE `discipline_id` = :disciplineId_from_the_update_form;

----- Delete discipline -----
DELETE FROM `Disciplines` WHERE `discipline_id` = :disciplineId_selected_with_delete_button;