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
DELETE FROM `Citations` WHERE `citation_id` = :citation_id_selected_with_delete_button;


------------------------------
----- Authors Operations -----
------------------------------

----- Create author -----
-- Create first name
[SQL QUERY]
-- Create surname
[SQL QUERY]
-- Submit on click
[SQL QUERY]

----- Update author -----
[SQL QUERY]

----- Delete author -----
[SQL QUERY]

--------------------------------------------------
----- Research_Papers_has_Authors Operations -----
--------------------------------------------------

----- Create multiple authors to research paper -----
-- Read (Select) author from dropdown
[SQL QUERY]
-- Read (Select) research paper from dropdown
[SQL QUERY]
-- Submit on click
[SQL QUERY]

----- Update association -----
[SQL QUERY]

----- Delete association -----
[SQL QUERY]

----------------------------------
----- Institutions Operations -----
----------------------------------

----- Create institution -----
-- Create name
[SQL QUERY]
-- Create address
[SQL QUERY]
-- Create city
[SQL QUERY]
-- Create country
[SQL QUERY]
-- Create phone
[SQL QUERY]
-- Create website

----- Update institution -----
[SQL QUERY]

----- Delete institution -----
[SQL QUERY]

----------------------------------
----- Disciplines Operations -----
----------------------------------

----- Create discipline -----
-- Create field
[SQL QUERY]

----- Update discipline -----
[SQL QUERY]

----- Delete discipline -----
[SQL QUERY]