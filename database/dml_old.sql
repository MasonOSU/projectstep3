--------------------------------------
----- Research_Papers Operations -----
--------------------------------------

----- Create research paper -----
-- Create title
SELECT 'title' AS :title;
-- Read (Select), add date
SELECT 'date' AS :date;
-- Read (Select) institution from dropdown
SELECT institution_id, name from Institutions;
-- Read (Select) discipline from dropdown
SELECT discipline_id, field from Disciplines;
-- Create DOI
SELECT 'doi' AS :doi;
-- Submit on click
INSERT INTO Research_Papers (title, date, doi, institution_id, discipline_id)

----- Update research paper -----
[SQL QUERY]

----- Delete research paper -----
[SQL QUERY]

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