--------------------------------------
----- Research_Papers Operations -----
--------------------------------------

----- Select all research papers in db -----
SELECT * FROM Research_Papers;

----- Create a research paper -----
INSERT INTO Research_Papers (title, date_published, doi, institution, discipline)
VALUES (:titleInput, :date_publishedInput, :doiInput, :institution_from_dropdown_Input :discipline_from_dropdown_Input);

----- Update a research paper -----
UPDATE `Research_Papers` SET :titleInput, :date_publishedInput, :doiInput, :institution_from_dropdown_Input, discipline_from_dropdown_Input
WHERE `researchPaperId` = :researchPaperId_from_the_update_form;


----- Delete a research paper -----
DELETE FROM `Research_Papers` WHERE `researchPaperId` = :researchPaperId_selected_with_delete_button;

--------------------------------
----- Citations Operations -----
--------------------------------

----- Create citation -----
-- Read (Select) citing paper from dropdown
[SQL QUERY]
-- Read (Select) referenced paper from dropdown
[SQL QUERY]
-- Submit on click
[SQL QUERY]

----- Update citation -----
[SQL QUERY]

----- Delete citation -----
[SQL QUERY]

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