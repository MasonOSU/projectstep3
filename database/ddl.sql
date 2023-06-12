-- `ddl.sql` is the Research Paper Archives' cleanly importable, hand-authored SQL code.
-- It's the driver SQL for Group 53's final CS 340 project at Oregon State University (OSU).
-- It is heavily influenced by the OSU helper code `bsg_db.sql`.
-- 	Code citation:
-- -- Dr. Michael Curry. 2023. "Activity 1 - Access and Use the CS340 Database ".
-- -- [Source code]. https://canvas.oregonstate.edu/courses/1914747/assignments/9180987?module_item_id=23040526. URL
-- Disable checks to import.
SET
  UNIQUE_CHECKS = 0;

SET
  FOREIGN_KEY_CHECKS = 0;

-- Drop tables for clean import.
DROP TABLE IF EXISTS `Research_Papers`;

DROP TABLE IF EXISTS `Citations`;

DROP TABLE IF EXISTS `Authors`;

DROP TABLE IF EXISTS `Research_Papers_has_Authors`;

DROP TABLE IF EXISTS `Institutions`;

DROP TABLE IF EXISTS `Disciplines`;

-- Begin table creation.
-- -- Create `Authors` table to log necessary publishing researchers.
CREATE TABLE IF NOT EXISTS `Authors` (
  `author_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`author_id`)
);

-- -- Create `Institutions` table to log optional publishing organizations.
CREATE TABLE IF NOT EXISTS `Institutions` (
  `institution_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `address` VARCHAR(50) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `website` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`institution_id`)
);

-- -- Create `Disciplines` table to log publications' research fields.
CREATE TABLE IF NOT EXISTS `Disciplines` (
  `discipline_id` INT NOT NULL AUTO_INCREMENT,
  `field` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`discipline_id`)
);

-- -- Create `Research_Papers` table to log academic publications.
-- -- -- `doi` means "Digital Object Modifier", a unique code in academia to search for the papers' content.
-- -- -- The table has two foreign keys from `Institutions` (optional) and `Disciplines` (needed).
-- -- -- -- If a discipline is deleted or updated, so are all linked research papers.
-- -- -- -- If an institution is deleted, research papers are set to NULL.
-- -- -- Deleting from this table affects the junction tables `Citations` and `Research_Papers_has_Authors`.
CREATE TABLE `Research_Papers` (
  `research_paper_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `date_published` DATE NOT NULL,
  `doi` VARCHAR(100) NOT NULL,
  `institution_id` INT,
  `discipline_id` INT NOT NULL,
  PRIMARY KEY (`research_paper_id`),
  CONSTRAINT `institution_id` FOREIGN KEY (`institution_id`) REFERENCES `Institutions` (`institution_id`) ON DELETE
  SET
    NULL ON UPDATE NO ACTION,
    CONSTRAINT `discipline_id` FOREIGN KEY (`discipline_id`) REFERENCES `Disciplines` (`discipline_id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- Create table `Citations` to log papers that refererence each other.
-- -- -- More than one paper can have the same citation and vice-versa.
-- -- -- CASCADE commands push DELETE from `Research_Papers` to `Citations`.
-- -- -- Deleting from this table has no effect on other tables.
CREATE TABLE `Citations` (
  `citation_id` INT NOT NULL AUTO_INCREMENT,
  `citing_paper_id` INT NOT NULL,
  `cited_paper_id` INT NOT NULL,
  PRIMARY KEY (`citation_id`),
  CONSTRAINT `citing_paper_id` FOREIGN KEY (`citing_paper_id`) REFERENCES `Research_Papers` (`research_paper_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `cited_paper_id` FOREIGN KEY (`cited_paper_id`) REFERENCES `Research_Papers` (`research_paper_id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- Create table `Research_Papers_has_Authors` to log publishing researchers to papers and vice-versa.
-- -- -- Each `researcher_id` is a concatenation sub-query of `first_name` and `last_name` in `Authors`.
-- -- -- Deleting from this junction table has no effect on other tables.
CREATE TABLE IF NOT EXISTS `Research_Papers_has_Authors` (
  `research_paper_author_id` INT NOT NULL AUTO_INCREMENT,
  `paper_id` INT NOT NULL,
  `researcher_id` INT NOT NULL,
  PRIMARY KEY (`research_paper_author_id`),
  CONSTRAINT `paper_id` FOREIGN KEY (`paper_id`) REFERENCES `Research_Papers` (`research_paper_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `researcher_id` FOREIGN KEY (`researcher_id`) REFERENCES `Authors` (`author_id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- Begin table insertions.
-- -- Insert `Authors` data.
INSERT INTO
  `Authors` (`first_name`, `last_name`)
VALUES
  ('Nina', 'Faulkner'),
  ('Robert', 'Ball'),
  ('John', 'Smith'),
  ('Sandra', 'Smith'),
  ('Maria', 'Thompson');

-- -- Insert `Institutions` data.
INSERT INTO
  `Institutions` (`name`, `country`, `address`, `website`)
VALUES
  (
    'Samoa University',
    'United States',
    '2370 Clover Drive, Colorado Springs, Colorado',
    'samoa.edu'
  ),
  (
    'Weston Biological Institute',
    'United States',
    '1671 Johnstown Road, Winnetka, New York',
    'westonbio.edu'
  ),
  (
    'Smith and Harper College',
    'United Kingdom',
    '4628 Hazelwood Avenue, London',
    'shcollege.edu'
  );

-- -- Insert `Disciplines` data.
INSERT INTO
  `Disciplines` (`field`)
VALUES
  ('Biology'),
  ('Literature'),
  ('History'),
  ('Psychology');

-- -- Insert `Research_Papers` data.
INSERT INTO
  `Research_Papers` (
    `title`,
    `date_published`,
    `doi`,
    `institution_id`,
    `discipline_id`
  )
VALUES
  (
    'Grapefruit Juice Interactions with Antipsychotic Medicine',
    '1980-10-29',
    '10.1991/1123',
    (
      SELECT
        `institution_id`
      FROM
        `Institutions`
      WHERE
        `name` = 'Weston Biological Institute'
    ),
    (
      SELECT
        `discipline_id`
      FROM
        `Disciplines`
      WHERE
        `field` = 'Biology'
    )
  ),
  (
    'Celtic Tradition in Beowulf',
    '1999-01-03',
    '10.9932/1939',
    (
      SELECT
        `institution_id`
      FROM
        `Institutions`
      WHERE
        `name` = 'Smith and Harper College'
    ),
    (
      SELECT
        `discipline_id`
      FROM
        `Disciplines`
      WHERE
        `field` = 'Literature'
    )
  ),
  (
    'Schizophrenia Treatment Models',
    '1997-04-09',
    '10.0001/9634',
    (
      SELECT
        `institution_id`
      FROM
        `Institutions`
      WHERE
        `name` = 'Samoa University'
    ),
    (
      SELECT
        `discipline_id`
      FROM
        `Disciplines`
      WHERE
        `field` = 'Psychology'
    )
  ),
  (
    'An Overview of Antipsychotic Drug Kinetics',
    '1978-05-13',
    '10.0193/9294',
    NULL,
    (
      SELECT
        `discipline_id`
      FROM
        `Disciplines`
      WHERE
        `field` = 'Biology'
    )
  ),
  (
    'Anglo-Saxon Class Dynamics and Migration',
    '1991-07-21',
    '10.1111/2345',
    (
      SELECT
        `institution_id`
      FROM
        `Institutions`
      WHERE
        `name` = 'Smith and Harper College'
    ),
    (
      SELECT
        `discipline_id`
      FROM
        `Disciplines`
      WHERE
        `field` = 'History'
    )
  );

-- -- Insert `Citations` data.
-- -- -- Sub-queries find `research_paper_id` values by `title`.
INSERT INTO
  `Citations` (`citing_paper_id`, `cited_paper_id`)
VALUES
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Grapefruit Juice Interactions with Antipsychotic Medicine'
    ),
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'An Overview of Antipsychotic Drug Kinetics'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Celtic Tradition in Beowulf'
    ),
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Anglo-Saxon Class Dynamics and Migration'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Schizophrenia Treatment Models'
    ),
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'An Overview of Antipsychotic Drug Kinetics'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Celtic Tradition in Beowulf'
    ),
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Schizophrenia Treatment Models'
    )
  );

-- -- Insert `Research_Papers_has_Authors` data.
-- -- -- Sub-queries find `research_paper_id` values by `title`
-- -- -- and `author_id` values by `first_name` and `last_name` concatenated search.
INSERT INTO
  `Research_Papers_has_Authors` (`paper_id`, `researcher_id`)
VALUES
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Grapefruit Juice Interactions with Antipsychotic Medicine'
    ),
    (
      SELECT
        `author_id`
      FROM
        `Authors`
      WHERE
        `first_name` = 'Nina'
        AND `last_name` = 'Faulkner'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Grapefruit Juice Interactions with Antipsychotic Medicine'
    ),
    (
      SELECT
        `author_id`
      FROM
        `Authors`
      WHERE
        `first_name` = 'Robert'
        AND `last_name` = 'Ball'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Celtic Tradition in Beowulf'
    ),
    (
      SELECT
        `author_id`
      FROM
        `Authors`
      WHERE
        `first_name` = 'Nina'
        AND `last_name` = 'Faulkner'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Schizophrenia Treatment Models'
    ),
    (
      SELECT
        `author_id`
      FROM
        `Authors`
      WHERE
        `first_name` = 'John'
        AND `last_name` = 'Smith'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'An Overview of Antipsychotic Drug Kinetics'
    ),
    (
      SELECT
        `author_id`
      FROM
        `Authors`
      WHERE
        `first_name` = 'Sandra'
        AND `last_name` = 'Smith'
    )
  ),
  (
    (
      SELECT
        `research_paper_id`
      FROM
        `Research_Papers`
      WHERE
        `title` = 'Anglo-Saxon Class Dynamics and Migration'
    ),
    (
      SELECT
        `author_id`
      FROM
        `Authors`
      WHERE
        `first_name` = 'Nina'
        AND `last_name` = 'Faulkner'
    )
  );

-- Reset unique and foreign key checks.
SET
  UNIQUE_CHECKS = 1;

SET
  FOREIGN_KEY_CHECKS = 1;